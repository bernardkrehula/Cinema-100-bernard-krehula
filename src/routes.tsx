import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import SingleMovie from "./pages/singleMovie";
import LoginForm from "./pages/auth/LoginForm";
import SignUpForm from "./pages/auth/SignUpForm";
import { AuthContextProvider } from "./context/AuthContext";
import { Outlet } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    ),
    children: [
      {
        path: "/",
        element: <LoginForm />,
      },
      {
        path: "/sign-up",
        element: <SignUpForm />,
      },
      {
        path: "homepage",
        element: <Homepage />,
      },
      {
        path: "movie/:movieID",
        element: <SingleMovie />,
      },
    ],
  },
]);

export default router;
