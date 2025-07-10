import { useState } from "react";
import "../../Stylesheet/Sign-in.css";
import signInImage from "../../assets/images/ImgSign.svg";
import { Link } from "react-router-dom";

const Signin = () => {
  const [credentials, setCredentials] = useState({
    userEmail: "",
    userPassword: "",
  });

  const isFormValid =
    credentials.userEmail.trim() !== "" &&
    credentials.userPassword.trim() !== "";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    console.log("Login with:", credentials);
    // You can add API call here
  };

  return (
    <div className="signin-wrapper">
      <div className="signin-card">
        <div className="signin-left">
          <h2>Welcome Back</h2>
          <p className="signin-subtext">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </p>

          <form className="signin-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={credentials.userEmail}
              onChange={(e) =>
                setCredentials({ ...credentials, userEmail: e.target.value })
              }
              className="signin-input"
              required
              autoComplete="email"
            />
            <input
              type="password"
              name="userPassword"
              placeholder="Password"
              value={credentials.userPassword}
              onChange={(e) =>
                setCredentials({ ...credentials, userPassword: e.target.value })
              }
              className="signin-input"
              required
              autoComplete="current-password"
            />

            <button
              type="submit"
              disabled={!isFormValid}
              className={isFormValid ? "signin-submit" : "signin-invalid"}
            >
              Login
            </button>
          </form>
        </div>

        <div className="signin-right">
          <img
            src={signInImage}
            alt="Sign in illustration"
            className="signin-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
