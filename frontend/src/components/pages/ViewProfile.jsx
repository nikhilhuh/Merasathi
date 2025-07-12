import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import "../../Stylesheet/Profile.css";
import ErrorModal from "../Modals/ErrorModal";
import SuccessModal from "../Modals/SuccessModal";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { sendRequests } from "../../services/api/apiCalls/sendRequests";
import { useUser } from "../../context/UserContext";
import NotSignedIn from "./NotSignedIn";
import { updateRequests } from "../../services/api/apiCalls/updateRequests";

const defaultImage = "https://lh3.googleusercontent.com/a/default-user";

const displayOrNA = (val) => val || "N/A";

const ViewProfile = () => {
  const { UserDetails } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const profile = location.state;
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!profile || !UserDetails?.requests) return;

    const receivedRequest = UserDetails.requests.find(
      (r) => r.from?._id === profile._id
    );

    if (receivedRequest) {
      profile.status = receivedRequest.status;
      profile._isReceived = true;
      t;
    }
  }, [UserDetails, profile]);

  const handleSendRequest = async () => {
    if (!profile || loading || !UserDetails) return;
    try {
      setLoading(true);
      const response = await sendRequests(UserDetails._id, profile._id);
      if (response.success) {
        setSuccess("Request sent successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
      } else {
        setError(response.message || "Failed to send request, try again later");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to send request, try again later");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRequest = async (status) => {
    if (!UserDetails || !profile._id) return;
    try {
      setLoading(true);
      const response = await updateRequests(
        UserDetails._id,
        profile._id,
        status
      );
      if (response.success) {
        setSuccess(`Request ${status} successfully`);
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        profile.status = status;
      } else {
        setError(response.message || "Failed to update request status");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to update request status");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  if (!UserDetails) return <NotSignedIn />;

  if (!profile) {
    return (
      <>
        <Navbar />
        <div className="profile-page">
          <h2 className="profile-title">No Profile Found</h2>
        </div>
      </>
    );
  }

  return (
    <>
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />
      <div className="profile-page">
        <ArrowLeft onClick={() => navigate(-1)} />
        <h2 className="profile-title">Profile of {profile.name}</h2>

        {/* Profile Image and Info */}
        <div className="profile-card">
          <div className="card-header">
            <div className="profile-image-info">
              <img
                src={profile.profileImage || defaultImage}
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-info">
                <h4>{displayOrNA(profile.name)}</h4>
                <p>{displayOrNA(profile.profession)}</p>
                <p>
                  {displayOrNA(profile.location?.city)},{" "}
                  {displayOrNA(profile.location?.state)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Personal Information</h3>
          </div>
          <div className="card-content">
            <div>
              <strong>Email:</strong> {displayOrNA(profile.email)}
            </div>
            <div>
              <strong>Gender:</strong> {displayOrNA(profile.gender)}
            </div>
            <div>
              <strong>Phone:</strong> {displayOrNA(profile.phone)}
            </div>
            <div>
              <strong>DOB:</strong>{" "}
              {profile.dateOfBirth
                ? new Date(profile.dateOfBirth).toLocaleDateString()
                : "N/A"}
            </div>
            <div>
              <strong>Religion:</strong> {displayOrNA(profile.religion)}
            </div>
            <div>
              <strong>Caste:</strong> {displayOrNA(profile.caste)}
            </div>
            <div>
              <strong>Mother Tongue:</strong>{" "}
              {displayOrNA(profile.motherTongue)}
            </div>
            <div>
              <strong>Education:</strong> {displayOrNA(profile.education)}
            </div>
            <div>
              <strong>Profession:</strong> {displayOrNA(profile.profession)}
            </div>
            <div>
              <strong>Income:</strong> {displayOrNA(profile.income)}
            </div>
            <div>
              <strong>Marital Status:</strong>{" "}
              {displayOrNA(profile.maritalStatus)}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="profile-card">
          <div className="card-header">
            <h4>Address</h4>
          </div>
          <div className="card-content">
            <div>
              <strong>City:</strong> {displayOrNA(profile.location?.city)}
            </div>
            <div>
              <strong>State:</strong> {displayOrNA(profile.location?.state)}
            </div>
            <div>
              <strong>Country:</strong> {displayOrNA(profile.location?.country)}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="profile-card">
          <div className="card-header">
            <h4>Bio</h4>
          </div>
          <div className="card-content">
            <p>{displayOrNA(profile.bio)}</p>
          </div>
        </div>

        {/* Preferences */}
        <div className="profile-card">
          <div className="card-header">
            <h4>Preferences</h4>
          </div>
          <div className="card-content">
            <div>
              <strong>Age Range:</strong>{" "}
              {profile.preferences?.ageRange?.[0] || "N/A"} -{" "}
              {profile.preferences?.ageRange?.[1] || "N/A"}
            </div>
            <div>
              <strong>Preferred Religion:</strong>{" "}
              {displayOrNA(profile.preferences?.religion)}
            </div>
            <div>
              <strong>Preferred Caste:</strong>{" "}
              {displayOrNA(profile.preferences?.caste)}
            </div>
            <div>
              <strong>Preferred Location:</strong>{" "}
              {displayOrNA(profile.preferences?.location)}
            </div>
          </div>
        </div>

        {/* Request Action Button */}
        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          {profile.status === "accepted" && (
            <button className="save-btn" disabled>
              Request Accepted ✅
            </button>
          )}

          {profile.status === "pending" && (
            <>
              {profile._isReceived ? (
                <>
                  <button
                    className="save-btn"
                    onClick={() => handleUpdateRequest("accepted")}
                    disabled={loading}
                  >
                    {loading ? "Accepting..." : "Accept Request"}
                  </button>
                  <button
                    className="reject-btn"
                    onClick={() => handleUpdateRequest("rejected")}
                    disabled={loading}
                  >
                    {loading ? "Rejecting..." : "Reject Request"}
                  </button>
                </>
              ) : (
                <button className="save-btn" disabled>
                  Request Pending ⏳
                </button>
              )}
            </>
          )}

          {profile.status === "rejected" && (
            <button className="reject-btn" disabled>
              Request Rejected ❌
            </button>
          )}

          {!profile.status && (
            <button
              disabled={loading}
              onClick={handleSendRequest}
              className="save-btn"
            >
              {loading ? "Sending..." : "Send Request"}
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default ViewProfile;
