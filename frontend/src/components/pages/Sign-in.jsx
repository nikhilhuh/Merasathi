import { useEffect, useState } from "react";
import "../../Stylesheet/Sign-in.css";
import signInImage from "../../assets/images/ImgSign.svg";
import { Link, useNavigate } from "react-router-dom";
import { signin } from "../../services/api/apiCalls/signin";
import { fetchUser } from "../../services/api/apiCalls/fetchUser";
import { Eye, EyeClosed } from "lucide-react";
import SuccessModal from "../Modals/SuccessModal";
import ErrorModal from "../Modals/ErrorModal";
import { useUser } from "../../context/UserContext";
import AlreadySignedIn from "./AlreadySignedIn";

const Signin = () => {
  const navigate = useNavigate();
  const { UserDetails, setUserDetails } = useUser();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [credentials, setCredentials] = useState({
    userEmail: "",
    userPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const isFormValid =
    credentials.userEmail.trim() !== "" &&
    credentials.userPassword.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || loading) return;
    try {
      setLoading(true);
      const response = await signin(
        credentials.userEmail,
        credentials.userPassword
      );
      if (response.success) {
        const userRes = await fetchUser(credentials.userEmail);
        if (userRes.success) {
          setSuccess("You are now signed in.");
          setTimeout(() => {
            setSuccess("");
            localStorage.setItem("user", JSON.stringify(userRes.user));
            setUserDetails(userRes.user);
            navigate(-1);
          }, 2000);
        } else {
          setError(userRes.message);
          setTimeout(() => {
            setError("");
          }, 2000);
        }
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

  if (UserDetails) return <AlreadySignedIn />;

  return (
    <div className="signin-wrapper">
      {error && <ErrorModal error={error} />}
      {success && <SuccessModal success={success} />}
      <div className="signin-card">
        <div className="signin-left">
          <h2>Welcome Back</h2>
          <p className="signin-subtext">
            Don’t have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign up here
            </Link>
          </p>

          <form className="signin-form" onSubmit={handleSubmit}>
            <input
              type="email"
              name="userEmail"
              placeholder="Email"
              value={credentials.userEmail}
              onChange={(e) =>
                setCredentials({ ...credentials, userEmail: e.target.value })
              }
              className="signin-input"
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
                className="signin-input-password"
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
              type="submit"
              disabled={!isFormValid || loading}
              className={
                isFormValid || loading ? "signin-submit" : "signin-invalid"
              }
            >
              {loading ? "Signining in.." : "Signin"}
            </button>
          </form>
        </div>

        <div className="signin-right">
          <img
            src={signInImage}
            alt="Sign in illustration"
            className="signin-image"
          />
        </div>
      </div>
    </div>
  );
};

export default Signin;
