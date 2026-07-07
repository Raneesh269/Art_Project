import React, { useState } from "react";

function Register({ setShowRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();

    fetch("http://127.0.0.1:8000/api/users/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          alert("Registered successfully ✅");
          setShowRegister(false); // go back to login
        } else {
          alert(data.error || "Registration failed ❌");
        }
      })
      .catch(err => console.error(err));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Register</h2>

      <form onSubmit={handleRegister}>
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

        <button type="submit">Register</button>
      </form>

      <p>
        Already have an account?{" "}
        <button onClick={() => setShowRegister(false)}>
          Login
        </button>
      </p>
    </div>
  );
}

export default Register;