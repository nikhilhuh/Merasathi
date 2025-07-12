import { useEffect } from "react";
import "../../Stylesheet/ErrorModal.css";

const ErrorModal = ({ error }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="error-modal-overlay">
      <div className="error-modal-container">
        <div className="error-modal-icon">
          <svg viewBox="0 0 52 52">
            <circle className="circle" cx="26" cy="26" r="25" fill="none" strokeWidth="2" />
            <path className="cross cross-1" fill="none" strokeWidth="4" d="M16 16 36 36" />
            <path className="cross cross-2" fill="none" strokeWidth="4" d="M36 16 16 36" />
          </svg>
          <p className="error-title">Error</p>
        </div>
        <div className="error-message">{error}</div>
      </div>
    </div>
  );
};

export default ErrorModal;
