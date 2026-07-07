import React from "react";

function UploadModal({
  showUpload,
  setShowUpload,

  title,
  setTitle,

  artist,
  setArtist,

  description,
  setDescription,

  price,
  setPrice,

  setImage,

  handleSubmit,
}) {

  if (!showUpload) return null;

  return (

    <div className="modal">

      <div className="upload-box">

        {/* CLOSE */}
        <button
          className="close-btn"
          onClick={() => setShowUpload(false)}
        >
          ❌
        </button>

        {/* TITLE */}
        <h2>Upload Artwork</h2>

        {/* FORM */}
        <form
          className="upload-form"
          onSubmit={handleSubmit}
        >

          {/* TITLE */}
          <input
            placeholder="Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            required
          />

          {/* ARTIST */}
          <input
            placeholder="Artist Name"
            value={artist}
            onChange={(e) =>
              setArtist(e.target.value)
            }
            required
          />

          {/* DESCRIPTION */}
          <input
            placeholder="Description"
            value={description}
            onChange={(e) =>
              setDescription(e.target.value)
            }
            required
          />

          {/* PRICE */}
          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value)
            }
            required
          />

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) =>
              setImage(e.target.files[0])
            }
            required
          />

          {/* BUTTON */}
          <button
            type="submit"
            className="upload-btn"
          >
            Upload
          </button>

        </form>

      </div>

    </div>

  );
}

export default UploadModal;