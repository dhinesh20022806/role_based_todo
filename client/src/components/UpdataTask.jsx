import React from "react";
import { Form } from "react-router-dom";
import InputElement from "./InputElement";

const UpdataTask = () => {
  return (
    <Form>
      <InputElement type="text" name="tilte" label="title" />
      <InputElement textarea name="description" label="description" />
      <select name="status" defaultValue="todo">
        <option value="todo">Todo</option>
        <option value="progress">in progress</option>
        <option value="completed">completed</option>
      </select>
      <button>Update</button>
    </Form>
  );
};

export default UpdataTask;
