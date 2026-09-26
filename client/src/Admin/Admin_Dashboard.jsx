import { PlusCircle, ShoppingBag, LogOut } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import { buttonCancleStyle } from "../global";
import Toast from "../Components/Toast";

const AdminDashboard = () => {
  const adminLink = [
    {
      linkName: "Add Product",
      linkURL: "products/add",
    },
    {
      linkName: "Orders",
      linkURL: "/admin/orders",
    },
  ];

  const handleLogout = () => {
    // Insert your authentication cleanup / redirect logic here
    console.log("Logged out successfully");
  };

  return (
    <main className="w-full min-h-screen bg-beige">
      <Toast />
      <header className=" bg-dark w-full flex flex-wrap justify-center sm:justify-between items-center px-6 sm:px-10 py-5 gap-5">
        <div className="w-full sm:w-auto flex justify-between items-center space-x-3">
          <NavLink
            to={"/admin"}
            className="font-playfair-bold text-beige text-3xl lg:text-4xl cursor-pointer"
          >
            Zia Kutub
            <div className="w-full h-px bg-linear-to-r from-transparent via-beige to-transparent mt-2"></div>
          </NavLink>
          <span className="text-xs px-2.5 py-1 rounded border tracking-wider font-lato-regular bg-beige">
            ADMIN
          </span>
        </div>

        <nav className="flex items-center gap-5">
          {adminLink.map((link, ind) => {
            const { linkName, linkURL } = link;
            return (
              <NavLink
                key={ind}
                to={linkURL}
                className={
                  "flex items-center gap-3 px-4 py-2 rounded-2xl transition-all duration-150 text-beige p-1 hover:scale-105 font-lato-regular text-sm bg-mehroon border border-beige/60"
                }
              >
                {ind === 0 ? (
                  <PlusCircle className="w-4 h-4" />
                ) : (
                  <ShoppingBag className="w-4 h-4" />
                )}
                {linkName}
              </NavLink>
            );
          })}
        </nav>

        <button onClick={handleLogout} className={`${buttonCancleStyle}`}>
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </header>

      <Outlet />
    </main>
  );
};

export default AdminDashboard;
