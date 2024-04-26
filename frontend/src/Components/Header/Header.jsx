import React from "react";
import TopBar from "./TopBar/TopBar";
import NavBar from "./NavBar/NavBar";
import Landing from "../Landing/Landing";

const Header = () => {
  return (
    <div className="header">
      <TopBar />
      <NavBar />
      <Landing />
    </div>
  );
};

export default Header;
