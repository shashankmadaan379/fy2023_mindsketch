import React, {useState} from "react";
import "./login.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
const Login = () => {
  const navigate = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);
  const [formdata, setformdata] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (
      formdata.email == "" ||
      formdata.password == ""
    ) {
      return alert("Input field must not be empty");
    }
    try {
      const response = await Axios.post("http://localhost:8000/api/v1/auth/login",{
        email:formdata.email,
        password:formdata.password,
      })
      setCookies("access_token", response.data.token);
      window.localStorage.setItem("userID", response.data.userid);
      let username = JSON.stringify(response.data.user.username);
      let newusername = username.replace(/"/g, "");
      window.localStorage.setItem("username", newusername);
      navigate("/");
    } catch (error) {
      console.log(error)
    }
  };
  return (
    <div className="hero">
      <div className="signup-container">
        <div className="signup-image"></div>
        <div className="signup-form">
          <div className="signup-header">
            <h1 className="signup-heading">Login</h1>
            <p className="signup-para">
              Dont have an account ?{" "}
              <Link className="login-redirect" to="/signup">
                Create your account
              </Link>
              , it takes less then a minute.
            </p>
          </div>
          <div className="signup-f">
            <form className="signup-main-form">
              <label className="signup-label" htmlFor="email">
                Email
              </label>
              <input
                className="signup-input"
                value={formdata.email}
                type="email"
                name="email"
                placeholder="Email..."
                onChange={handleChange}
              ></input>
              <label className="signup-label" htmlFor="password">
                Password
              </label>
              <input
                className="signup-input"
                value={formdata.password}
                type="password"
                name="password"
                placeholder="Password..."
                onChange={handleChange}
              ></input>
              <button
                className="button"
                id="login-signup-btn"
                onClick={handleClick}
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
