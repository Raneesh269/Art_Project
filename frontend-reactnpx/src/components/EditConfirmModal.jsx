import React from "react";

function EditConfirmModal({
  showEditConfirmModal,
  setShowEditConfirmModal,
  handleEditSave,
}) {

  if (!showEditConfirmModal)
    return null;

  return (
    <div className="modal">

      <div className="delete-modal">

        <h2>
          Update Artwork?
        </h2>

        <p>
          Save the changes made to this artwork?
        </p>

        <div className="delete-actions">

          <button
            className="cancel-delete-btn"
            onClick={() =>
              setShowEditConfirmModal(false)
            }
          >
            Cancel
          </button>

          <button
            className="delete-btn"
            onClick={() => {

              handleEditSave();

              setShowEditConfirmModal(false);

            }}
          >
            Update
          </button>

        </div>

      </div>

    </div>
  );
}

export default EditConfirmModal;