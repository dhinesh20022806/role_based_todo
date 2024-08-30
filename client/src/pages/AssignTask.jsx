import { useEffect, useState } from "react";
import NewTask from "../components/NewTask";
import { json } from "react-router-dom";
import axios from "axios";

const AssignTask = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("jwt_token"));

    let config = {
      headers: {
        authorization: `Bearere ${token}`,
      },
    };
    const fetchAllUser = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users", config);
        if (response.status !== 200) {
          throw json({ message: "internal error" }, { status: 500 });
        }
        return setData(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllUser();
  }, []);
  return <>{data && <NewTask assignTask userData={data} />}</>;
};

export default AssignTask;

// loader
