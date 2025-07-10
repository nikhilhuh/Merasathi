import HeroSection from "../Home/Hero"
import HowItWorks from "../Home/HowItWork"
import SuccessStories from "../Home/SuccessStories"
import WhyChooseUs from "../Home/WhyChooseUs"
import Navbar from "../Layout/Navbar"
import Footer from "../Layout/Footer"
import '../../Stylesheet/Home.css';

const Home = () => {
  return (
    <>
    <Navbar />
    <HeroSection />
    <WhyChooseUs />
    <SuccessStories />
    <HowItWorks />
    <Footer />
    </>
  )
}

export default Home;