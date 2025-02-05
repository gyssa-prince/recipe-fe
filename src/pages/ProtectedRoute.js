// ProtectedRoute.js
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("auth"); // Check if the user is logged in

  // If the user is not authenticated, redirect to the sign-in page
  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  // If the user is authenticated, render the protected component
  return <Outlet />;
};

export default ProtectedRoute;