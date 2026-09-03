import { createBrowserRouter, RouterProvider } from "react-router";
import "swiper/css";
import Home from "./Pages/Home";
import Sign_Up from "./Pages/Sign_Up";
import Log_In from "./Pages/Log_In";
import Product_Details from "./Pages/Product_Details";
import Layout from "./Layout/Layout";
import About_Us from "./Pages/About_Us";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/product/:id", element: <Product_Details /> },
      { path: "/aboutus", element: <About_Us /> },
    ],
  },

  { path: "/signup", element: <Sign_Up /> },
  { path: "/login", element: <Log_In /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
