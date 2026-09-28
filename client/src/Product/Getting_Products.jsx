import { useParams } from "react-router-dom";

const Getting_Products = () => {
  const { category } = useParams();
  console.log(category);

  return (
    <div className="mt-40">
      <h1>{category ? `${category} Products` : "All Products"}</h1>
    </div>
  );
};

export default Getting_Products;
