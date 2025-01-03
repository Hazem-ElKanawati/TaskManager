import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!username || !password) {
      setError("Both fields are required");
      return;
    }

    const user = { username, password };

    try {
      const response = await fetch("http://localhost:8080/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        setSuccessMessage("User registered successfully! Redirecting to login...");
        setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
      } else {
        const errorMsg = await response.text();
        setError(errorMsg || "Failed to register user");
      }
    } catch (err) {
      console.error("Error during sign-up:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <h2>Create an Account</h2>
        </div>

        <form onSubmit={handleSignUp}>
          <input
            type="text"
            id="name"
            className="fadeIn second"
            name="name"
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
          <input type="submit" className="fadeIn fourth" value="Sign Up" />
        </form>

        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div id="formFooter">
          <a className="underlineHover" href="/">
            Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
