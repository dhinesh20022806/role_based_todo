import React from "react";
import { Link } from "react-router-dom";

const SideBar = ({ items }) => {
  return (
    <nav className="bg-purple w-sidebar ">
      <ul>
        {items.map((item) => {
          return (
            <li key={item}>
              <Link to="" className="nav-link">
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default SideBar;
