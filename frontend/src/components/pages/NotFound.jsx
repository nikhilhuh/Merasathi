import { useNavigate } from "react-router-dom";
import "../../Stylesheet/NotFound.css";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="notfound-wrapper">
      <div className="notfound-card">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div onClick={() => navigate(-1)} className="notfound-btn">
          Go Back
        </div>
      </div>
    </div>
  );
};

export default NotFound;
