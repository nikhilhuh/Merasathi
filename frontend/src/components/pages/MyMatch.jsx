import { useEffect, useState } from "react";
import "../../Stylesheet/MyMatch.css";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import ProfileCard from "../Cards/ProfileCard";
import { useUser } from "../../context/UserContext";
import NotSignedIn from "./NotSignedIn";
import ErrorModal from "../Modals/ErrorModal";
import { getRequests } from "../../services/api/apiCalls/getRequests";

const MyMatch = () => {
  const { UserDetails } = useUser();
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("sent"); // "sent" or "received"
  const [activeFilter, setActiveFilter] = useState("All");
  const [loading, setLoading] = useState(false);
  const [originalProfiles, setOriginalProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);

  useEffect(() => {
    const getMyRequests = async () => {
      if (!UserDetails) return;
      try {
        setLoading(true);
        const response = await getRequests(UserDetails._id, activeTab);
        if (response.success) {
          setOriginalProfiles(response.requests);
          setFilteredProfiles(response.requests); // initially unfiltered
        } else {
          setError(response.message || "Failed to load your match requests.");
          setTimeout(() => setError(""), 2000);
        }
      } catch (err) {
        setError("Failed to load your match requests.");
        setTimeout(() => setError(""), 2000);
      } finally {
        setLoading(false);
      }
    };

    getMyRequests();
  }, [UserDetails, activeTab]);

  useEffect(() => {
    if (activeFilter === "All") {
      setFilteredProfiles(originalProfiles);
    } else {
      const filtered = originalProfiles.filter((item) => {
        return item.status?.toLowerCase() === activeFilter.toLowerCase();
      });
      setFilteredProfiles(filtered);
    }
  }, [activeFilter, originalProfiles]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!UserDetails) return <NotSignedIn />;

  return (
    <div>
      {error && <ErrorModal error={error} />}
      <Navbar />
      <div className="container">
        <div className="upper-section">
          {/* Tabs */}
          <div className="main-tabs">
            <button
              onClick={() => setActiveTab("sent")}
              className={activeTab === "sent" ? "active" : ""}
            >
              Sent Requests
            </button>
            <button
              onClick={() => setActiveTab("received")}
              className={activeTab === "received" ? "active" : ""}
            >
              Received Requests
            </button>
          </div>

          {/* Filters */}
          <div className="filters">
            {["All", "Accepted", "Rejected", "Pending"].map((filter) => (
              <div
                key={filter}
                className={activeFilter === filter ? "filter active" : "filter"}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </div>
            ))}
          </div>
        </div>

        {/* Profiles */}
        <div className="matches-profile">
          {loading ? (
            <>{/* loader will come here */}</>
          ) : filteredProfiles.length === 0 ? (
            <p>No requests found.</p>
          ) : (
            filteredProfiles.map((profile, index) => {
              return (
                <ProfileCard
                  key={index}
                  profile={profile}
                  setError={setError}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MyMatch;
