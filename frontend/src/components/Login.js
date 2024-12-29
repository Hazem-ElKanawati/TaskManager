import React from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="fadeIn first">Welcome to Task Manager</h2>
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="login"
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="password"
          />
          <input
            type="button"
            className="fadeIn login-btn"
            value="Log In"
            onClick={() => console.log("Log In button clicked")}
          />
          <input
            type="button"
            className="fadeIn signup-btn"
            value="Sign Up"
            onClick={() => navigate("/signup")}
          />
        </form>

      </div>
    </div>
  );
}

export default Login;
