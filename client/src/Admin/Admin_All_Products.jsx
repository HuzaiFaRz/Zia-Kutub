import { Outlet } from "react-router-dom";

const Admin_All_Products = () => {
  return (
    <section className="w-full h-full bg-mehroon mt-5">
      <div className="w-full p-4 items-center text-center justify-center">
        <h1 className="text-4xl mb-2 text-beige font-cinzel-bold">
          All Products
        </h1>
        <p className="text-sm text-beige/80 font-lato-regular">
          Manage your Islamic lifestyle store inventory, cap models, and prayer
          mat variants.
        </p>
      </div>

      <div className="actionbar w-full p-3">
        <input type="search" placeholder="search Product" />
      </div>
      <Outlet />
    </section>
  );
};

export default Admin_All_Products;
