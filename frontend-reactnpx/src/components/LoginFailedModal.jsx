import React from "react";

function LoginFailedModal({
  showLoginFailedModal,
  setShowLoginFailedModal,
}) {

  if (!showLoginFailedModal)
    return null;

  return (
    <div className="modal">

      <div className="delete-modal">

        <h2>
          Login Failed
        </h2>

        <p>
          Invalid username or password.
        </p>

        <div className="delete-actions">

          <button
            className="delete-btn"
            onClick={() =>
              setShowLoginFailedModal(false)
            }
          >
            OK
          </button>

        </div>

      </div>

    </div>
  );
}

export default LoginFailedModal;