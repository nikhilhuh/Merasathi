import { useNavigate } from "react-router-dom";
import { User2 } from "lucide-react";
import "../../Stylesheet/ProfileCard.css";
import { useState } from "react";
import { viewProfile } from "../../services/api/apiCalls/viewProfile";

const ProfileCard = ({ profile, setError }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleViewProfile = async () => {
    if (loading) return;
    try {
      setLoading(true);
      const response = await viewProfile(profile._id);
      if (response.success) {
        navigate(`/user/${profile._id}`, {
          state: { ...response.user, status: profile.status },
        });
      } else {
        setError(
          response.message || "Error finding profile details, try again later"
        );
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Error finding profile details, try again later");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-card">
      <div>
        {profile.profileImage ? (
          <img
            src={profile.profileImage}
            alt={profile.name}
            className="profile-img"
          />
        ) : (
          <User2 size={40} className="user-placeholder" />
        )}
      </div>
      <h3>{profile.name}</h3>
      <p>Age {profile.age}</p>
      <p>{profile.religion}</p>
      <p>{profile.location?.city || "N/A"}</p>
      <button disabled={loading} onClick={handleViewProfile}>
        {loading ? "Viewing..." : "View Profile"}
      </button>
    </div>
  );
};

export default ProfileCard;
