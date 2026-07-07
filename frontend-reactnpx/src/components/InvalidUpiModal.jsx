import React from "react";

function InvalidUpiModal({
  showInvalidUpiModal,
  setShowInvalidUpiModal,
  expectedUpi,
}) {

  if (!showInvalidUpiModal) return null;

  return (
    <div className="modal">

      <div className="delete-modal">

        <h2>Invalid UPI ID</h2>

        <p>
          Please enter your UPI ID as:
          <br />
          <strong>{expectedUpi}</strong>
        </p>

        <div className="delete-actions">

          <button
            className="cancel-delete-btn"
            onClick={() =>
              setShowInvalidUpiModal(false)
            }
          >
            OK
          </button>

        </div>

      </div>

    </div>
  );
}

export default InvalidUpiModal;