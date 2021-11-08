import React, { useEffect, useState } from "react";
import "./profile.css";
import Profile from "./Profile";

const Edit = ({ onSubmit, children }) => (
  <div className="card">
    <form onSubmit={onSubmit}>
      <h1>Profile Card</h1>
      {children}
      <button type="submit" className="save">
        Save{" "}
      </button>
    </form>
  </div>
);

const Details = ({ setNotifMessage, setNotifType }) => {
  const [userDetails, setUserDetails] = useState({
    file: "",
    imagePreviewUrl: "",
    name: "",
    dob: "",
    religion: "",
    height: "",
  });
  const [editMode, setEditMode] = useState(true);

  useEffect(() => {
    // if while mounting the data exist in the local storage then it will set the values of userDetails
    let data = JSON.parse(localStorage.getItem("userDetails"));
    if (data != null) setUserDetails(data);
  }, []);

  const onChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };
  const photoUpload = (e) => {
    e.preventDefault();
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      setUserDetails({
        ...userDetails,
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    setNotifMessage("Profile Picture Successfully Uploaded !!");
    setNotifType("success");
    reader.readAsDataURL(file);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("userDetails", JSON.stringify(userDetails));
    if (editMode === true) {
      setNotifMessage("User Details Successfully Updated !!");
      setNotifType("success");
    } else {
      setNotifMessage("Edit mode enabled !!");
      setNotifType("warning");
    }

    setEditMode(!editMode);
  };
  return (
    <div className="main-cont">
      {editMode ? (
        <Edit onSubmit={handleSubmit}>
          <div className="profile-img">
            <label
              className="custom-file-upload input-label"
              htmlFor="photo-upload"
            >
              <div className="img-wrap img-upload">
                <img
                  id="image"
                  htmlFor="photo-upload"
                  src={userDetails.imagePreviewUrl}
                />
              </div>
              <input id="photo-upload" type="file" onChange={photoUpload} />
            </label>
          </div>
          <div className="input-fields-cont">
            <div className="field">
              <label className="input-label" htmlFor="name">
                {" "}
                Name:{" "}
              </label>
              <input
                name="name"
                type="text"
                onChange={onChange}
                maxLength="25"
                className="input-elem"
                value={userDetails.name}
                placeholder="Alexa"
                required
              />
            </div>
            <div className="field">
              <label className="input-label" htmlFor="dob">
                {" "}
                DOB:{" "}
              </label>
              <input
                name="dob"
                type="date"
                className="input-elem"
                onChange={onChange}
                value={userDetails.dob}
                required
              />
            </div>
            <div className="field">
              <label className="input-label" htmlFor="religion">
                {" "}
                Religion:{" "}
              </label>
              <input
                className="input-elem"
                name="religion"
                type="text"
                onChange={onChange}
                value={userDetails.religion}
                required
              />
            </div>
            <div className="field">
              <label className="input-label" htmlFor="height">
                {" "}
                Height:{" "}
              </label>
              <input
                className="input-elem"
                name="height"
                type="number"
                onChange={onChange}
                value={userDetails.height}
                required
              />
            </div>
          </div>
        </Edit>
      ) : (
        <Profile onSubmit={handleSubmit} userDetails={userDetails} />
      )}
    </div>
  );
};

export default Details;
