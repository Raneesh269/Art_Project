import React from "react";

function SuccessPopup({
  showSuccessPopup,
  setShowSuccessPopup,

  successMessage,
  successSubText,
}) {

  if (!showSuccessPopup) return null;

  return (

    <div className="success-overlay">

      <div className="success-popup">

        {/* SUCCESS ICON */}
        <div className="success-icon">
          ✓
        </div>

        {/* TITLE */}
        <h2>
          {successMessage}
        </h2>

        {/* SUBTEXT */}
        <p>
          {successSubText}
        </p>

        {/* BUTTON */}
        <button
          onClick={() =>
            setShowSuccessPopup(false)
          }
        >
          Continue
        </button>

      </div>

    </div>

  );
}

export default SuccessPopup;