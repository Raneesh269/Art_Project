import React from "react";

function ClearOrdersModal({
  showClearOrdersModal,
  setShowClearOrdersModal,
  clearOrders,
}) {

  if (!showClearOrdersModal)
    return null;

  return (
    <div className="modal">

      <div className="delete-modal">

        <h2>
          Clear All Orders?
        </h2>

        <p>
          This will permanently remove
          all order history.
        </p>

        <div className="delete-actions">

          <button
            className="cancel-delete-btn"
            onClick={() =>
              setShowClearOrdersModal(false)
            }
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={() => {
              clearOrders();
              setShowClearOrdersModal(false);
            }}
          >
            Clear Orders
          </button>

        </div>

      </div>

    </div>
  );
}

export default ClearOrdersModal;