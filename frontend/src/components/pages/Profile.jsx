import { useEffect, useState } from "react";
import "../../Stylesheet/Profile.css";
import Footer from "../Layout/Footer";
import Navbar from "../Layout/Navbar";
import { useUser } from "../../context/UserContext";
import NotSignedIn from "./NotSignedIn";
import { updateProfile } from "../../services/api/apiCalls/updateProfile";
import { logout } from "../../services/api/apiCalls/logout";
import ErrorModal from "../Modals/ErrorModal";
import SuccessModal from "../Modals/SuccessModal";

const defaultImage = "https://lh3.googleusercontent.com/a/default-user";

const Profile = () => {
  const { UserDetails, setUserDetails } = useUser();
  const [user, setUser] = useState(null);
  const [originalUser, setOriginalUser] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (UserDetails) {
      setUser(UserDetails);
      setOriginalUser(UserDetails);
    }
  }, [UserDetails]);

  const handleAgeRangeChange = (index, value) => {
    const numericValue = Number(value); // ensure it's a number
    setUser((prev) => {
      const currentRange = Array.isArray(prev.preferences?.ageRange)
        ? [...prev.preferences.ageRange]
        : [null, null]; // default fallback

      currentRange[index] = numericValue;

      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          ageRange: currentRange,
        },
      };
    });
  };

  const handleChange = (e, field, parent) => {
    const value = e.target.value;
    setUser((prev) =>
      parent
        ? { ...prev, [parent]: { ...prev[parent], [field]: value } }
        : { ...prev, [field]: value }
    );
  };

  const displayOrNA = (val) => val || "N/A";

  const getUpdatedFields = (current, original) => {
    const updated = {};
    for (let key in current) {
      const currentVal = current[key];
      const originalVal = original?.[key];

      if (Array.isArray(currentVal) && Array.isArray(originalVal)) {
        // Check if array contents differ
        if (
          currentVal.length !== originalVal.length ||
          currentVal.some((val, i) => val !== originalVal[i])
        ) {
          updated[key] = currentVal; // ✅ keep it as array
        }
      } else if (
        typeof currentVal === "object" &&
        currentVal !== null &&
        originalVal
      ) {
        const nested = getUpdatedFields(currentVal, originalVal);
        if (Object.keys(nested).length > 0) {
          updated[key] = nested;
        }
      } else if (currentVal !== originalVal) {
        updated[key] = currentVal;
      }
    }
    return updated;
  };

  const handleSave = async () => {
    if (!UserDetails || loading) return;
    const updatedData = getUpdatedFields(user, originalUser);
    try {
      setLoading(true);
      const response = await updateProfile(UserDetails._id, updatedData);
      if (response.success) {
        setSuccess("Profile updated successfully");
        setTimeout(() => {
          setSuccess("");
        }, 2000);
        localStorage.setItem("user", JSON.stringify(response.user));
        setUserDetails(response.user);
        setOriginalUser(response.user);
        setEditSection(null);
      } else {
        setError(
          response.message || "Failed to update profile, try again later."
        );
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Failed to update profile, try again later.");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

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

  if (!UserDetails || !user) return <NotSignedIn />;

  return (
    <>
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <Navbar />
      <div className="profile-page">
        <h2 className="profile-title">My Profile</h2>

        {/* Profile Image and Basic Info */}
        <div className="profile-card">
          <div className="card-header">
            <div className="profile-image-info">
              <img
                src={user.profileImage || defaultImage}
                alt="Profile"
                className="profile-avatar"
              />
              <div className="profile-info">
                <h4>{user.name || "No Name"}</h4>
                <p>{user.profession || "N/A"}</p>
                <p>
                  {user.location?.city || "N/A"},{" "}
                  {user.location?.state || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Personal Info */}
        <div className="profile-card">
          <div className="card-header">
            <h3>Personal Information</h3>
            {editSection === "personal" ? (
              <div className="edit-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setEditSection(null)}
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="save-btn"
                  onClick={handleSave}
                >
                  {loading ? "Saving.." : "Save"}{" "}
                </button>
              </div>
            ) : (
              <button
                className="edit-button"
                onClick={() => setEditSection("personal")}
              >
                Edit ✏️
              </button>
            )}
          </div>
          <div className="card-content">
            <div>
              <strong>Name:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.name}
                  onChange={(e) => handleChange(e, "name")}
                />
              ) : (
                displayOrNA(user.name)
              )}
            </div>
            <div>
              <strong>Email:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              ) : (
                displayOrNA(user.email)
              )}
            </div>
            <div>
              <strong>Gender:</strong>{" "}
              {editSection === "personal" ? (
                <select
                  value={user.gender || ""}
                  onChange={(e) => handleChange(e, "gender")}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              ) : (
                displayOrNA(user.gender)
              )}
            </div>
            <div>
              <strong>Phone:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.phone || ""}
                  onChange={(e) => handleChange(e, "phone")}
                />
              ) : (
                displayOrNA(user.phone)
              )}
            </div>
            <div>
              <strong>DOB:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  type="date"
                  value={user.dateOfBirth?.slice(0, 10) || ""}
                  onChange={(e) => handleChange(e, "dateOfBirth")}
                />
              ) : user.dateOfBirth ? (
                new Date(user.dateOfBirth).toLocaleDateString()
              ) : (
                "N/A"
              )}
            </div>
            <div>
              <strong>Religion:</strong>{" "}
              {editSection === "personal" ? (
                <select
                  value={user.preferences?.religion}
                  onChange={(e) => handleChange(e, "religion")}
                >
                  <option value="">Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Jain">Jain</option>
                  <option value="Buddhist">Buddhist</option>
                </select>
              ) : (
                displayOrNA(user.religion)
              )}
            </div>
            <div>
              <strong>Caste:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.caste || ""}
                  onChange={(e) => handleChange(e, "caste")}
                />
              ) : (
                displayOrNA(user.caste)
              )}
            </div>
            <div>
              <strong>Mother Tongue:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.motherTongue || ""}
                  onChange={(e) => handleChange(e, "motherTongue")}
                />
              ) : (
                displayOrNA(user.motherTongue)
              )}
            </div>
            <div>
              <strong>Education:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.education || ""}
                  onChange={(e) => handleChange(e, "education")}
                />
              ) : (
                displayOrNA(user.education)
              )}
            </div>
            <div>
              <strong>Profession:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.profession || ""}
                  onChange={(e) => handleChange(e, "profession")}
                />
              ) : (
                displayOrNA(user.profession)
              )}
            </div>
            <div>
              <strong>Income:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.income || ""}
                  onChange={(e) => handleChange(e, "income")}
                />
              ) : (
                displayOrNA(user.income)
              )}
            </div>
            <div>
              <strong>Marital Status:</strong>{" "}
              {editSection === "personal" ? (
                <input
                  value={user.maritalStatus || ""}
                  onChange={(e) => handleChange(e, "maritalStatus")}
                />
              ) : (
                displayOrNA(user.maritalStatus)
              )}
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="profile-card">
          <div className="card-header">
            <h4>Address</h4>
            {editSection === "address" ? (
              <div className="edit-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setEditSection(null)}
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="save-btn"
                  onClick={handleSave}
                >
                  {loading ? "Saving.." : "Save"}{" "}
                </button>
              </div>
            ) : (
              <button
                className="edit-button"
                onClick={() => setEditSection("address")}
              >
                Edit ✏️
              </button>
            )}
          </div>
          <div className="card-content">
            <div>
              <strong>City:</strong>{" "}
              {editSection === "address" ? (
                <input
                  value={user.location?.city || ""}
                  onChange={(e) => handleChange(e, "city", "location")}
                />
              ) : (
                displayOrNA(user.location?.city)
              )}
            </div>
            <div>
              <strong>State:</strong>{" "}
              {editSection === "address" ? (
                <input
                  value={user.location?.state || ""}
                  onChange={(e) => handleChange(e, "state", "location")}
                />
              ) : (
                displayOrNA(user.location?.state)
              )}
            </div>
            <div>
              <strong>Country:</strong>{" "}
              {editSection === "address" ? (
                <input
                  value={user.location?.country || ""}
                  onChange={(e) => handleChange(e, "country", "location")}
                />
              ) : (
                displayOrNA(user.location?.country)
              )}
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="profile-card">
          <div className="card-header">
            <h4>Bio</h4>
            {editSection === "bio" ? (
              <div className="edit-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setEditSection(null)}
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="save-btn"
                  onClick={handleSave}
                >
                  {loading ? "Saving.." : "Save"}{" "}
                </button>
              </div>
            ) : (
              <button
                className="edit-button"
                onClick={() => setEditSection("bio")}
              >
                Edit ✏️
              </button>
            )}
          </div>
          <div className="card-content">
            {editSection === "bio" ? (
              <textarea
                value={user.bio || ""}
                onChange={(e) => handleChange(e, "bio")}
              />
            ) : (
              <p>{displayOrNA(user.bio)}</p>
            )}
          </div>
        </div>

        {/* Preferences */}
        <div className="profile-card">
          <div className="card-header">
            <h4>Your Preferences</h4>
            {editSection === "preferences" ? (
              <div className="edit-buttons">
                <button
                  className="cancel-btn"
                  onClick={() => setEditSection(null)}
                >
                  Cancel
                </button>
                <button
                  disabled={loading}
                  className="save-btn"
                  onClick={handleSave}
                >
                  {loading ? "Saving.." : "Save"}{" "}
                </button>
              </div>
            ) : (
              <button
                className="edit-button"
                onClick={() => setEditSection("preferences")}
              >
                Edit ✏️
              </button>
            )}
          </div>
          <div className="card-content">
            <div>
              <strong>Age Range:</strong>{" "}
              {editSection === "preferences" ? (
                <>
                  <input
                    type="number"
                    placeholder="Min"
                    value={user.preferences?.ageRange?.[0] || ""}
                    onChange={(e) => handleAgeRangeChange(0, e.target.value)}
                    style={{ width: "60px" }}
                  />
                  {" - "}
                  <input
                    type="number"
                    placeholder="Max"
                    value={user.preferences?.ageRange?.[1] || ""}
                    onChange={(e) => handleAgeRangeChange(1, e.target.value)}
                    style={{ width: "60px" }}
                  />
                </>
              ) : (
                `${user.preferences?.ageRange?.[0] || "N/A"} - ${
                  user.preferences?.ageRange?.[1] || "N/A"
                }`
              )}
            </div>

            <div>
              <strong>Preferred Religion:</strong>{" "}
              {editSection === "preferences" ? (
                <select
                  value={user.preferences?.religion}
                  onChange={(e) => handleChange(e, "religion", "preferences")}
                >
                  <option value="">Religion</option>
                  <option value="Hindu">Hindu</option>
                  <option value="Muslim">Muslim</option>
                  <option value="Christian">Christian</option>
                  <option value="Sikh">Sikh</option>
                  <option value="Jain">Jain</option>
                  <option value="Buddhist">Buddhist</option>
                </select>
              ) : (
                displayOrNA(user.preferences?.religion)
              )}
            </div>

            <div>
              <strong>Preferred Caste:</strong>{" "}
              {editSection === "preferences" ? (
                <input
                  value={user.preferences?.caste || ""}
                  onChange={(e) => handleChange(e, "caste", "preferences")}
                />
              ) : (
                displayOrNA(user.preferences?.caste)
              )}
            </div>

            <div>
              <strong>Preferred Location:</strong>{" "}
              {editSection === "preferences" ? (
                <input
                  value={user.preferences?.location || ""}
                  onChange={(e) => handleChange(e, "location", "preferences")}
                />
              ) : (
                displayOrNA(user.preferences?.location)
              )}
            </div>
          </div>
        </div>

        {/* logout button */}
        <button
          disabled={loading}
          className="btn logout"
          onClick={handleLogout}
        >
          {loading ? "Logging out.." : "Log out"}
        </button>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
