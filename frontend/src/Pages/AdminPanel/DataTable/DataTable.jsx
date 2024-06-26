import React from "react";

const DataTable = ({ children, title }) => {
  return (
    <div className="container">
      <div className="home-content-latset-users">
        <div className="home-content-users-title">
          <span>
            لیست <span className="signup">{title}</span>
          </span>
        </div>
        <div className="home-content-users-table">{children}</div>
      </div>
    </div>
  );
};

export default DataTable;
