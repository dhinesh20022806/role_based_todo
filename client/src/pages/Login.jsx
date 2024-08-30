import React from "react";
import classes from "./Login.module.css";
import LoginForm from "../components/LoginForm";
import axios from "axios";
import { json, redirect } from "react-router-dom";

import { jwtDecode } from "jwt-decode";

console.log(classes);

const login = () => {
  return (
    <div className={classes.cla}>
      <LoginForm method="post" />
    </div>
  );
};

export default login;

export async function action({ request, params }) {
  const data = await request.formData();

  const userData = {
    username: data.get("username"),
    password: data.get("password"),
  };

  console.log("fired");

  try {
    const response = await axios.post(
      "http://localhost:8080/users/login",
      userData
    );

    // Check for a successful response
    // if (response.status !== 200) {
    //   throw new Error("internal error");
    // }

    const token = response.data;
    console.log(token);
    localStorage.setItem("jwt_token", JSON.stringify(token));
    const decode = jwtDecode(token);
    console.log(decode);

    if (
      decode.role === "user" ||
      decode.role === "admin" ||
      decode.role === "manager"
    ) {
      return redirect(`/${decode.role}`);
    }

    return redirect("/");
  } catch (error) {
    console.log(error);
    throw json({ message: "internal error" }, { status: 500 });
  }
}
