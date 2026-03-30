import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import SingleMovie from "./pages/singleMovie";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "homepage",
    element: <Homepage />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "movie/:movieID",
    element: <SingleMovie />,
  },
  {
    path: '/login-form',
    element: <LoginForm />
  },
  {
    path: '/sign-up-form',
    element: <SignUpForm />
  }
]);

export default router;
