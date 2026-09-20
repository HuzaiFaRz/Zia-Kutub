import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "swiper/css";
import Lenis from "lenis";
import Home from "./Pages/Home";
import Sign_Up from "./Pages/Sign_Up";
import Log_In from "./Pages/Log_In";
import Product_Details from "./Pages/Product_Details";
import Layout from "./Layout/Layout";
import About_Us from "./Pages/About_Us";
import Admin_Dashboard from "./Admin/Admin_Dashboard";
import Products_By_Category from "./Pages/Products_By_Category";
import Dashboard from "./Pages/Dashboard";
import Contact_Us from "./Pages/Contact_Us";
import Privacy_Policy from "./Pages/Privacy_Policy";
import Terms_Condition from "./Pages/Terms_Condition";
import Admin_Add_Product from "./Admin/Admin_Add_Product";
import Admin_Edit_Product from "./Admin/Admin_Edit_Product";
import Admin_All_Orders from "./Admin/Admin_All_Orders";
import Faqs from "./Pages/Faqs";
import Orders from "./Pages/Orders";
import Return_Exchange from "./Pages/Return_Exchange";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "dashboard", element: <Dashboard /> },
      { path: "about-us", element: <About_Us /> },
      { path: "contact-us", element: <Contact_Us /> },
      { path: "privacy-policy", element: <Privacy_Policy /> },
      { path: "terms-condition", element: <Terms_Condition /> },
      { path: "return-exchange", element: <Return_Exchange /> },
      { path: "faqs", element: <Faqs /> },
      { path: "orders", element: <Orders /> },
      {
        path: ":category",
        element: <Products_By_Category />,
      },
      {
        path: "product/:id",
        element: <Product_Details />,
      },
      { path: "sign-up", element: <Sign_Up /> },
      { path: "login", element: <Log_In /> },
    ],
  },

  {
    path: "admin",
    element: <Admin_Dashboard />,

    children: [
      {
        path: "products",
        element: <Admin_Add_Product />,
      },
      { path: "products/add", element: <Admin_Add_Product /> },
      { path: "products/edit/:id", element: <Admin_Edit_Product /> },
      { path: "orders", element: <Admin_All_Orders /> },
    ],
  },
]);

const App = () => {
  new Lenis({
    autoRaf: true,
  });

  return <RouterProvider router={router} />;
};

export default App;
