import { useState } from "react";
import "../../Stylesheet/Profile.css";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import { useUser } from "../../context/UserContext";
import NotSignedIn from "./NotSignedIn";

const mockUser = {
  name: "Rahul Sharma",
  email: "rahul@example.com",
  gender: "male",
  dateOfBirth: "1995-08-15",
  phone: "9876543210",
  religion: "Hindu",
  caste: "Brahmin",
  motherTongue: "Hindi",
  location: {
    city: "Delhi",
    state: "Delhi",
    country: "India",
  },
  education: "B.Tech in Computer Science",
  profession: "Software Engineer",
  income: "10-12 LPA",
  maritalStatus: "Single",
  profileImage: "",
  bio: "Passionate about tech and life.",
  preferences: {
    ageRange: [23, 28],
    religion: "Hindu",
    caste: "Any",
    location: "India",
  },
};

const Profile = () => {
  const { UserDetails } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(mockUser);

  const handleChange = (e, field, parent) => {
    if (parent) {
      setUser((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [field]: e.target.value,
        },
      }));
    } else {
      setUser((prev) => ({ ...prev, [field]: e.target.value }));
    }
  };

  const toggleEdit = () => setIsEditing((prev) => !prev);

  const handleSave = () => {
    // TODO: Save to API
    console.log("Saved user:", user);
    setIsEditing(false);
  };

  const displayOrNA = (val) => val || "N/A";

  if(!UserDetails) return <NotSignedIn />

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <h2 className="profile-heading">Your Profile</h2>
        <div className="profile-grid">
          <div className="profile-item">
            <label>Name</label>
            {isEditing ? (
              <input
                value={user.name}
                onChange={(e) => handleChange(e, "name")}
              />
            ) : (
              <p>{displayOrNA(user.name)}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Email</label>
            <p>{user.email}</p>
          </div>

          <div className="profile-item">
            <label>Gender</label>
            {isEditing ? (
              <select
                value={user.gender}
                onChange={(e) => handleChange(e, "gender")}
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            ) : (
              <p>{displayOrNA(user.gender)}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Date of Birth</label>
            {isEditing ? (
              <input
                type="date"
                value={user.dateOfBirth || ""}
                onChange={(e) => handleChange(e, "dateOfBirth")}
              />
            ) : (
              <p>
                {user.dateOfBirth
                  ? new Date(user.dateOfBirth).toLocaleDateString()
                  : "N/A"}
              </p>
            )}
          </div>

          <div className="profile-item">
            <label>Phone</label>
            {isEditing ? (
              <input
                value={user.phone || ""}
                onChange={(e) => handleChange(e, "phone")}
              />
            ) : (
              <p>{displayOrNA(user.phone)}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Religion</label>
            {isEditing ? (
              <input
                value={user.religion || ""}
                onChange={(e) => handleChange(e, "religion")}
              />
            ) : (
              <p>{displayOrNA(user.religion)}</p>
            )}
          </div>

          <div className="profile-item">
            <label>Location</label>
            {isEditing ? (
              <>
                <input
                  placeholder="City"
                  value={user.location?.city || ""}
                  onChange={(e) => handleChange(e, "city", "location")}
                />
                <input
                  placeholder="State"
                  value={user.location?.state || ""}
                  onChange={(e) => handleChange(e, "state", "location")}
                />
                <input
                  placeholder="Country"
                  value={user.location?.country || ""}
                  onChange={(e) => handleChange(e, "country", "location")}
                />
              </>
            ) : (
              <p>
                {user.location?.city || "N/A"}, {user.location?.state || "N/A"},{" "}
                {user.location?.country || "N/A"}
              </p>
            )}
          </div>

          <div className="profile-item full">
            <label>Bio</label>
            {isEditing ? (
              <textarea
                value={user.bio || ""}
                onChange={(e) => handleChange(e, "bio")}
                rows={3}
              />
            ) : (
              <p>{displayOrNA(user.bio)}</p>
            )}
          </div>
        </div>

        <div className="profile-actions">
          {isEditing ? (
            <>
              <button className="btn cancel" onClick={toggleEdit}>
                Cancel
              </button>
              <button className="btn save" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <button className="btn edit" onClick={toggleEdit}>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Profile;
