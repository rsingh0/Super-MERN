import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";
import { useNavigate } from "react-router-dom";
import LoggedInMenu from "./LoggedInMenu.jsx";
import LoggedOutMenu from "./LoggedOutMenu.jsx";

const Menu = () => {
  const { user, logout } = useContext(AuthContext);
  const { pathname } = window.location;
  const navigate = useNavigate();

  const path = pathname === "/" ? "login" : pathname.substr(1);

  const handleLogout = (e) => {
    logout();
    navigate("/");
  };

  const handleRegister = (e) => {
    navigate("/register");
  };

  const menuProps = {
    user,
    path,
    handleLogout,
    handleRegister,
  };

  return user ? (
    <LoggedInMenu {...menuProps} />
  ) : (
    <LoggedOutMenu {...menuProps} />
  );
};

export default Menu;
