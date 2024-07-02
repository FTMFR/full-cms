import React, { useEffect, useState } from "react";
import TopBar from "./TopBar/TopBar";
import NavBar from "./NavBar/NavBar";
import Landing from "../Landing/Landing";

const Header = () => {
  const [header, setHeader] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/v1/infos/index")
      .then((res) => res.json())
      .then((result) => setHeader(result));
  }, []);
  return (
    <div className="header">
      <TopBar infos={header}/>
      <NavBar />
      <Landing infos={header} />
    </div>
  );
};

export default Header;
