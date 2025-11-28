import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

// 👉 change this if you used a different key for the token
const TOKEN_KEY = "authToken";

function RequireAuth() {
  const location = useLocation();
  const token = localStorage.getItem(TOKEN_KEY);

  // no token → send to login, remember where they tried to go
  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // token exists → allow access to protected routes
  return <Outlet />;
}

export default RequireAuth;
