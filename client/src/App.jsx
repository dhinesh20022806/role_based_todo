import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Admin, Error, Login, Manager, Register, Users } from "./pages";
import { action as LoginAction } from "./pages/Login";
import UserRootLayout from "./pages/UserRootLayout";
import NonUserRootLayout from "./pages/NonUserRootLayout";
import AssignTask from "./components/AssignTask";
import Profile from "./components/Profile";
import ManageUsers from "./components/ManageUsers";
import { loader as TaskLoader, action as createTask } from "./pages/Users";
import { loader as ManagerTaskLoader } from "./pages/Manager";
import {
  loader as AdminTaskLoader,
  action as AdminCreateTask,
} from "./pages/Admin";

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
    path: "/user",
    element: <UserRootLayout />,
    children: [
      {
        index: true,
        element: <Users />,
        loader: TaskLoader,
        action: createTask,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },

  {
    path: "/manager",
    element: <NonUserRootLayout />,
    children: [
      {
        index: true,
        element: <Manager />,
        loader: ManagerTaskLoader,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "assign-task",
        element: <AssignTask />,
      },
    ],
  },
  {
    path: "/admin",
    element: <NonUserRootLayout />,
    children: [
      {
        index: true,
        element: <Admin />,
        loader: AdminTaskLoader,
        action: AdminCreateTask,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "assign-task",
        element: <AssignTask />,
      },
      {
        path: "manage-users",
        element: <ManageUsers />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
