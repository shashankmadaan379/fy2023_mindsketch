import React from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import Axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();
  const [cookies, setCookies] = useCookies(["access_token"]);
  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    navigate("/login");
  };
  const username = window.localStorage.getItem("username");
  const getusername = async()=>{
    try {
      const response = await Axios.get("http://localhost:8000/api/v1/auth",{
      userid:window.localStorage.userID,
    })
    console.log(response);
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">MindSketch</Link>
      </div>
      <div className="items">
        {cookies.access_token && (
          <>
            <Link className="item" to="/create">
              Create
            </Link>
            {/* <Link className="item" to="/saved">
              Saved Images
            </Link> */}
            <p className="user-text">{username}</p>
          </>
        )}
        
        {!cookies.access_token ? (
          <Link className="button" to="/signup">
            Connect
          </Link>
        ) : (
          <Link className="button" onClick={logout}>
            Logout
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
