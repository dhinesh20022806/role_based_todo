import React from "react";
import { Link } from "react-router-dom";

const SingleTask = ({ description }) => {
  return (
    <section>
      <p>{description}</p>
    </section>
  );
};

export default SingleTask;
