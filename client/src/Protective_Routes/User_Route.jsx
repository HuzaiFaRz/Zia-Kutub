import Loading from "../Components/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { AuthUseContext } from "../Contexts/Auth_Context_Provider";

const User_Route = () => {
  const { authLoading, user } = AuthUseContext();
  if (authLoading) return <Loading />;
  if (!user) return <Navigate to="/auth/login" replace />;
  return <Outlet />;
};

export default User_Route;
