import React from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";

const UserRootLayout = () => {
  return (
    <main className="">
      <Outlet />
    </main>
  );
};

export default UserRootLayout;
