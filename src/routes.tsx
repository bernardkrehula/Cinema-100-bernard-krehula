import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import SingleMovie from "./pages/SingleMovie";
import LoginForm from "./pages/auth/LoginForm";
import SignUpForm from "./pages/auth/SignUpForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginForm />,
  },
  {
    path: "/sign-up",
    element: <SignUpForm />,
  },
  {
    path: "/homepage",
    element: <Homepage />,
  },
  {
    path: "/movie/:movieID",
    element: <SingleMovie />,
  },
]);

export default router;
