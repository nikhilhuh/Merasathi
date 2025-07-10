import { User2 } from "lucide-react";
import "../../Stylesheet/ProfileCard.css"

const ProfileCard = ({ profile }) => {
  return (
    <div className="profile-card">
      <div className={profile.image ? "profile-img" : "user-placeholder"}>
        {profile.image ? (
          <img src={profile.image} alt={profile.name} />
        ) : (
          <User2 size={40} />
        )}
      </div>
      <h3>{profile.name}</h3>
      <p>Age {profile.age}</p>
      <p>{profile.religion}</p>
      <button>View Profile</button>
    </div>
  );
};

export default ProfileCard;
