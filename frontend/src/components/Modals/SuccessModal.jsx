import { useEffect } from "react";
import "../../Stylesheet/SuccessModal.css";

const SuccessModal = ({ success }) => {
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="success-modal-overlay">
      <div className="success-modal-container">
        <div className="success-modal-icon">
          <svg viewBox="0 0 52 52">
            <circle className="circle" cx="26" cy="26" r="25" fill="none" strokeWidth="2" />
            <path className="checkmark" fill="none" strokeWidth="4" d="M14 27l7 7 16-16" />
          </svg>
        </div>
        <div className="success-message">{success}</div>
      </div>
    </div>
  );
};

export default SuccessModal;