import "../../Stylesheet/Navbar.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useUser } from "../../context/UserContext";

const Navbar = () => {
  const { UserDetails } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [menuOpen]);

  const menuItems = [
    { label: "HOME", path: "/" },
    { label: "FIND MY MATCH", path: "/findmatch" },
    { label: "MY MATCHES", path: "/mymatches" },
    { label: "PROFILE", path: "/profile" },
  ];

  const isActive = (path) => location.pathname.endsWith(path);

  const handleNavigate = (path) => {
    navigate(path);
    setMenuOpen(false); // close menu on navigate
  };

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div onClick={() => handleNavigate("/")} className="logo">
          MERA SATHI
        </div>
      
        <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      
        <ul className={`nav-links ${menuOpen ? "nav-active" : ""}`}>
          {menuItems.map((item, index) => (
            <li
              onClick={() => handleNavigate(item.path)}
              key={index}
              className={isActive(item.path) ? "item-active" : "item-not-active"}
            >
              {item.label}
            </li>
          ))}
          {!UserDetails && (
            <div className="buttons">
              <button
                onClick={() => handleNavigate("/signup")}
                className="btn-signup"
              >
                Signup
              </button>
              <button
                onClick={() => handleNavigate("/signin")}
                className="btn-signin"
              >
                Signin
              </button>
            </div>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
