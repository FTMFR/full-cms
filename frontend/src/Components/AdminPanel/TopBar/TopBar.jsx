import React, { useEffect, useState } from "react";
import "./topBar.css";

export default function Topbar() {
  const [admin, setAdmin] = useState({});
  const [showBoxNotif, setShowBoxNotif] = useState(false);
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));

  useEffect(() => {
    fetch(`http://localhost:4000/v1/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setAdmin(result);
      });
  }, []);

  // const setNotifsID = (id) =>{
  // fetch(`http://localhost:4000/v1/notifications/see/${id}`,{
  //   method:'PUT',
  //   headers: {'Authorization': `Bearer ${localStorageToken.token}`}
  // })
  //   console.log(id);
  // }

  return (
    <div className="container-fluid">
      <div className="container">
        <div
          className={`home-header ${
            showBoxNotif && "active-modal-notfication"
          }`}
        >
          <div className="home-right">
            <div className="home-searchbar">
              <input
                type="text"
                className="search-bar"
                placeholder="جستجو..."
              />
            </div>
            <div className="home-notification">
              <button
                type="button"
                onMouseEnter={() => setShowBoxNotif(true)}
                onMouseLeave={() => setShowBoxNotif(false)}
              >
                <i className="far fa-bell"></i>
              </button>
            </div>
            <div className="home-notification-modal">
              <ul className="home-notification-modal-list">
                {admin.notifications ? (
                  admin.notifications.map((notifs) => (
                    <li className="home-notification-modal-item">
                      <span className="home-notification-modal-text">
                        {notifs}
                      </span>
                      {/* <label className="switch">
                        <a href="javascript:void(0)" onClick={()=>setNotifsID(notifs._id)}>دیدم</a>
                      </label> */}
                    </li>
                  ))
                ) : (
                  <div>هیچ نوتیفینیکشنی ندارید</div>
                )}
              </ul>
            </div>
          </div>
          <div className="home-left">
            <div className="home-profile">
              <div className="home-profile-image">
                <a href="/">
                  <img src="/images/profile.jpg" alt="" />
                </a>
              </div>
              <div className="home-profile-name">
                <a href="/">{admin.name}</a>
              </div>
              <div className="home-profile-icon">
                <i className="fas fa-angle-down"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
