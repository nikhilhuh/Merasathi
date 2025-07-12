import Home from "../src/components/pages/Home"
import Signin from "../src/components/pages/Sign-in";
import Signup from "../src/components/pages/Sign-up";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import NotFound from "./components/pages/NotFound";
import FindMatch from "./components/pages/FindMatch";
import MyMatch from "./components/pages/MyMatch";
import Profile from "./components/pages/Profile";
import ViewProfile from "./components/pages/ViewProfile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/findmatch" element={<FindMatch />} />
        <Route path="/mymatches" element={<MyMatch />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/user/:userId" element={<ViewProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
    
  );
}

export default App;
