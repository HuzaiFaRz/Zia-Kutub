import Loading from "../Components/Loading";
import { Navigate } from "react-router-dom";
import { AuthUseContext } from "../Contexts/Auth_Context_Provider";

const Admin_Route = ({ children }) => {
  const { loading, user } = AuthUseContext();
  if (loading) return <Loading />;
  if (!user) return <Navigate to="/auth/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;
  return children;
};

export default Admin_Route;
