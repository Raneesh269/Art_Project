import React from "react";

function LoginRequiredModal({
  showLoginRequired,
  setShowLoginRequired,
  setShowLogin,
}) {
  if (!showLoginRequired) return null;

  return (
    <div className="modal">
      <div className="delete-modal">

        <h2>Login Required</h2>

        <p>
          Please login first to add items to your cart.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-delete-btn"
            onClick={() =>
              setShowLoginRequired(false)
            }
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              setShowLoginRequired(false);
              setShowLogin(true);
            }}
          >
            Login
          </button>

        </div>

      </div>
    </div>
  );
}

export default LoginRequiredModal;