import React from "react";

function ArtworkCard({
  art,
  addToCart,
  loggedInUser,
  role,
  setSelectedImage,
  showAddToCart,
}) {

  return (
    <div className="card">

      <img
        src={
          art.image?.startsWith("http")
            ? art.image
            : `http://127.0.0.1:8000${art.image}`
        }
        alt=""
        onClick={() => setSelectedImage(art)}
        style={{ cursor: "pointer" }}
      />

      <div className="overlay">

       <h3>{art.title}</h3>

       <p>Artist: {art.artist_name}</p>

       <p>{art.description}</p>

       <p>₹{art.price}</p>

      
        {art.artist_username !== loggedInUser &&
          role !== "seller" && (
            <button
              className="edit-btn"
              onClick={() => addToCart(art)}
            >
              Add To Cart
            </button>
        )}

      </div>

    </div>
  );
}

export default ArtworkCard;