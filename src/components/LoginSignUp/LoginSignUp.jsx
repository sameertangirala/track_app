import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './LoginSignUp.css'

import user_icon from '../Assets/person.png'
import password_icon from '../Assets/password.png'

const LoginSignUp = () => {
  const [action, setAction] = useState("Sign Up");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8001/api/login/", {
        username,
        password,
      });
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      setError("");
      navigate("/log");
    } catch (err) {
      setError("Invalid username or password");
    }
  };

  const handleSignUp = async () => {
    try {
      await axios.post("http://127.0.0.1:8001/api/signup/", {
        username,
        password,
      });
      setError("");
      alert("Account created! Please log in");
      setAction("Login"); 
    } catch (err) {
      setError("Could not create account (username may already exist)");
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="inputs">
        <div className="input">
          <img src={user_icon} alt="" />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="input">
          <img src={password_icon} alt="" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="submit_container">
        {action === "Sign Up" ? (
          <div className="submit" onClick={handleSignUp}>
            Sign Up
          </div>
        ) : (
          <div className="submit" onClick={handleLogin}>
            Login
          </div>
        )}
      </div>

      <p
        style={{ marginTop: "10px", cursor: "pointer", color: "blue" }}
        onClick={() => setAction(action === "Login" ? "Sign Up" : "Login")}
      >
        {action === "Login" ? "Don't have an account? Sign Up" : "Already have an account? Login"}
      </p>
    </div>
  )
}

export default LoginSignUp
