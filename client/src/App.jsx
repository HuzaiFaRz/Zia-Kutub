import { BrowserRouter, Route, Routes } from "react-router-dom";
import "swiper/css";
import Lenis from "lenis";
import Home from "./Pages/Home";
import Product_Details from "./Product/Product_Details";
import Layout from "./Layout/Layout";
import About_Us from "./Pages/About_Us";
import Admin_Dashboard from "./Admin/Admin_Dashboard";
import Contact_Us from "./Pages/Contact_Us";
import Privacy_Policy from "./Pages/Privacy_Policy";
import Terms_Condition from "./Pages/Terms_Condition";
import Admin_Add_Product from "./Admin/Admin_Add_Product";
import Admin_Edit_Product from "./Admin/Admin_Edit_Product";
import Admin_All_Orders from "./Admin/Admin_All_Orders";
import Faqs from "./Pages/Faqs";
import Return_Exchange from "./Pages/Return_Exchange";
import Getting_Products from "./Product/Getting_Products";
import Admin_Route from "./Protective_Routes/Admin_Route";
import Auth_Route from "./Protective_Routes/Auth_Route";
import User_Route from "./Protective_Routes/User_Route";
import Orders from "./User/Orders";
import Dashboard from "./User/Dashboard";
import Sign_Up from "./Auth/Sign_Up";
import Log_In from "./Auth/Log_In";
import Toast from "./Components/Toast";
import Admin_All_Products from "./Admin/Admin_All_Products";

const App = () => {
  new Lenis({
    autoRaf: true,
  });

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about-us" element={<About_Us />} />
            <Route path="contact-us" element={<Contact_Us />} />
            <Route path="privacy-policy" element={<Privacy_Policy />} />
            <Route path="terms-condition" element={<Terms_Condition />} />
            <Route path="return-exchange" element={<Return_Exchange />} />
            <Route path="faqs" element={<Faqs />} />
            <Route path="products" element={<Getting_Products />} />
            <Route path="products/:category" element={<Getting_Products />} />
            <Route path="product/:id" element={<Product_Details />} />
            <Route path="user" element={<User_Route />}>
              <Route path="orders" element={<Orders />} />
              <Route path="dashboard" element={<Dashboard />} />
            </Route>
          </Route>

          <Route
            path="admin"
            element={
              <Admin_Route>
                <Admin_Dashboard />
              </Admin_Route>
            }
          >
            <Route path="product/all" element={<Admin_All_Products />} />
            <Route path="product/add" element={<Admin_Add_Product />} />
            <Route path="product/edit/:id" element={<Admin_Edit_Product />} />
            <Route path="orders" element={<Admin_All_Orders />} />
          </Route>

          <Route path="auth" element={<Auth_Route />}>
            <Route path="sign-up" element={<Sign_Up />} />
            <Route path="login" element={<Log_In />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toast />
    </>
  );
};

export default App;
