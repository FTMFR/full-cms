import React, { useEffect, useState } from "react";
import "./index.css";
import DataTable from "../DataTable/DataTable";
import PAAdmin from "../../../Components/AdminPanel/PAAdmin/PAAdmin";

const Index = () => {
  const [adminPanel, setAdminPanel] = useState([]);
  const [lastRegisteredUsers, setLastRegisteredUsers] = useState([]);
  const [infos, setInfos] = useState([]);
  const localStorageToken = JSON.parse(localStorage.getItem("User-Token"));

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/p-admin`, {
      headers: {
        Authorization: `Bearer ${localStorageToken.token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAdminPanel(result);
        setLastRegisteredUsers(result.lastUsers);
        setInfos(result.infos);
      });
  }, []);

  return (
    <>
      <div class="container-fluid" id="home-content">
        <div class="container">
          <div class="home-content-title">
            <span class="welcome">
              خوش آمدید,<span class="name">{adminPanel.adminName}</span>
            </span>
          </div>
          <div class="home-content-boxes">
            <div class="row">
              {infos.map((item) => (
                <PAAdmin {...item} />
              ))}
            </div>
          </div>

          <div class="home-content-latset-users">
            <DataTable title="افراد اخیرا ثبت نام شده">
              <table class="table">
                <thead>
                  <tr>
                    <th>شناسه</th>
                    <th>نام و نام خانوادگی</th>
                    <th>ایمیل</th>
                  </tr>
                </thead>
                <tbody>
                  {lastRegisteredUsers.map((user, index) => (
                    <tr>
                      <td>{index + 1}</td>
                      <td>{user.name}</td>
                      {/* <td>09123443243</td> */}
                      <td>{user.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </DataTable>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;
