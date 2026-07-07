import React from "react";
import ArtworkCard from "./ArtworkCard";

function Gallery({
  artworks,
  setCart,
  loggedInUser,
  role,
  setSelectedImage,
  setEditingArt,
  setEditTitle,
  setEditArtist,
  setEditDescription,
  setEditPrice,

  showLoginRequired,
  setShowLoginRequired,
}) {
const addToCart = (art) => {

  if (!loggedInUser) {
    setShowLoginRequired(true);
    return;
  }

  setCart((prev) => {
      const existing = prev.find((item) => item.id === art.id);

      if (existing) {
        return prev.map((item) =>
          item.id === art.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...art, quantity: 1 }];
    });
  };

  return (
    <div className="gallery">
      {artworks
        .filter((art) => {
          if (role === "seller") {
            return (
              art.artist_username?.toLowerCase() ===
              loggedInUser?.toLowerCase()
            );
          }
          return true;
        })
        .map((art) => (
          <ArtworkCard
            key={art.id}
            art={art}
            addToCart={addToCart}
            loggedInUser={loggedInUser}
            role={role}
            showAddToCart={true}
            setSelectedImage={setSelectedImage}
            setEditingArt={setEditingArt}
            setEditTitle={setEditTitle}
            setEditArtist={setEditArtist}
            setEditDescription={setEditDescription}
            setEditPrice={setEditPrice}
          />
        ))}
    </div>
  );
}

export default Gallery;