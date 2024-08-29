import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Admin, Error, Login, Manager, Register, Users } from "./pages";
import { action as LoginAction } from "./pages/Login";
import UserRootLayout from "./pages/UserRootLayout";
import SingleTask from "./components/SingleTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    action: LoginAction,
    errorElement: <Error />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/unauthorized",
    element: <h1>unauthorized</h1>,
  },
  {
    path: "/users",
    element: <UserRootLayout />,
    children: [
      {
        index: true,
        element: <Users />,
      },
    ],
  },

  {
    path: "/manager",
    element: <Manager />,
    children: [
      {
        path: "tasks",
        element: <h1>manager task</h1>,
        children: [
          {
            path: ":taskId",
            element: <h1>manager user task id</h1>,
          },
        ],
      },
      {
        path: "assign-task",
        element: <h1>assign-task</h1>,
      },
    ],
  },
  {
    path: "/admin",
    element: <Admin />,
    children: [
      {
        path: "tasks",
        element: <h1>tasks</h1>,
        children: [
          {
            path: ":taskId",
            element: <h1>tasks id</h1>,
          },
        ],
      },
      {
        path: "assign-task",
        element: <h1>assign task</h1>,
      },
      {
        path: "manage-user",
        element: <h1>manage user</h1>,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
