import React from "react";
import { Form, json, Link, redirect } from "react-router-dom";
import InputElement from "../components/InputElement";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const register = () => {
  return (
    <div className="bg-purple  flex height-full justify-content-center align-items-center ">
      <Form method="post">
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

export const action = async ({ request }) => {
  const data = await request.formData();

  const user_data = {
    username: data.get("username"),
    password: data.get("password"),
    email: data.get("email"),
  };

  const response = await axios.post(
    "http://localhost:8080/users/register",
    user_data
  );
  console.log(response);
  if (response.status !== 200) {
    throw json({ message: "Internal error" }, { status: 500 });
  }

  const token = response.data;

  console.log(token);

  localStorage.setItem("jwt_token", JSON.stringify(token));

  const decoded = jwtDecode(token);
  console.log(decoded);

  return redirect(`/${decoded.role}`);
};
