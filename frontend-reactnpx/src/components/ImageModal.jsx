import React from "react";

function ImageModal({
  selectedImage,
  setSelectedImage,
}) {

  if (!selectedImage) return null;

  return (

    <div
      className="modal"
      onClick={() => setSelectedImage(null)}
    >

      <div
        className="image-popup"
        onClick={(e) => e.stopPropagation()}
      >

        {/* IMAGE */}
        <img
          src={selectedImage.image}
          alt=""
          className="full-image"
        />

        {/* TITLE */}
        <h2>{selectedImage.title}</h2>

        {/* ARTIST */}
        <p>
          🎨 {selectedImage.artist_name || "Unknown Artist"}
        </p>

        {/* DESCRIPTION */}
        <p>
          {selectedImage.description}
        </p>

        {/* PRICE */}
        <h3>
          ₹{selectedImage.price}
        </h3>

      </div>

    </div>

  );
}

export default ImageModal;