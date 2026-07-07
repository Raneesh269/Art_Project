import React from "react";

function EditArtworkModal({
  editingArt,
  setEditingArt,

  editTitle,
  setEditTitle,

  editDescription,
  setEditDescription,

  editArtist,
  setEditArtist,

  editPrice,
  setEditPrice,

  artworks,
  setArtworks,

  handleEditSave,
}) {

  if (!editingArt) return null;

  return (

    <div className="modal">

      <div className="upload-box">

        {/* CLOSE */}
        <button
          className="close-btn"
          onClick={() => setEditingArt(null)}
        >
          ❌
        </button>

        <h2>Edit Artwork</h2>

        {/* TITLE */}
        <input
          value={editTitle}
          onChange={(e) =>
            setEditTitle(e.target.value)
          }
          placeholder="Title"
        />

        {/* DESCRIPTION */}
        <input
          value={editDescription}
          onChange={(e) =>
            setEditDescription(e.target.value)
          }
          placeholder="Description"
        />

        {/* ARTIST */}
        <input
          value={editArtist}
          onChange={(e) =>
            setEditArtist(e.target.value)
          }
          placeholder="Artist Name"
        />

        {/* PRICE */}
        <input
          type="number"
          value={editPrice}
          onChange={(e) =>
            setEditPrice(e.target.value)
          }
          placeholder="Price"
        />

        {/* SAVE */}
        <button
          onClick={handleEditSave}
        >
          Save
        </button>
      </div>

    </div>

  );
}

export default EditArtworkModal;