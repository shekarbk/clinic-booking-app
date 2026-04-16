import React, { useState, useEffect, useRef } from "react";

function AdminLogin({ isAdmin, setIsAdmin }) {
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  // ✅ FIX: place useEffect here
  useEffect(() => {
    if (!isAdmin) {
      setPassword(""); // clear password on logout
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    }
  }, [isAdmin]);

  const handleLogin = () => {
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAdmin(true);
      setPassword(""); // optional: clear after login also
    } else {
      alert("Incorrect password");
    }
  };

  if (isAdmin) return null;

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#f4f6f8"
    }}>
      <div style={{
        width: 320,
        padding: 25,
        borderRadius: 10,
        backgroundColor: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center"
      }}>
        <h2>🏥 Clinic Admin</h2>
        <h2 style={{ marginBottom: 10 }}>🔐 Admin Login</h2>
        <p style={{ fontSize: 12, color: "#666", marginBottom: 20 }}>
          Clinic Dashboard Access
        </p>

        <input
          ref={inputRef}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
          style={{
            width: "100%",
            padding: 10,
            marginBottom: 15,
            borderRadius: 6,
            border: "1px solid #ccc"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: 10,
            borderRadius: 6,
            border: "none",
            backgroundColor: "#1976d2",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer"
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default AdminLogin;