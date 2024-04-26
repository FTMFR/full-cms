import React from "react";
import TopBar from "./TopBar/TopBar";
import NavBar from "./NavBar/NavBar";

const Header = () => {
  return (
    <div className="header">
      <TopBar />

      <NavBar />
    </div>
  );
};

export default Header;
