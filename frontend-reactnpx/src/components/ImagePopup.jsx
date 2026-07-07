import React from "react";

function ImagePopup({
  selectedImage,
  setSelectedImage,
}) {

  return (
    <div
      className="modal"
      onClick={() => setSelectedImage(null)}
    >

      <div className="image-popup">

        <img
          src={selectedImage.image}
          alt=""
          className="full-image"
        />

        <h2>{selectedImage.title}</h2>

        <p>
          🎨 {selectedImage.artist}
        </p>

        <p>{selectedImage.description}</p>

        <h3>₹{selectedImage.price}</h3>

      </div>

    </div>
  );
}

export default ImagePopup;