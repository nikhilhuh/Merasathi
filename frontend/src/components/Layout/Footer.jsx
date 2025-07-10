import React from "react";
import "../../Stylesheet/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 Mera Sathi, Inc. All Rights Reserved.</p>
        <div className="footer-links">
          <a href="#" aria-label="Privacy Policy">Privacy Policy</a>
          <a href="#" aria-label="Terms of Service">Terms of Service</a>
          <a href="#" aria-label="Report a Vulnerability">Report a Vulnerability</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
