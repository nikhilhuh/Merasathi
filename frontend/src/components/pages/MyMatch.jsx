import { useState } from "react";
import "../../Stylesheet/MyMatch.css";
import Navbar from "../Layout/Navbar";
import Footer from "../Layout/Footer";
import ProfileCard from "../Cards/ProfileCard";

const MyMatch = () => {
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

  const [activeTab, setActiveTab] = useState("sent");
  const [activeFilter, setActiveFilter] = useState("All");

  return (
    <div>
      <Navbar />
      <div className="container">
        <div className="upper-section">
          {/* Main Menu Tabs */}
          <div className="main-tabs">
            <button onClick={()=> setActiveTab("sent")} className={activeTab === "sent" ? "active" : ""}>
              Sent Requests
            </button>
            <button onClick={()=> setActiveTab("received")} className={activeTab === "received" ? "active" : ""}>
              Received Requests
            </button>
          </div>

          {/* Sub Filters */}
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

        <div className="matches-profile">
          {Profiles.map((profile, index) => (
            <ProfileCard key={index} profile={profile}/>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MyMatch;
