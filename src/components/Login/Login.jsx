import React, { useEffect, useState } from "react";
import "./login.css";
import loginCred from "../../sample-data/login";
import { useParams, useNavigate } from "react-router-dom";
import { login } from "../../utils/isLogin";

const Login = ({ setNotifMessage, setNotifType, setIsLoggedIn }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // if on mounting the user details are there in local storage then we will update the state & navigate to /profile page
    let data = JSON.parse(localStorage.getItem("user"));
    if (data != null) {
      setUser(data);
      navigate("/profile");
    }
  });
  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username.length === 0) {
      // if username is empty
      setNotifType("alert");
      setNotifMessage("Please enter a valid username !!");
    } else if (user.password.length === 0) {
      // if password is empty
      setNotifType("alert");
      setNotifMessage("Please enter a valid password !!");
    } else {
      const findUser = loginCred.find(
        (logUser) => logUser.username === user.username
      );

      if (findUser) {
        // if we find the user, then we will check whether the entered password is same as the required password
        if (findUser.password === user.password) {
          // if yes then we will log in the user & redirect it to /profile page & notify that the user is successfully logged in, also we will add the user data to localStorage
          setNotifType("success");
          login(user);
          setIsLoggedIn(true);
          setNotifMessage("Login successfull !!");
          navigate("/profile");
        } else {
          // if no then we will alert the user about the wrong password;
          setNotifType("alert");
          setNotifMessage("Wrong Password !!");
        }
      } else {
        // if the user is not found, we will alert that the user does not exist
        setNotifType("alert");
        setNotifMessage("Username does not exist !!");
      }
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <div className="field">
          <label className="input-label"> Username </label>
          <input
            className="input-elem"
            type="text"
            name="username"
            onChange={handleChange}
          />
        </div>
        <div className="field">
          <label className="input-label"> Password </label>
          <input
            className="input-elem"
            type="password"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
