import React from "react";

function LoginModal({
  showLogin,
  setShowLogin,
  setShowRegister,

  username,
  setUsername,

  password,
  setPassword,

  handleLogin,
}) {

  if (!showLogin) return null;

  return (

    <div className="modal">

      <div className="upload-box">

        {/* HEADER */}
        <div className="cart-header">

          <h2>Login</h2>

          <button
            onClick={() => setShowLogin(false)}
          >
            ❌
          </button>

        </div>

        {/* FORM */}
       <form
          className="upload-form"
          onSubmit={handleLogin}
        >

          <input
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button className="upload-btn">
            Login
          </button>

        </form>

        {/* SWITCH */}
        <p
          className="switch-text"
          onClick={() => {

            setShowLogin(false);
            setShowRegister(true);

          }}
        >
          Create account
        </p>

      </div>

    </div>

  );
}

export default LoginModal;