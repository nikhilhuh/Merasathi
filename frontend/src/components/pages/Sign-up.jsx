import { useState } from "react";
import signUpImg from "../../assets/images/ImgSign.svg";
import "../../Stylesheet/Sign-up.css";
import Navbar from "../Layout/Navbar";
import { Link } from "react-router-dom";

const Signup = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log(credentials);
  };

  const isFormValid =
    credentials.userName.trim() !== "" &&
    credentials.userEmail.trim() !== "" &&
    credentials.userPassword.trim() !== "";

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <div className="signup-left">
          <h2>Create Account</h2>
          <p className="signup-subtext">
            Already have an account?{" "}
            <Link to="/signin" className="login-link">
              Sign In
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="userName"
              placeholder="Full Name"
              value={credentials.userName}
              onChange={(e) =>
                setCredentials({ ...credentials, userName: e.target.value })
              }
              className="signup-input"
              required
              autoComplete="name"
            />
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={credentials.userEmail}
              onChange={(e) =>
                setCredentials({ ...credentials, userEmail: e.target.value })
              }
              className="signup-input"
              required
              autoComplete="email"
            />
            <input
              type="password"
              name="userPassword"
              placeholder="Password"
              value={credentials.userPassword}
              onChange={(e) =>
                setCredentials({
                  ...credentials,
                  userPassword: e.target.value,
                })
              }
              className="signup-input"
              required
              autoComplete="current-password"
            />

            <button
              disabled={!isFormValid}
              type="submit"
              className={isFormValid ? "signup-submit" : "signup-invalid"}
            >
              Sign Up
            </button>
          </form>
        </div>

        <div className="signup-right">
          <img
            src={signUpImg}
            alt="Signup illustration"
            className="signup-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
