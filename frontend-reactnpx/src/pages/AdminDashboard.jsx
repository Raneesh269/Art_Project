import React from "react";

function AdminDashboard({
  allUsers = [],
  allArtworks = [],
  allOrders = [],
  setDeleteArtId,
  setShowDeleteModal,
})
  {



  return (

    <div className="modal">

      <div className="admin-dashboard-box">

        <div className="admin-fullscreen">

          {/* TOPBAR */}
          <div className="admin-topbar">

            <button
              className="close-btn"
              onClick={() => window.history.back()}
            >
              ❌
            </button>

            <h1>Admin Dashboard</h1>

          </div>

          {/* STATS */}
          <div className="admin-stats">

            <div className="admin-card">
              <h2>Total Users</h2>
              <p>{allUsers.length}</p>
            </div>

            <div className="admin-card">
              <h2>Total Sellers</h2>

              <p>
                {
                  allUsers.filter(
                    (user) => user.role === "seller"
                  ).length
                }
              </p>
            </div>

            <div className="admin-card">
              <h2>Total Artworks</h2>
              <p>{allArtworks.length}</p>
            </div>

            <div className="admin-card">
              <h2>Total Orders</h2>
              <p>{allOrders.length}</p>
            </div>

          </div>

          {/* SELLERS */}
          <div className="admin-section">

            <h2>👨‍🎨 Sellers Overview</h2>

            <div className="seller-grid">

              {allUsers
                .filter(
                  (user) => user.role === "seller"
                )
                .map((seller) => {

                  const sellerArtworks =
                    allArtworks.filter(
                      (art) =>
                        art.artist_username ===
                        seller.username
                    );

                  const sellerOrders =
                    allOrders.filter((order) =>
                      sellerArtworks.some(
                        (art) =>
                          art.title === order.artwork
                      )
                    );

                  const totalEarnings =
                    sellerOrders.reduce(
                      (sum, order) =>
                        sum + Number(order.price),
                      0
                    );

                  return (

                    <div
                      key={seller.id}
                      className="premium-seller-card"
                    >

                      {/* HEADER */}
                      <div className="seller-header">

                        <div className="seller-avatar">
                          {
                            seller.username
                              .charAt(0)
                              .toUpperCase()
                          }
                        </div>

                        <div>

                          <h3>
                            {seller.username}
                          </h3>

                          <p>
                            {
                              seller.shop_name ||
                              "No Shop Name"
                            }
                          </p>

                        </div>

                      </div>

                      {/* INFO */}
                      <div className="seller-info">

                        <div>
                          <span>📞 Phone</span>
                          <h4>
                            {seller.phone_number}
                          </h4>
                        </div>

                        <div>
                          <span>🎨 Uploads</span>
                          <h4>
                            {
                              sellerArtworks.length
                            }
                          </h4>
                        </div>

                        <div>
                          <span>🧾 Orders</span>
                          <h4>
                            {
                              sellerOrders.length
                            }
                          </h4>
                        </div>

                        <div>
                          <span>💰 Earnings</span>
                          <h4>
                            ₹{totalEarnings}
                          </h4>
                        </div>

                      </div>

                      {/* ARTWORK LIST */}
                      <div className="artwork-list">

                        <h4>
                          Uploaded Artworks
                        </h4>

                        {sellerArtworks.map((art) => (

                          <p key={art.id}>
                            • {art.title}
                          </p>

                        ))}

                      </div>

                    </div>

                  );
                })}

            </div>

          </div>

          {/* ALL ARTWORKS */}
          <div className="admin-section">

            <h2>🎨 All Artworks</h2>

            <div className="admin-artworks">

              {allArtworks.map((art) => (

                <div
                  key={art.id}
                  className="admin-art-card"
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
                  <div className="admin-art-info">

                    <h3>{art.title}</h3>

                    <p>
                      Artist: {art.artist_name}
                    </p>

                    <p>
                      Seller: {art.artist_username}
                    </p>

                    <p>
                      ₹{art.price}
                    </p>

                  </div>

                  {/* DELETE */}
                  <button
                    className="delete-art-btn"
                    onClick={() => {

                      setDeleteArtId(art.id);

                      setShowDeleteModal(true);

                    }}
                  >
                    🗑 Delete
                  </button>

                </div>

              ))}

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default AdminDashboard;