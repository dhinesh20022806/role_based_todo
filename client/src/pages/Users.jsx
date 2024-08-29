import React from "react";
import ProfileButton from "../components/ProfileButton";
import NewTask from "../components/NewTask";
import ListTasks from "../components/ListTasks";

const users = () => {
  return (
    <section className="grid-users bg-white">
      <div className="grid-profile flex justify-content-end">
        <ProfileButton />
      </div>
      <div className="grid-new-task">
        <NewTask />
      </div>
      <div className="grid-list-task flex justify-content-center">
        <ListTasks />
      </div>
    </section>
  );
};

export default users;
