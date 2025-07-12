import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import ProfileCard from "../Cards/ProfileCard";
import "../../Stylesheet/FindMatch.css";
import { useEffect, useState } from "react";
import { useUser } from "../../context/UserContext";
import NotSignedIn from "./NotSignedIn";
import { suggestions } from "../../services/api/apiCalls/suggesstions";
import ErrorModal from "../Modals/ErrorModal";

const FindMatch = () => {
  const { UserDetails } = useUser();
  const [originalProfiles, setOriginalProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter States
  const [selectedReligion, setSelectedReligion] = useState("");
  const [ageFrom, setAgeFrom] = useState("");
  const [ageTo, setAgeTo] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  useEffect(() => {
    const getSuggestions = async () => {
      if (!UserDetails || loading) return;
      try {
        setLoading(true);
        const response = await suggestions(UserDetails._id);
        if (response.success) {
          setOriginalProfiles(response.suggestions);
          setFilteredProfiles(response.suggestions);
        } else {
          setError(response.message || "Error fetching data, try again later.");
          setTimeout(() => setError(""), 2000);
        }
      } catch (err) {
        setError("Error fetching data, try again later.");
        setTimeout(() => setError(""), 2000);
      } finally {
        setLoading(false);
      }
    };

    getSuggestions();
  }, [UserDetails]);

  const handleSearch = () => {
    const filtered = originalProfiles.filter((profile) => {
      const matchesReligion = selectedReligion
        ? profile.religion === selectedReligion
        : true;
      const matchesGender = selectedGender
        ? profile.gender?.toLowerCase() === selectedGender.toLowerCase()
        : true;
      const matchesAge =
        (!ageFrom || profile.age >= parseInt(ageFrom)) &&
        (!ageTo || profile.age <= parseInt(ageTo));

      return matchesReligion && matchesGender && matchesAge;
    });

    setFilteredProfiles(filtered);
  };

  if (!UserDetails) return <NotSignedIn />;

  return (
    <div>
      {error && <ErrorModal error={error} />}
      <Navbar />

      {/* Hero Section */}
      <section className="findmatch-hero">
        <div className="hero-overlay">
          <h1>Find Your Perfect Match</h1>
          <p className="hero-subtext">
            Search through thousands of verified profiles tailored just for you.
          </p>

          <div className="hero-filters">
            <select value={selectedReligion} onChange={(e) => setSelectedReligion(e.target.value)}>
              <option value="">Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
              <option value="Jain">Jain</option>
              <option value="Buddhist">Buddhist</option>
            </select>

            <div className="age-range">
              <select value={ageFrom} onChange={(e) => setAgeFrom(e.target.value)}>
                <option value="">Age From</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="23">23</option>
                <option value="25">25</option>
                <option value="28">28</option>
                <option value="30">30</option>
              </select>
              <select value={ageTo} onChange={(e) => setAgeTo(e.target.value)}>
                <option value="">Age To</option>
                <option value="24">24</option>
                <option value="27">27</option>
                <option value="30">30</option>
                <option value="34">34</option>
                <option value="40">40</option>
              </select>
            </div>

            <select value={selectedGender} onChange={(e) => setSelectedGender(e.target.value)}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            <button className="search-btn" onClick={handleSearch}>Search</button>
          </div>
        </div>
      </section>

      <div className="container">
        {loading ? (
          <div>
            {/* loader will come here */}
          </div>
        ) : (
          <div className="matches-profile">
            {filteredProfiles.length === 0 ? (
              <p className="no-results">No matches found for selected filters.</p>
            ) : (
              filteredProfiles.map((profile, index) => (
                <ProfileCard key={index} profile={profile} setError={setError} />
              ))
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default FindMatch;
