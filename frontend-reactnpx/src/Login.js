import React, { useState } from "react";
import Register from "./Register";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  if (showRegister) {
    return <Register setShowRegister={setShowRegister} />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.access) {
          localStorage.setItem("token", data.access);
          localStorage.setItem("role", data.role);
          setToken(data.access);
          setShowLogin(false);
        } else {
          alert("Login failed ❌");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <button onClick={() => setShowRegister(true)}>
          Register
        </button>
      </p>
    </div>
  );
}

export default Login;