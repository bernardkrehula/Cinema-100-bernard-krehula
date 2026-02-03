import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Homepage/>
    },
    {
        path: 'login',
        element: <Login/>
    }
]);

export default router;