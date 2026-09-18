import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useLocation } from "react-router";
import { useEffect } from "react";
const Layout = () => {
  const pageLocation = useLocation();
  useEffect(() => {
    if (pageLocation.pathname !== "/") {
      const currentPageURL = pageLocation.pathname
        .slice(1)
        .split("-")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
        )
        .join(" ");

      document.title = `Zia - Kutub ${currentPageURL}`;
      return;
    }
    document.title = `Zia - Kutub Home`;
  }, [pageLocation]);

  return (
    <main className="w-full min-h-screen bg-beige relative p-1">
      <Navbar />
      <Outlet />
      <Footer />
    </main>
  );
};

export default Layout;
