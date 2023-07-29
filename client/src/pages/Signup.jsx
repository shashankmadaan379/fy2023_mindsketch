import React, { useState } from "react";
import "./signup.css";
import { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState({
    username: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setformdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    if (
      formdata.username == "" ||
      formdata.email == "" ||
      formdata.password == ""
    ) {
      return alert("Input field must not be empty");
    }
    try {
      const response = await Axios.post(
        "http://localhost:8000/api/v1/auth/register",
        {
          username: formdata.username,
          email: formdata.email,
          password: formdata.password,
        }
      );
      if(response.data.message == "user already exist"){
        return alert("User already exist")
      }
      alert("Registration Successful!");
      navigate('/login')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="hero">
      <div className="signup-container">
        <div className="signup-image"></div>
        <div className="signup-form">
          <div className="signup-header">
            <h1 className="signup-heading">Register</h1>
            <p className="signup-para">
              Already have an account ?{" "}
              <Link className="login-redirect" to="/login">
                Login your account.
              </Link>
            </p>
          </div>
          <div className="signup-f">
            <form className="signup-main-form">
              <label className="signup-label" htmlFor="username">
                Username
              </label>
              <input
                className="signup-input"
                onChange={handleChange}
                type="text"
                placeholder="Your Name..."
                name="username"
                value={formdata.username}
              ></input>
              <label className="signup-label" htmlFor="email">
                Email
              </label>
              <input
                className="signup-input"
                onChange={handleChange}
                type="email"
                placeholder="Email..."
                name="email"
                value={formdata.email}
              ></input>
              <label className="signup-label" htmlFor="password">
                Password
              </label>
              <input
                className="signup-input"
                onChange={handleChange}
                type="password"
                placeholder="Password..."
                name="password"
                value={formdata.password}
              ></input>
              <button
                className="button"
                id="login-signup-btn"
                type="button"
                onClick={handleClick}
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
