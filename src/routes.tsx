import { createBrowserRouter, Navigate } from "react-router-dom";
import Homepage from "./pages/homepage";
import SingleMovie from "./pages/SingleMovie/index.tsx";
import LoginForm from "./pages/auth/Forms/LoginForm/index.tsx";
import SignUpForm from "./pages/auth/Forms/SignUpForm/index.tsx";
import PrivateRoutes from "./utils/PrivateRoutes.tsx";
import PublicRoutes from "./utils/PublicRoutes.tsx";

const router = createBrowserRouter([
  {
    element: <PublicRoutes />,
    path: '/',
    children: [
      {
        index: true,
        element: <Navigate to='/login' replace/>,
      },
      {
        path: "/login",
        element: <LoginForm />,
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
      },
    ],
  },
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: "/homepage",
        element: <Homepage />,
      },
      {
        path: "/movie/:movieID",
        element: <SingleMovie />,
      },
    ],
  },
]);

export default router;
