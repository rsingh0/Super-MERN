import React from "react";

const LoggedInMenu = ({path, handleLogout, handleRegister}) => {
  return (
    <div className="flex justify-between items-center">
      <h1 className="text-3xl my-4 text-cyan-400">Book Store</h1>
      {path === "login" ? (
        <button className="p-2 bg-sky-300 m-8" onClick={handleRegister}>
          Register
        </button>
      ) : (
        <button className="p-2 bg-sky-300 m-8" onClick={handleLogout}>
          Login
        </button>
      )}
    </div>
  );
};

export default LoggedInMenu;
