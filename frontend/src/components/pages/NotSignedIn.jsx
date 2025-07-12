import React from "react";
import { Link } from "react-router-dom";
import "../../Stylesheet/NotSignedIn.css";
import Navbar from "../Layout/Navbar";

const NotSignedIn = () => {
  return (
    <>
      <Navbar />
      <div className="not-signedin-overlay">
        <div className="not-signedin-box">
          <h2>You are not signed in</h2>
          <p>Please sign in to continue.</p>
          <Link to="/signin" className="signin-link-button">
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotSignedIn;
