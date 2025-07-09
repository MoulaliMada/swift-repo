import React from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <p className="not-found-message">
        Oops! The page you're looking for doesn't exist.
      </p>
      <button className="go-home-button" onClick={handleGoHome}>
        Go to Home
      </button>
    </div>
  );
}

export default NotFound;
