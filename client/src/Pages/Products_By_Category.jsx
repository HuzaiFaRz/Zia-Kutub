import { useParams } from "react-router-dom";

const Products_By_Category = () => {
  const { category } = useParams();
  console.log(category);

  return (
    <div className="mt-40">
      <h1>{category}category</h1>
    </div>
  );
};

export default Products_By_Category;
