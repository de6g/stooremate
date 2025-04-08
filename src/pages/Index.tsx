
import React from "react";
import { Navigate } from "react-router-dom";

const Index = () => {
  // For now, simply redirect to the login page
  return <Navigate to="/login" replace />;
};

export default Index;
