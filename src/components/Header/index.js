import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Header() {
  const [nameLogo, setNameLogo] = useState("");
  const [user, setUser] = useState({});

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
        console.log(initialLetters);
      });
  }, []);
  return (
    <div className="header">
      <h1 className="logo">
        <span>S</span>WIFT
      </h1>
      <div className="profile-name-container" onClick={() => navigate("/")}>
        <h1 className="name-logo">{nameLogo}</h1>
        <h1 className="user-name">{user.name}</h1>
      </div>
    </div>
  );
}

export default Header;
