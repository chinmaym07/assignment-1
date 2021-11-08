import React from "react";
import "./App.css";
import { useNavigate, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Notification from "./components/Notification/Notification";
import { useState, useEffect } from "react";
import PrivateRoute from "./utils/PrivateRoute";
import { logout } from "./utils/isLogin";
import Details from "./components/Profile/Details";

const App = (props) => {
  const [notifMessage, setNotifMessage] = useState(""); // Notification Message
  const [notifType, setNotifType] = useState(""); // Type of Notification Message
  const [isLoggedIn, setIsLoggedIn] = useState(false); // isUser Logged in or not
  const navigate = useNavigate();

  // To check whether the user is logged in or not on re-mounting the application
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("user") != null);
  }, []);

  // To remove the notification after 3s
  useEffect(() => {
    setTimeout(() => {
      setNotifMessage("");
    }, 3000);
  }, [notifMessage]);

  // To handle the Close Button on Notification
  const resetNotif = () => {
    setNotifMessage("");
    setNotifType("");
  };

  // TO Logout from the application
  const handleLogout = () => {
    logout();
    setIsLoggedIn(false);
    setNotifMessage("Logged out Successfully");
    setNotifType("success");
    navigate("/");
  };

  return (
    <div className="App">
      <header>
        <h1> Sample Website </h1>
        {/* Log out button is only shown when the user is logged in */}
        {isLoggedIn ? (
          <button type="submit" onClick={handleLogout}>
            {" "}
            Logout
          </button>
        ) : null}
      </header>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <Login
              setNotifMessage={setNotifMessage}
              setNotifType={setNotifType}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          exact
          path="/profile"
          element={
            <PrivateRoute>
              <Details
                setNotifMessage={setNotifMessage}
                setNotifType={setNotifType}
              />
            </PrivateRoute>
          }
        />
      </Routes>
      <Notification
        notifMessage={notifMessage}
        notifType={notifType}
        resetNotif={resetNotif}
      />
    </div>
  );
};

export default App;
