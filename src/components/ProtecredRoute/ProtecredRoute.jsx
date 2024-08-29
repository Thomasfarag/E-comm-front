import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check if the user has a token in localStorage
  if (!localStorage.getItem("userToken")) {
    // If no token is found, redirect to the login page
    return <Navigate to="/login" />;
  }

  // If a token is found, render the children components
  return children;
}
