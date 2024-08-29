import React from "react";
import PageContent from "../components/PageContent";
import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.log(error);
  console.log(error.status);
  let title = "An error Occurred";
  let message = "Something Went Wrong";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    //   you no need to parse message when using json
    message = error.data.message;
    console.log(error.data.message);
  }
  if (error.status === 404) {
    title = "Not Found";
    message = "Could not found resource or page";
  }
  console.log(message);

  return <PageContent title={title}>{message}</PageContent>;
};

export default ErrorPage;
