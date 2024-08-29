import React from "react";
import SideBar from "../components/SideBar";
import BodyContent from "../components/BodyContent";
import { Outlet } from "react-router-dom";

const UserRootLayout = () => {
  return (
    <main className="">
      <Outlet />
    </main>
  );
};

export default UserRootLayout;
