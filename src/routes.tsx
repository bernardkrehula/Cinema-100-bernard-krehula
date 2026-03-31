import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import SingleMovie from "./pages/SingleMovie";
import LoginForm from "./pages/auth/LoginForm";
import SignUpForm from "./pages/auth/SignUpForm";
import { AuthContextProvider } from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import ProgressBar from "./components/ui/ProgressBar";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthContextProvider>
        <ProgressBar/>
        <Outlet />
      </AuthContextProvider>
    ),
    children: [
      {
        index: true,
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
    ],
  },
]);

export default router;
