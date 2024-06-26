import React from "react";
import "./adminPanel.css";
import { Outlet } from "react-router-dom";
import SideBar from "../../Components/AdminPanel/SideBar/SideBar";
import Topbar from "../../Components/AdminPanel/TopBar/TopBar";

const AdminPanel = () => {
  return (
    <>
      <div id="content">
        <SideBar />
        <div id="home" className="col-10">
          <Topbar />

          <div className="container-fluid" id="home-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
