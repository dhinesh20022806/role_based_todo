import React from "react";
import ProfileButton from "../components/ProfileButton";
import NewTask from "../components/NewTask";
import ListTasks from "../components/ListTasks";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";

const users = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <section className="grid-users bg-white">
      <div className="grid-profile flex justify-content-end">
        <ProfileButton />
      </div>
      <div className="grid-new-task">
        <NewTask />
      </div>
      <div className="grid-list-task flex justify-content-center">
        <ListTasks datas={data} />
      </div>
    </section>
  );
};

export default users;

export const loader = async () => {
  const token = JSON.parse(localStorage.getItem("jwt_token"));

  console.log(token);

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const response = await axios.get(`http://localhost:8080/tasks`, config);
  console.log(response);
  console.log(response.data);
  if (response.status !== 200) {
    throw json({ message: "internal error" }, { status: 500 });
  }
  return response.data;
};

export const action = async ({ request }) => {
  const token = JSON.parse(localStorage.getItem("jwt_token"));

  const data = await request.formData();

  const newTask = {
    title: data.get("title"),
    description: data.get("description"),
  };

  let config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  const response = await axios.post(
    "http://localhost:8080/tasks",
    newTask,
    config
  );

  console.log(response);

  if (response.status !== 201) {
    throw json({ message: "internal error" }, { status: 500 });
  }
  return null;
};
