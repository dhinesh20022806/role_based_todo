import React from "react";
import { Form, Link } from "react-router-dom";
import InputElement from "./InputElement";
import styles from "./LoginForm.module.css";
const LoginForm = () => {
  return (
    <Form method="post" className={styles.loginform}>
      <fieldset>
        <legend className={styles["text-white"]}>Login</legend>
        <InputElement name="username" type="text" label="Enter your username" />
        <InputElement
          name="password"
          type="password"
          label="Enter you password"
        />
        <button type="submit">Submit</button>
      </fieldset>
      <Link to="/register" className={styles.link}>
        Create User
      </Link>
    </Form>
  );
};

export default LoginForm;
