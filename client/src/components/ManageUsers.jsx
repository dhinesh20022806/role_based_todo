import React from "react";
import ListUsers from "./ListUsers";

const userData = [
  { username: "dhinesh", role: "admin" },
  { username: "balaji", role: "manager" },
];

const ManageUsers = () => {
  return (
    <>
      <h1>All User</h1>
      <div className="grid-list-userList">
        <ul>
          {userData.map((user) => {
            return <ListUsers key={user.username} data={user} />;
          })}
        </ul>
      </div>
    </>
  );
};

export default ManageUsers;
