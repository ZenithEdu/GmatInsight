// AdminProtectedRoute.jsx
import React, { useState, useEffect } from "react";
import AdminKey from "./AdminKey";

export default function AdminProtectedRoute({ children }) {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const token = sessionStorage.getItem("admin_token");
    const expiry = sessionStorage.getItem("admin_expiry");

    if (token && expiry && Date.now() < Number(expiry)) {
      setVerified(true);
    } else {
      sessionStorage.removeItem("admin_token");
      sessionStorage.removeItem("admin_expiry");
      setVerified(false);
    }
  }, []);

  const handleKeySuccess = () => {
    setVerified(true);
  };

  if (!verified) {
    return <AdminKey onSuccess={handleKeySuccess} />;
  }

  return children;
}
