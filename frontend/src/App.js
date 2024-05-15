import { useRoutes } from "react-router-dom";
import routes from "./routes.js";
import AuthContext from "./Components/context/authContext.jsx";
import "./App.css";
import { useCallback, useEffect, useState } from "react";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [userInfos, setUserInfos] = useState(null);

  const login = useCallback((userInfos, token) => {
    setToken(token);
    localStorage.setItem("User-Token", JSON.stringify({ token }));
  }, []);

  const logout = () => {
    setToken(null);
    setUserInfos({});
    localStorage.removeItem("User-Token");
  };

  useEffect(() => {
    const localStorageData = JSON.parse(localStorage.getItem("User-Token"));
    if (localStorageData) {
      fetch(`http://localhost:4000/v1/auth/me`, {
        headers: {
          Authorization: `Bearer ${localStorageData.token}`,
        },
      })
        .then((res) => res.json())
        .then((userData) => {
          setIsLoggedIn(true);
          // setToken(localStorageData.token);
          setUserInfos(userData);
          console.log(userData);
        });
    }
  }, [login]);

  const router = useRoutes(routes);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        token,
        userInfos,
        login,
        logout,
      }}
    >
      {router}
    </AuthContext.Provider>
  );
}

export default App;
