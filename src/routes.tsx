import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import SingleMovie from "./pages/SingleMovie/index.tsx";
import LoginForm from "./pages/auth/LoginForm/index.tsx";
import SignUpForm from "./pages/auth/SignUpForm/index.tsx";

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

