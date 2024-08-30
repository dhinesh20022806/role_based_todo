import { useEffect, useState } from "react";
import ListUsers from "./ListUsers";
import axios from "axios";
import { json } from "react-router-dom";

// const userData = [
//   { username: "dhinesh", role: "admin" },
//   { username: "balaji", role: "manager" },
// ];

const ManageUsers = () => {
  const [userData, setUserData] = useState(null);
  const [managerData, setManagerData] = useState([]);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt_token"));
    console.log(token);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/",
          config
        );

        console.log(response);

        if (response.status !== 200) {
          throw json({ message: "internal error" }, { status: 500 });
        }

        return setUserData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUser();

    const fetchManager = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/users/managers",
          config
        );

        console.log(response);

        if (response.status !== 200) {
          throw json({ message: "internal error" }, { status: 500 });
        }

        return setManagerData(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchManager();
  }, []);
  return (
    <>
      <h1>All User</h1>
      <div className="grid-list-userList overflow-scroll marign-bottom">
        <ul>
          {userData &&
            [...userData, ...managerData].map((user) => {
              return <ListUsers key={user.username} data={user} />;
            })}
        </ul>
      </div>
    </>
  );
};

export default ManageUsers;
