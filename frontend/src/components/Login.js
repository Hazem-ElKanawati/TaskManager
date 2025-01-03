import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const user = { username, password };

    try {
      const response = await fetch("http://localhost:8080/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const userId = await response.text(); // Get user ID from the response
        localStorage.setItem("userId", userId); // Store user ID in localStorage
        navigate("/todolist"); // Navigate to the ToDoList page
      } else {
        const message = await response.text();
        setError(message || "Invalid credentials.");
      }
    } catch (err) {
      console.error("Error during login:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <h2 className="fadeIn first">Welcome to Task Manager</h2>
        <form>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            id="password"
            className="fadeIn third"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="button"
            className="fadeIn login-btn"
            value="Log In"
            onClick={handleLogin}
          />
          <input
            type="button"
            className="fadeIn signup-btn"
            value="Sign Up"
            onClick={() => navigate("/signup")}
          />
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
}

export default Login;
