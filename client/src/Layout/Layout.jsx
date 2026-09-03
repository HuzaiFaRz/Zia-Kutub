import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router";
const Layout = () => {
  return (
    <main className="w-full h-full">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
