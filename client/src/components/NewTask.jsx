import React from "react";
import { Form } from "react-router-dom";
import InputElement from "./InputElement";

const NewTask = ({ assignTask, userData }) => {
  return (
    <Form className="bg-purple p-ten">
      <InputElement type="text" label="Enter new Title" name="title" required />
      <InputElement
        textarea
        label="Enter new Description"
        name="description"
        required
      />
      {assignTask && (
        <select defaultValue={"selet the username"}>
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

      <button>submit</button>
    </Form>
  );
};

export default NewTask;
