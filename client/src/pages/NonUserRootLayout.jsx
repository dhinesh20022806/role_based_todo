import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import ProfileButton from "../components/ProfileButton";

const NonUserRootLayout = () => {
  return (
    <main className="grid-admin">
      <div className="grid-admin-sidebar bg-purple">
        <SideBar />
      </div>
      <div className="grid-admin-profile flex justify-content-end">
        <ProfileButton />
      </div>
      <Outlet />
    </main>
  );
};

export default NonUserRootLayout;
