import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import ProfileCard from "../Cards/ProfileCard";
import "../../Stylesheet/FindMatch.css";
import { useEffect } from "react";
import { useUser } from "../../context/UserContext";
import NotSignedIn from "./NotSignedIn";

const FindMatch = () => {
  const { UserDetails } = useUser();

  const Profiles = [
    { name: "Neha", age: 26, religion: "Hindu", image: null },
    { name: "Rahul", age: 23, religion: "Hindi", image: null },
    { name: "Snehpreet", age: 24, religion: "Punjabi", image: null },
    { name: "Vikram", age: 27, religion: "Christian", image: null },
    { name: "Anjali", age: 22, religion: "Muslim", image: null },
    { name: "Rohit", age: 25, religion: "Bengali", image: null },
    { name: "Vaishnavi", age: 22, religion: "Hindu", image: null },
    { name: "Gullu", age: 28, religion: "Hindu", image: null },
    { name: "Harleen", age: 24, religion: "Punjabi", image: null },
    { name: "Sehaj", age: 27, religion: "Christian", image: null },
    { name: "Asma", age: 22, religion: "Muslim", image: null },
    { name: "Yogesh", age: 25, religion: "Bengali", image: null },
  ];
    useEffect(()=> {
      window.scrollTo(0,0);
    },[]);

    if(!UserDetails) return <NotSignedIn />

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="findmatch-hero">
        <div className="hero-overlay">
          <h1>Find Your Perfect Match</h1>
          <p className="hero-subtext">
            Search through thousands of verified profiles tailored just for you.
          </p>

          <div className="hero-filters">
            <select id="religion">
              <option value="">Religion</option>
              <option value="Hindu">Hindu</option>
              <option value="Muslim">Muslim</option>
              <option value="Christian">Christian</option>
              <option value="Sikh">Sikh</option>
            </select>

            <div className="age-range">
              <select id="age-from">
                <option value="">Age From</option>
                <option value="18">18</option>
                <option value="20">20</option>
                <option value="23">23</option>
                <option value="25">25</option>
                <option value="28">28</option>
                <option value="30">30</option>
              </select>
              <select id="age-to">
                <option value="">Age To</option>
                <option value="24">24</option>
                <option value="27">27</option>
                <option value="30">30</option>
                <option value="34">34</option>
                <option value="40">40</option>
              </select>
            </div>

            <select id="gender">
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Others</option>
            </select>

            <button className="search-btn">Search</button>
          </div>
        </div>
      </section>

      <div className="container">
        <div className="matches-profile">
          {Profiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FindMatch;
