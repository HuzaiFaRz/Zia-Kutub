import api from "../api/axios";
import Loading from "../Components/Loading";
import { AuthContextCreated } from "./Auth_Context";
import { useContext, useState } from "react";

export const AuthUseContext = () => useContext(AuthContextCreated);

const Auth_Context_Provider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState(null);

  // const isUserValid = async () => {
  //   try {
  //     setAuthLoading(true);
  //     const isUser = await api.post("/auth");
  //     setAuthLoading(false);
  //   } catch (error) {
  //     setAuthLoading(false);
  //     console.error(error);
  //   }
  // };

  return (
    <AuthContextCreated.Provider value={{ authLoading, user }}>
      {authLoading ? <Loading /> : children}
    </AuthContextCreated.Provider>
  );
};

export default Auth_Context_Provider;
