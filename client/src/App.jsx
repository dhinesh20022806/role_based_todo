import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Admin, Error, Login, Manager, Register, Users } from "./pages";
import { action as LoginAction } from "./pages/Login";
import UserRootLayout from "./pages/UserRootLayout";
import NonUserRootLayout from "./pages/NonUserRootLayout";
import AssignTask from "./components/AssignTask";
import Profile from "./components/Profile";
import ManageUsers from "./components/ManageUsers";

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
