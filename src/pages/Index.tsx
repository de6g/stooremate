
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // Redirect to the dashboard page instead of login
  return <Navigate to="/dashboard" replace />;
};

export default Index;
