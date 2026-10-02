import api from "../api/axios";
import Loading from "../Components/Loading";
import { AuthContextCreated } from "./Auth_Context";
import { useContext, useState } from "react";

export const AuthUseContext = () => useContext(AuthContextCreated);

const Auth_Context_Provider = ({ children }) => {
  const [authLoading, setAuthLoading] = useState(false);
  const [user, setUser] = useState({
    email: "hello@gmail.com",
    role: "admin",
    password: "sdkjfdskjfnds",
  });

  const categories = [
    {
      _id: "66f0a1b2c3d4e5f678901234",
      name: "Quran Kareem",
      slug: "quran-kareem",
    },
    { _id: "66f0a1b2c3d4e5f678901235", name: "Islamic Books", slug: "books" },
    { _id: "66f0a1b2c3d4e5f678901236", name: "Prayer Mat", slug: "prayer-mat" },
    { _id: "66f0a1b2c3d4e5f678901237", name: "Koofi / Topi", slug: "koofi" },
    {
      _id: "66f0a1b2c3d4e5f678901238",
      name: "Fragrance Oil",
      slug: "fragrance-oil",
    },
    {
      _id: "66f0a1b2c3d4e5f678901239",
      name: "Accessories",
      slug: "accessories",
    },
  ];

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
    <AuthContextCreated.Provider value={{ authLoading, user, categories }}>
      {authLoading ? <Loading /> : children}
    </AuthContextCreated.Provider>
  );
};

export default Auth_Context_Provider;
