import React from "react";

function ProfilePopup({
  artworks,
  loggedInUser,
}) {

  const userArts =
    artworks.filter(
      (art) =>
        art.artist_username?.toLowerCase() ===
        loggedInUser?.toLowerCase()
    );

  return (
    <div className="profile-popup">

      <h3>
        {loggedInUser}
      </h3>

      <p>
        Total Uploads:
        {userArts.length}
      </p>

      <div className="profile-artworks">

        {userArts.map((art) => (

          <div
            className="profile-art-item"
            key={art.id}
          >

            <img
              src={
                art.image?.startsWith(
                  "http"
                )
                  ? art.image
                  : `http://127.0.0.1:8000${art.image}`
              }
              alt=""
            />

            <div>

              <p>{art.title}</p>

              <small>
                ₹{art.price}
              </small>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ProfilePopup;