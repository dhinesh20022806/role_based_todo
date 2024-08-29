import { useState } from "react";
import { Form } from "react-router-dom";
import InputElement from "./InputElement";

const Profile = () => {
  const [is_edit, setIsEdit] = useState(false);
  const handleEdit = () => {
    setIsEdit((prev) => !prev);
  };
  return (
    <>
      <h1>Profile</h1>
      <Form className="grid-list-userList">
        {is_edit ? (
          <InputElement
            type="text"
            defaultValue="dhinesh"
            name="username"
            label="username"
          />
        ) : (
          <InputElement
            type="text"
            value="dhinesh"
            name="username"
            label="username"
          />
        )}
        {is_edit ? (
          <InputElement
            type="email"
            defaultValue="email"
            name="email"
            label="email"
          />
        ) : (
          <InputElement type="email" value="email" name="email" label="email" />
        )}
        <button type="button" onClick={handleEdit}>
          {is_edit ? "Cancel" : "Update"}
        </button>
        {is_edit && <button type="submit">save</button>}
      </Form>
    </>
  );
};

export default Profile;
