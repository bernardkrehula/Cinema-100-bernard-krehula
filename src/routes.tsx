import { createBrowserRouter } from "react-router-dom";
import Homepage from "./pages/homepage";
import Login from "./pages/login";
import SingleMovie from "./components/layouts/singleMovie";
import App from "./App";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                path: 'homepage',
                element: <Homepage />,
            },
            {
                path: 'login',
                element: <Login/>
            },
            {
                path: 'movie/:movieID',
                element: <SingleMovie/>
            }
        ]
    },  
]);

export default router;