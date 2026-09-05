import { createBrowserRouter, RouterProvider } from "react-router";
import "swiper/css";
import Home from "./Pages/Home";
import Sign_Up from "./Pages/Sign_Up";
import Log_In from "./Pages/Log_In";
import Product_Details from "./Pages/Product_Details";
import Layout from "./Layout/Layout";
import About_Us from "./Pages/About_Us";

import Quran_Kareem from "./Pages/Quran_Kareem";
import Prayer_Mat from "./Pages/Prayer_Mat";
import Koofi from "./Pages/Koofi";
import Books from "./Pages/Books";
import Fragrance_Oil from "./Pages/Fragrance_Oil";
import Accessories from "./Pages/Accessories";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "/product/:id", element: <Product_Details /> },
      { path: "/aboutus", element: <About_Us /> },
      { path: "/qurankareem", element: <Quran_Kareem /> },
      { path: "/prayermat", element: <Prayer_Mat /> },
      { path: "/koofi", element: <Koofi /> },
      { path: "/books", element: <Books /> },
      { path: "/fragranceoil", element: <Fragrance_Oil /> },
      { path: "/accessories", element: <Accessories /> },
    ],
  },

  { path: "/signup", element: <Sign_Up /> },
  { path: "/login", element: <Log_In /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
