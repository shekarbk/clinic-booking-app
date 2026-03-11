import React, { useState } from "react";

function AdminLogin({ isAdmin, setIsAdmin }) {
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (password === process.env.REACT_APP_ADMIN_PASSWORD) {
      setIsAdmin(true);
    } else {
      alert("Incorrect password");
    }
  };

  return (
    <>
      {!isAdmin && (
        <div style={{ marginBottom: 20 }}>
          <input
            type="password"
            placeholder="Enter admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ marginRight: 8 }}
          />
          <button onClick={handleLogin}>
            🔒 Login
          </button>
        </div>
      )}
    </>
  );
}

export default AdminLogin;