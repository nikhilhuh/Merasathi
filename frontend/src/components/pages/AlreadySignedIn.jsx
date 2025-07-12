import { useNavigate } from "react-router-dom";
import "../../Stylesheet/AlreadySignedIn.css";
import { useUser } from "../../context/UserContext";
import { logout } from "../../services/api/apiCalls/logout";
import { useState } from "react";
import ErrorModal from "../Modals/ErrorModal";
import SuccessModal from "../Modals/SuccessModal";
import Navbar from "../Layout/Navbar";

const AlreadySignedIn = () => {
  const navigate = useNavigate();
  const { UserDetails, setUserDetails } = useUser();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (!UserDetails || loading) return;
    try {
      setLoading(true);
      const repsonse = await logout(UserDetails._id);
      if (repsonse.success) {
        setSuccess("Logout successfully");
        setTimeout(() => {
          setSuccess("");
          localStorage.removeItem("user");
          setUserDetails(null);
        }, 2000);
      } else {
        setError(repsonse.messsage || "Error logging out, try again later.");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Error logging out, try again later.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <div className="signedin-overlay">
        <div className="signedin-box">
          <h2>You are already signed in</h2>
          <p>You cannot access this page while logged in.</p>
          <div className="signedin-buttons">
            <button
              disabled={loading}
              className="btn go-back"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button
              disabled={loading}
              className="btn logout"
              onClick={handleLogout}
            >
              {loading ? "Logging out.." : "Log out"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlreadySignedIn;
