import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "#/hooks/useSession";

const PrivateRoutes = () => {
  const { session, isLoading } = useSession();
  
  if(isLoading) return null;

  return  session?.data?.session ? <Outlet/> : <Navigate to='login' replace/>;
};
export default PrivateRoutes;
