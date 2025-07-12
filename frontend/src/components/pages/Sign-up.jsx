import { useEffect, useState } from "react";
import signUpImg from "../../assets/images/ImgSign.svg";
import "../../Stylesheet/Sign-up.css";
import { Link, useNavigate } from "react-router-dom";
import ErrorModal from "../Modals/ErrorModal";
import SuccessModal from "../Modals/SuccessModal";
import { signup } from "../../services/api/apiCalls/signup";
import { Eye, EyeClosed } from "lucide-react";
import { useUser } from "../../context/UserContext";
import AlreadySignedIn from "./AlreadySignedIn";

const Signup = () => {
  const { UserDetails } = useUser(); 
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [credentials, setCredentials] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(()=> {
    window.scrollTo(0,0);
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
    try {
      setLoading(true);
      const response = await signup(
        credentials.userName,
        credentials.userEmail,
        credentials.userPassword
      );
      if (response.success) {
        setSuccess("Registered successfully, you can now log in");
        setTimeout(() => {
          setSuccess("");
          navigate("/signin");
        }, 2000);
      } else {
        setError(response.message || "Something went wrong, try again later");
        setTimeout(() => {
          setError("");
        }, 2000);
      }
    } catch (err) {
      setError("Something went wrong, try again later");
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    credentials.userName.trim() !== "" &&
    credentials.userEmail.trim() !== "" &&
    credentials.userPassword.trim() !== "";

    if(UserDetails) return <AlreadySignedIn />

  return (
    <div className="signup-wrapper">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <div className="signup-card">
        <div className="signup-left">
          <h2>Create Account</h2>
          <p className="signup-subtext">
            Already have an account?{" "}
            <Link to="/signin" className="login-link">
              Sign In
            </Link>
          </p>

          <form onSubmit={handleSubmit} className="signup-form">
            <input
              type="text"
              name="userName"
              placeholder="Full Name"
              value={credentials.userName}
              onChange={(e) =>
                setCredentials({ ...credentials, userName: e.target.value })
              }
              className="signup-input"
              required
              autoComplete="name"
            />
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={credentials.userEmail}
              onChange={(e) =>
                setCredentials({ ...credentials, userEmail: e.target.value })
              }
              className="signup-input"
              required
              autoComplete="email"
            />
            <div className="password-wrapper">
              <input
                type={`${showPassword ? "text" : "password"}`}
                name="userPassword"
                placeholder="Password"
                value={credentials.userPassword}
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    userPassword: e.target.value,
                  })
                }
                className="signup-input-password"
                required
                autoComplete="current-password"
              />
              <div
                className="eye"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeClosed /> : <Eye />}
              </div>
            </div>

            <button
              disabled={!isFormValid || loading}
              type="submit"
              className={isFormValid || loading ? "signup-submit" : "signup-invalid"}
            >
              {loading? "Signing you up..." : "Signup"}
            </button>
          </form>
        </div>

        <div className="signup-right">
          <img
            src={signUpImg}
            alt="Signup illustration"
            className="signup-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
