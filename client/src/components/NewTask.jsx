import React from "react";
import { Form } from "react-router-dom";
import InputElement from "./InputElement";

const NewTask = () => {
  return (
    <Form className="bg-purple p-ten">
      <InputElement type="text" label="Enter new Title" name="title" required />
      <InputElement
        textarea
        label="Enter new Description"
        name="description"
        required
      />
      <button>submit</button>
    </Form>
  );
};

export default NewTask;
