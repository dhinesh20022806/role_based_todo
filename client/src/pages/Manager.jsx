import React from "react";
import SideBar from "../components/SideBar";
import ProfileButton from "../components/ProfileButton";
import NewTask from "../components/NewTask";
import ListTasks from "../components/ListTasks";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";

const manager = () => {
  const data = useLoaderData();
  console.log(data);
  return (
    <section>
      <div className="grid-new-task">
        <NewTask />
      </div>
      <div className="grid-list-task">
        <ListTasks data={data} />
      </div>
    </section>
  );
};

export default manager;

export const loader = async () => {
  const token = JSON.parse(localStorage.getItem("jwt_token"));

  let config = {
    headers: {
      authorization: `Bearere ${token}`,
    },
  };

  try {
    const response = await axios.get(`http://localhost:8080/tasks`, config);

    if (response.status !== 200) {
      throw json({ message: "internal error" }, { status: 500 });
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
