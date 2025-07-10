import { Link } from "react-router-dom";
import HeroImg from "../../assets/images/undraw_together_s27q.svg";

const HeroSection = () => {
  return (
    <header className="hero">
      <div className="hero-content">
        <h1>
          Find Your Perfect <br />
          Match with <br />
          <span className="highlight">MERASATHI</span>
        </h1>
        <p>Easy matchmaking for everyone.</p>
        <div className="hero-buttons">
          <Link to="/signup">
            <button className="btn primary">Register</button>
          </Link>
          <Link to="/findmatch">
            <button className="btn secondary">Explore</button>
          </Link>
        </div>
      </div>
      <div className="hero-image">
        <img src={HeroImg} alt="Happy couple illustration" />
      </div>
    </header>
  );
};

export default HeroSection;
