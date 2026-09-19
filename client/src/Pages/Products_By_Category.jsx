import { useParams } from "react-router-dom";

const Products_By_Category = () => {
  const { categoryName } = useParams();

  console.log(categoryName);

  return (
    <div className="mt-40">
      <h1>{categoryName}category</h1>
    </div>
  );
};

export default Products_By_Category;
