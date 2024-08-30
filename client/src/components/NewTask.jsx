import React from "react";
import { Form, json } from "react-router-dom";
import InputElement from "./InputElement";
import axios from "axios";

const NewTask = ({ assignTask, userData }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const task_data = {
      title: formData.title,
      description: formData.description,
      user_username: formData.assigned_user,
    };

    const token = JSON.parse(localStorage.getItem("jwt_token"));

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/tasks/assign/admin",
        task_data,
        config
      );

      if (response.status !== 201) {
        throw json({ message: "internal error" }, { status: 500 });
      }
      event.target.reset();
      return;
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form onSubmit={handleSubmit} method="post" className="bg-purple p-ten">
      <InputElement type="text" label="Enter new Title" name="title" required />
      <InputElement
        textarea
        label="Enter new Description"
        name="description"
        required
      />
      {assignTask && (
        <select name="assigned_user" defaultValue={"select the username"}>
          <option value={"selet the username"}>Select usernaem</option>
          {userData.map((user) => {
            return (
              <option key={user.username} value={user.username}>
                {user.username}
              </option>
            );
          })}
        </select>
      )}

      <button>{assignTask ? "assignTask" : "Task"}</button>
    </form>
  );
};

export default NewTask;
