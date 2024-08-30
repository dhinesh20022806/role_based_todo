import SideBar from "../components/SideBar";
import ProfileButton from "../components/ProfileButton";
import NewTask from "../components/NewTask";
import ListTasks from "../components/ListTasks";
import axios from "axios";
import { json, useLoaderData } from "react-router-dom";
const admin = () => {
  const datas = useLoaderData();
  return (
    <section>
      <div className="grid-new-task">
        <NewTask />
      </div>
      <div className="grid-list-task">
        <ListTasks datas={datas} />
      </div>
    </section>
  );
};

export default admin;

export const loader = async () => {
  const token = JSON.parse(localStorage.getItem("jwt_token"));

  let config = {
    headers: {
      authorization: `Bearere ${token}`,
    },
  };

  try {
    const response = await axios.get(`http://localhost:8080/tasks`, config);

    console.log(response);

    if (response.status !== 200) {
      throw json({ message: "internal error" }, { status: 500 });
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
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
