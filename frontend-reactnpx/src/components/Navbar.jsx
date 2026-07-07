import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({
  token,
  role,
  isAdmin,
  cart,
  loggedInUser,
  loggedInRole,

  setShowLogin,
  setShowRegister,
  setShowUpload,
  setShowDashboard,
  setShowAdminDashboard,
  setShowCart,
  setShowProfile,
  handleLogout,
}) {

  const navigate = useNavigate();

  return (
    <div className="navbar">

      {/* LOGO */}
      <h2 className="logo">Artogenix</h2>

      <div className="nav-right">

        {/* NOT LOGGED IN */}
        {!token ? (
          <>

            <button
              className="nav-link"
              onClick={() => setShowLogin(true)}
            >
              Login
            </button>

            <button
              className="nav-link"
              onClick={() => setShowRegister(true)}
            >
              Register
            </button>

          </>
        ) : (
          <>

            {/* ADMIN */}
            {isAdmin && (
              <button
                className="nav-link"
                onClick={() => navigate("/admin-dashboard")}
              >
                Admin
              </button>
            )}

            {/* PROFILE */}
            <div
              className="profile-box"
              onClick={() => setShowProfile(prev => !prev)}
            >

              <div className="profile-name">
                {loggedInUser}

                {loggedInRole === "seller" && (
                  <span> (Seller)</span>
                )}

              </div>

            </div>

            {/* SELLER UPLOAD */}
            {role === "seller" && (
              <button
                className="nav-link"
                onClick={() => setShowUpload(true)}
              >
                Upload
              </button>
            )}

            {/* SELLER DASHBOARD */}
            {role === "seller" && (
              <button
                className="nav-link"
                onClick={() => navigate("/seller-dashboard")}
              >
                Dashboard
              </button>
            )}

            {/* SELLER ORDERS */}
            {role === "seller" && (
              <button
                className="nav-link"
                onClick={() => navigate("/orders")}
              >
                Orders
              </button>
            )}

            {/* LOGOUT */}
            <button
              className="nav-link"
             onClick={handleLogout}
            >
              Logout
            </button>

          </>
        )}

       {/* CART */}
      {loggedInRole !== "seller" && (
        <button
          className="nav-link cart-link"
          onClick={() => setShowCart(true)}
        >
          Cart
          <span className="cart-count">
            {cart.length}
          </span>
        </button>
      )}

      </div>

    </div>
  );
}

export default Navbar;