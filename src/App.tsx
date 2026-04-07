import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSession } from "./pages/auth/hooks/useSession";

const App = () => {
  const navigate = useNavigate();
  const { hanldeSession } = useSession();
  useEffect(() => {
    hanldeSession();
  }, [navigate]);

  return <Outlet />;
};
export default App;
