import React from "react";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Gallery from "../components/Gallery";

function Home({
  token,
  role,
  isAdmin,
  cart,
  setCart,
  artworks,
  loggedInUser,
  loggedInRole,

  setShowLogin,
  setShowRegister,
  setShowUpload,
  setShowDashboard,
  setShowAdminDashboard,
  setShowCart,
  setShowProfile,

  showLoginRequired,
  setShowLoginRequired,

  selectedImage,
  setSelectedImage,

  addToCart,

  setEditingArt,
  setEditTitle,
  setEditArtist,
  setEditDescription,
  setEditPrice,

  showProfile,
  handleLogout,
})
  {
  return (
    <div>

      {/* NAVBAR */}
      <Navbar
        token={token}
        role={role}
        isAdmin={isAdmin}
        cart={cart}
        handleLogout={handleLogout}
        loggedInUser={loggedInUser}
        loggedInRole={loggedInRole}
        setShowLogin={setShowLogin}
        setShowRegister={setShowRegister}
        setShowUpload={setShowUpload}
        setShowDashboard={setShowDashboard}
        setShowAdminDashboard={setShowAdminDashboard}
        setShowCart={setShowCart}
        setShowProfile={setShowProfile}
      />

      {/* SELLER PROFILE */}
      {showProfile && loggedInRole === "seller" && (
        <div className="profile-popup">

          <h3>{loggedInUser}</h3>

          <p>
            Total Uploads: {
              artworks.filter(
                (art) =>
                  art.artist_username?.toLowerCase() ===
                  loggedInUser?.toLowerCase()
              ).length
            }
          </p>

          <div className="profile-artworks">

            {artworks
              .filter(
                (art) =>
                  art.artist_username?.toLowerCase() ===
                  loggedInUser?.toLowerCase()
              )
              .map((art) => (
                <div key={art.id} className="profile-art-item">

                  <img
                    src={
                      art.image?.startsWith("http")
                        ? art.image
                        : `http://127.0.0.1:8000${art.image}`
                    }
                    alt=""
                  />

                  <div>
                    <p>{art.title}</p>
                    <small>₹{art.price}</small>
                  </div>

                </div>
              ))}

          </div>

        </div>
      )}

      {/* SLIDER */}
      <Slider />

      {/* COLLECTION HEADING */}
      <div className="collection-heading">
        <h2>NEW ART COLLECTIONS</h2>
      </div>

      {/* GALLERY */}
      <Gallery
        artworks={artworks}
        setCart={setCart}
        role={role}
        loggedInUser={loggedInUser}
        addToCart={addToCart}
        setSelectedImage={setSelectedImage}
        setEditingArt={setEditingArt}
        setEditTitle={setEditTitle}
        setEditArtist={setEditArtist}
        setEditDescription={setEditDescription}
        setEditPrice={setEditPrice}
        showLoginRequired={showLoginRequired}
        setShowLoginRequired={setShowLoginRequired}
      />

     

    </div>
  );
}

export default Home;