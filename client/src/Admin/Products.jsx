import React from "react";
import { Outlet } from "react-router";

const Products = () => {
  return (
    <div>
      <h2>Products Section</h2>

      {/* Renders <Add_Product /> when path is /admin/products/add */}
      <Outlet />
    </div>
  );
};

export default Products;
