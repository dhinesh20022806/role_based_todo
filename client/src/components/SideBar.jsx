import React from "react";
import { Link, NavLink, useParams } from "react-router-dom";

const SideBar = ({ items }) => {
  const params = useParams();
  console.log(params);
  return (
    <nav className="bg-purple w-sidebar ">
      <ul>
        <li>
          <NavLink to="" end>
            home
          </NavLink>
        </li>
        <li>
          <NavLink to="assign-task" end>
            assign task
          </NavLink>
        </li>
        <li>
          <NavLink to="manage-users" end>
            manage users
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default SideBar;
