import React, { useState, useEffect } from "react";
import Header from "../Header";
import { FaArrowLeft } from "react-icons/fa"; // ✅ Corrected import
import { useNavigate } from "react-router-dom";
import Spinner from "../Spinner"; // ✅ Spinner component
import "./index.css";

function ProfileScreen() {
  const [user, setUser] = useState({});
  const [nameLogo, setNameLogo] = useState("");
  const [loading, setLoading] = useState(true); // ✅ Loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const userData = data[0];
        setUser(userData);
        const initialLetters = userData.name
          .split(" ")
          .map((word) => word[0])
          .join("");
        setNameLogo(initialLetters);
        setLoading(false); // ✅ Done loading
      });
  }, []);

  if (loading) {
    return <Spinner />; // ✅ Show spinner while loading
  }

  return (
    <div>
      <Header name={user.name} />
      <div className="prifile-screen">
        <div
          className="welcome"
          onClick={() => navigate("/comments-dashboard")}
        >
          <FaArrowLeft className="arrow" />
          <h1>
            Welcome <span>{user.name}</span>
          </h1>
        </div>
        <div className="profile-content">
          <div className="profile-logo-container">
            <h1>{nameLogo}</h1>
            <div className="user-name-email">
              <h2>{user.name}</h2>
              <p>{user.email}</p>
            </div>
          </div>
          <div className="user-details-bg-container">
            <div className="user-details-container">
              <h2>User ID</h2>
              <p>{user.id}</p>
              <h2>Email ID</h2>
              <p>{user.email}</p>
              <h2>Phone</h2>
              <p>{user.phone}</p>
            </div>
            <div className="user-details-container">
              <h2>Address</h2>
              <p>
                {`${user.address?.street} ${user.address?.suite} ${user.address?.city}`}
              </p>
              <h2>Name</h2>
              <p>{user.name}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
