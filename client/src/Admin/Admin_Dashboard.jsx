import { useState } from "react";

import { NavLink, Outlet } from "react-router";
import Logo from "../assets/Images/22.png";
import {
  ArrowLeft,
  LoaderCircle,
  LogOut,
  TextAlignJustify,
} from "lucide-react";

const Admin_Dashboard = () => {
  const [asideOpen, setAsidOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const aside_Handler = () => {
    setAsidOpen(!asideOpen);
    document.body.style.overflow = !asideOpen ? "hidden" : "auto";
  };

  return (
    <>
      <header className="fixed top-0 w-full bg-amber-50 flex justify-between items-center px-4 z-50">
        <TextAlignJustify
          onClick={aside_Handler}
          size={50}
          className="cursor-pointer"
        />
        <img src={Logo} alt="Logo" className="w-32 h-32" />
        <button
          disabled={loading}
          type="submit"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2.5 px-5 rounded-lg transition duration-200 flex justify-center items-center gap-4"
        >
          {loading ? "Please Wait" : "Log out"}
          {loading ? (
            <LoaderCircle size={20} className="animate-spin" />
          ) : (
            <LogOut size={20} />
          )}
        </button>
      </header>
      <aside
        className={`absolute top-0 ${asideOpen ? "left-0" : "-left-full"} w-[20%] h-full bg-black flex flex-col items-start justify-evenly text-white px-3 transition-all z-100`}
      >
        <ArrowLeft
          onClick={aside_Handler}
          size={50}
          className="absolute top-4 right-4 cursor-pointer"
        />

        <NavLink
          to={"orders"}
          className="hover:underline text-lg sm:text-2xl uppercase font-cinzel-semibold"
        >
          Orders
        </NavLink>
        <NavLink
          to={"products"}
          className="hover:underline text-lg sm:text-2xl uppercase font-cinzel-semibold"
        >
          Products
        </NavLink>
        <NavLink
          to={"products/add"}
          className="hover:underline text-lg sm:text-2xl uppercase font-cinzel-semibold"
        >
          Add Product
        </NavLink>
      </aside>

      <Outlet />
    </>
  );
};

export default Admin_Dashboard;
