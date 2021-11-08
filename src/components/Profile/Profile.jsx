import React from "react";
import "./profile.css";

const Profile = ({ onSubmit, userDetails }) => {
  return (
    <div className="card">
      {userDetails ? (
        <form onSubmit={onSubmit}>
          <h1>Profile Card</h1>
          <label className="custom-file-upload">
            <div className="img-wrap">
              <img for="photo-upload" src={userDetails.imagePreviewUrl} />
            </div>
          </label>
          <div className="name">{userDetails.name}</div>
          <div className="details">{userDetails.religion}</div>
          <div className="details">{userDetails.dob}</div>
          <div className="details">{userDetails.height} ft</div>

          <button type="submit" className="edit">
            Edit Profile{" "}
          </button>
        </form>
      ) : null}
    </div>
  );
};

export default Profile;
