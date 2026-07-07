import React from "react";

function DeleteModal({
  showDeleteModal,
  setShowDeleteModal,

  deleteArtId,
  setDeleteArtId,

  token,

  setArtworks,
  setAllArtworks,

  handleDelete,
}) {

  if (!showDeleteModal) return null;

  return (

    <div className="modal">

      <div className="delete-modal">

        {/* TITLE */}
        <h2>Are You Sure?</h2>

        <p>
          This artwork will be permanently deleted and cannot be recovered.
        </p>

        {/* BUTTONS */}
        <div className="delete-actions">

          {/* CANCEL */}
          <button
            className="cancel-delete-btn"
            onClick={() => {

              setShowDeleteModal(false);

            }}
          >
            No, Keep It
          </button>

          {/* DELETE */}
         <button
            className="delete-btn"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>

        </div>

      </div>

    </div>

  );
}

export default DeleteModal;