import Loading from "../Components/Loading";
import { Navigate, Outlet } from "react-router-dom";
import { AuthUseContext } from "../Contexts/Auth_Context_Provider";

const Auth_Route = () => {
  const { loading, user } = AuthUseContext();
  if (loading) return <Loading />;
  if (user) return <Navigate to="/" replace />;
  return <Outlet />;
};

export default Auth_Route;
