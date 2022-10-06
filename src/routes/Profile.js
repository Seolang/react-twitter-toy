import { authService } from "fBase";
import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom"; // useHistory deprecated and then useNavigate used

const Profile = () => {
  const navigate = useNavigate();
  const onLogOutClick = () => {
    signOut(authService);
    navigate("/");
  };
  return (
    <>
      <button onClick={onLogOutClick}>Log Out</button>
    </>
  );
};

export default Profile;
