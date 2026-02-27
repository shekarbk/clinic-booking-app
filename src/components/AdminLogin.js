import React from "react";

function AdminLogin({ isAdmin, adminLogin }) {
  return (
    <>
      {!isAdmin && (
        <button
          onClick={adminLogin}
          style={{ marginBottom: 20 }}
        >
          🔒 Admin Login
        </button>
      )}
    </>
  );
}

export default AdminLogin;