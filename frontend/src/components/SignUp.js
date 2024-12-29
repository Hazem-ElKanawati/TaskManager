// SignUp.js
import React from "react";
import "./SignUp.css";

function SignUp() {
  return (
    <div className="wrapper fadeInDown">
      <div id="formContent">
        <div className="fadeIn first">
          <h2>Create an Account</h2>
        </div>

        <form>
          <input
            type="text"
            id="name"
            className="fadeIn second"
            name="name"
            placeholder="Full Name"
          />
          <input
            type="email"
            id="email"
            className="fadeIn third"
            name="email"
            placeholder="Email"
          />
          <input
            type="text"
            id="phone"
            className="fadeIn third"
            name="phone"
            placeholder="Phone Number"
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Sign Up"
          />
        </form>

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
