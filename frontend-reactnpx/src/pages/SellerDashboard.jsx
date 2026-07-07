import React from "react";
import { useNavigate } from "react-router-dom";

function SellerDashboard({
  artworks,
  loggedInUser,
  orders,
  setShowUpload,
  setEditingArt,
  setEditTitle,
  setEditArtist,
  setEditDescription,
  setEditPrice,
  setDeleteArtId,
  setShowDeleteModal,
}) {
const navigate = useNavigate();

  return (

    <div className="seller-dashboard-page">

        {/* CLOSE */}
        <button
          className="close-btn"
          onClick={() => navigate("/")}
        >
          ❌
        </button>

        <h2>Seller Dashboard</h2>

        {/* ARTWORKS */}
        <h3>Your Artworks</h3>

        <p>
          Total Uploads: {

            artworks.filter(
              (art) =>
                art.artist_username?.toLowerCase() ===
                loggedInUser?.toLowerCase()
            ).length

          }
        </p>

        {artworks.length === 0 ? (

          <p>No uploads yet</p>

        ) : (

          artworks
            .filter(
              (art) =>
                art.artist_username?.toLowerCase() ===
                loggedInUser?.toLowerCase()
            )
            .map((art) => (

              <div
                key={art.id}
                className="dashboard-item"
              >

                {/* IMAGE */}
                <img
                  src={
                    art.image?.startsWith("http")
                      ? art.image
                      : `http://127.0.0.1:8000${art.image}`
                  }
                  alt=""
                />

                {/* INFO */}
                <div style={{ flex: 1 }}>

                  <p>{art.title}</p>

                  <p>₹{art.price}</p>

                </div>

                {/* ACTIONS */}
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                  }}
                >

                  {/* EDIT */}
                  <button
                    className="edit-btn"
                    onClick={() => {

                      setEditingArt(art);

                      setEditTitle(art.title);
                      setEditArtist(art.artist_name);
                      setEditDescription(art.description);
                      setEditPrice(art.price);

                    }}
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    className="edit-btn delete-btn"
                    onClick={() => {

                      setDeleteArtId(art.id);

                      setShowDeleteModal(true);

                    }}
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

        )}

        {/* UPLOAD BUTTON */}
        <button
          className="main-btn"
          onClick={() => {

            navigate("/");

            setShowUpload(true);

          }}
        >
          Upload New Artwork
        </button>

      </div>

    

  );
}

export default SellerDashboard;