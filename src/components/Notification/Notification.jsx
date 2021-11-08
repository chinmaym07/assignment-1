import React from "react";
import "./notification.css";

const Notification = ({ notifMessage, notifType, resetNotif }) => {
  return notifMessage.length > 0 ? (
    <div className={notifType}>
      <button className="close-notif" onClick={resetNotif}>
        X
      </button>
      <p>{notifMessage}</p>
    </div>
  ) : null;
};

export default Notification;
