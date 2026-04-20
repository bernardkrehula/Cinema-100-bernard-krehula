import { Navigate, Outlet } from "react-router-dom";
import { useSession } from "#/hooks/useSession";

const PublicRoutes = () => {
  const { session, isLoading } = useSession();

  if(isLoading) return null;

  return session?.data?.session ? <Navigate to="/homepage" replace/> : <Outlet />;
};
export default PublicRoutes;
