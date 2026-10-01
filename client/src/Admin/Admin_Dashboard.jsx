import { LogOut } from "lucide-react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const admin_URLS = [
    {
      linkName: "Dashboard",
      linkURL: "/admin",
    },
    {
      linkName: "Catalogs",
      linkURL: "/admin/product/all",
    },
    {
      linkName: "Add Product",
      linkURL: "/admin/product/add",
    },
    {
      linkName: "Orders",
      linkURL: "/admin/orders",
    },
  ];

  const storeStatus = [
    {
      id: "active-products",
      label: "Active Products",
      value: "124",
    },
    {
      id: "pending-orders",
      label: "Pending Orders",
      value: "18",
    },
    {
      id: "system-status",
      label: "System Status",
      value: "Operational",
    },
  ];

  const adminRules = {
    sectionTitle: "Standard Protocols for Product Creation",
    sectionDescription:
      "Please review the following guidelines and rules before publishing a new product to ensure the storefront maintains its premium standards:",
    protocols: [
      {
        title: "1. High-Resolution Visuals",
        description:
          "Each variant must include at least 2 high-quality photographs. Images should feature a square aspect ratio (1:1) with clear, well-lit presentation.",
      },
      {
        title: "2. Unique Slug Generation",
        description:
          "The product slug must be clean and URL-friendly (e.g., premium-velvet-prayer-mat). Avoid using special characters or spaces.",
        exampleSlug: "premium-velvet-prayer-mat",
      },
      {
        title: "3. Mandatory Default Variant",
        description:
          "Every product listing requires exactly one designated Default Variant. The system will reject records saved without a default variant.",
      },
      {
        title: "4. Valid Pricing & Stock Counts",
        description:
          "Price and stock values must be positive numerical inputs. Verify sizes and attributes thoroughly before proceeding with publication.",
      },
    ],
  };

  const handleLogout = () => {
    // Clear auth token/state here
    navigate("/auth/login");
  };

  // NavLink styling with smooth hover underline animation
  const getLinkClass = ({ isActive }) =>
    `relative py-2 text-sm tracking-wider uppercase font-['Lato-Regular'] transition-colors duration-300 group ${
      isActive
        ? "text-[#e1dcc9] font-bold"
        : "text-[#e1dcc9]/80 hover:text-[#e1dcc9]"
    }`;

  // Check if current page is the main root /admin dashboard
  const isMainDashboard =
    location.pathname === "/admin" || location.pathname === "/admin/";

  return (
    <div className="w-full min-h-screen bg-beige text-mehroon flex flex-col font-lato-regular">
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

        <nav className="flex flex-wrap justify-center items-center gap-5">
          {admin_URLS.map((link, ind) => {
            const { linkName, linkURL } = link;
            return (
              <NavLink to={linkURL} end className={getLinkClass} key={ind}>
                {linkName}
                {/* Animated Underline */}
                <span className="absolute left-0 bottom-0 w-full h-0.5 bg-beige transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left"></span>
              </NavLink>
            );
          })}
        </nav>

        <button
          onClick={handleLogout}
          className="px-4 py-1.5 rounded bg-red-950/40 text-red-300 border border-red-900/40 text-xs tracking-wider uppercase flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </header>

      <main className="w-full h-full p-4">
        {isMainDashboard ? (
          <div className="space-y-8 animate-fadeIn">
            <header className="bg-dark text-beige p-4 rounded-2xl">
              <h2 className="font-playfair-regular text-3xl md:text-4xl mb-2">
                Store Console & Guidelines
              </h2>
              <p className="text-beige/80 text-sm md:text-base">
                Welcome back. Manage products, review customer orders, and
                maintain store quality standards from this terminal.
              </p>
            </header>

            <div className="flex flex-wrap justify-evenly items-center gap-4">
              {storeStatus.map((elem, ind) => {
                const { id, label, value } = elem;
                return (
                  <div
                    className="bg-mehroon p-6 rounded w-full sm:w-100"
                    key={ind}
                    id={id}
                  >
                    <p className="text-sm text-beige/60 uppercase tracking-widest">
                      {label}
                    </p>
                    <h3 className="font-cinzel-bold text-xl text-beige mt-2">
                      {value}
                    </h3>
                  </div>
                );
              })}
            </div>

            {/* Product Creation Guidelines Section */}
            <section className="bg-mehroon rounded p-6 md:p-8 text-beige space-y-6">
              <h3 className="font-playfair-bold text-2xl border-b border-beige/50 pb-3">
                {adminRules.sectionTitle}
              </h3>

              <p className="font-lato-regular text-beige/80 text-sm md:text-base leading-relaxed">
                {adminRules.sectionDescription}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {adminRules.protocols.map((elem, ind) => {
                  const { title, description } = elem;
                  return (
                    <div className="space-y-2" key={ind}>
                      <h4 className="font-cinzel-bold text-base md:text-lg">
                        {title}
                      </h4>
                      <p className="font-lato-regular text-sm  text-beige/70 leading-relaxed">
                        {description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        ) : (
          /* Nested Routes (Products, Add Product, Orders) will render here */
          <Outlet />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
