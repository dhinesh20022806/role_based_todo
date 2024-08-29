import React from "react";
import { Form, Link } from "react-router-dom";
import InputElement from "../components/InputElement";

const register = () => {
  return (
    <div className="bg-purple  flex height-full justify-content-center align-items-center ">
      <Form>
        <legend>Register</legend>
        <fieldset>
          <InputElement
            type="text"
            name="username"
            label="create new username"
          />
          <InputElement
            type="password"
            name="password"
            label="Create new password"
          />
          <InputElement
            type="password"
            name="confirm-password"
            label="Confirm password"
          />
          <InputElement type="email" name="email" label="Enter you Email" />
          <button>submit</button>
        </fieldset>
        <Link to="/">Are you exist user ? login</Link>
      </Form>
    </div>
  );
};

export default register;
