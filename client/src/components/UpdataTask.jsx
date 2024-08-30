import { useState } from "react";
import { Form } from "react-router-dom";
import InputElement from "./InputElement";
import axios from "axios";

const UpdataTask = ({ data }) => {
  const handleUpdate = async (event) => {
    event.preventDefault();
    console.log(event);
    const fd = new FormData(event.target);
    const formData = Object.fromEntries(fd.entries());

    const task_data = {
      title: formData.title,
      description: formData.description,
      status: formData.status,
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
      // Assuming `data.id` is accessible in your component, you should include it directly in the URL
      const response = await axios.put(
        `http://localhost:8080/tasks/${data.id}`, // Include the ID in the URL
        task_data, // Send the task data as the second parameter
        config // Configuration for headers
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form method="post" onSubmit={handleUpdate}>
      <InputElement
        type="text"
        name="tilte"
        defaultValue={data.title}
        label="title"
      />
      <InputElement
        textarea
        name="description"
        defaultValue={data.description}
        label="description"
      />
      <select name="status" defaultValue={data.status}>
        <option value="todo">Todo</option>
        <option value="inprogress">in progress</option>
        <option value="completed">completed</option>
      </select>
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdataTask;
