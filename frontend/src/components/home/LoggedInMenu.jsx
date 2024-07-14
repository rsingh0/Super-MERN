import React from "react";
import { NavLink } from "react-router-dom";

const LoggedOutMenu = ({ user, handleLogout }) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-4 text-cyan-400">Welcome {user.username}</h1>
        <button className="p-2 bg-sky-300 m-8" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="tab-center">
      <nav>
        <ul>
          <li>
            <NavLink to="home" activeClassName="active">
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="authors" activeClassName="active">
              Authors
            </NavLink>
          </li>
        </ul>
      </nav>
      </div>
    </div>
  );
};

export default LoggedOutMenu;
