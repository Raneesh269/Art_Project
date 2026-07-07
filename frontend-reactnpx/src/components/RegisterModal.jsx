import React from "react";

function RegisterModal({
  showRegister,
  setShowRegister,
  setShowLogin,

  username,
  setUsername,

  password,
  setPassword,

  phoneNumber,
  setPhoneNumber,

  shopName,
  setShopName,

  role,
  setRole,

  handleRegister,
}) {

  if (!showRegister) return null;

  return (

    <div className="modal">

      <div className="upload-box">

        {/* HEADER */}
        <div className="cart-header">

          <h2>Register</h2>

          <button
            onClick={() => setShowRegister(false)}
          >
            ❌
          </button>

        </div>

        {/* FORM */}
        <form

          className="upload-form"
          onSubmit={handleRegister}
        >

          {/* USERNAME */}
          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
            required
          />

          {/* PASSWORD */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          {/* PHONE */}
          <input
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) =>
              setPhoneNumber(e.target.value)
            }
            required
          />

          {/* SHOP NAME */}
          {role === "seller" && (
            <input
              placeholder="Shop Name"
              value={shopName}
              onChange={(e) =>
                setShopName(e.target.value)
              }
              required
            />
          )}

          {/* ROLE */}
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          > 

            <option value="" disabled>
              Select Role
            </option>
            
            <option value="user">
              User
            </option>

            <option value="seller">
              Seller
            </option>
          </select>

          {/* BUTTON */}
          <button className="upload-btn">
            Register
          </button>

        </form>

        {/* SWITCH */}
        <p
          className="switch-text"
          onClick={() => {

            setShowRegister(false);
            setShowLogin(true);

          }}
        >
          Already have account
        </p>

      </div>

    </div>

  );
}

export default RegisterModal;