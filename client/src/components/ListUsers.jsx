import axios from "axios";
import React from "react";

const ListUsers = ({ data }) => {
  console.log(data);
  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log(event);
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const task_data = {
      role: formData.role,
      username: data.username,
    };

    const token = JSON.parse(localStorage.getItem("jwt_token"));

    console.log(token);

    let config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    console.log(data.id, "===============");

    try {
      const response = await axios.put(
        `http://localhost:8080/users/admins`,
        task_data,
        config
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = () => {};
  return (
    <li className="flex justify-content-between bg-purple text-white p-ten marign-bottom  align-items-center">
      <form
        method="post"
        onSubmit={handleUpdate}
        className="flex justify-content-between w-full text-white p-ten marign-bottom  align-items-center"
      >
        <span className="flex-one">{data.username}</span>
        <span className="flex-one">
          <select name="role" defaultValue={data.role}>
            <option value={"user"}>user</option>
            <option value={"manager"}>manager</option>
            <option value={"admin"}>admin</option>
          </select>
        </span>

        <button className="btn flex-one">update</button>
        <button onClick={handleDelete} className="flex-one">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            />
          </svg>
        </button>
      </form>
    </li>
  );
};

export default ListUsers;
