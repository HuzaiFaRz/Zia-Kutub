// ProductsWrapper.jsx
import { useParams } from "react-router-dom";
import Products_By_Category from "./Products_By_Category";
import Product_Details from "./Product_Details";

const knownCategories = [
  "quran-kareem",
  "prayer-mat",
  "koofi",
  "books",
  "fragrance-oil",
  "accessories",
];

const ProductsWrapper = () => {
  // Key name router path "products/:param" se match karna chahiye
  const { param } = useParams();

  // Guard clause: Agar param na mile
  if (!param) return <div>Invalid Route</div>;

  const isCategory = knownCategories.includes(param.toLowerCase());

  if (isCategory) {
    return <Products_By_Category />;
  }

  return <Product_Details />;
};

export default ProductsWrapper;