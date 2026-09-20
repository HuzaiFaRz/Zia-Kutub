import { useParams } from "react-router-dom";

const Product_Details = () => {
  const { id } = useParams();


  console.log(id)

  return (
    <div>
      <h2 className="mt-40">Product ID: {id}</h2>
    </div>
  );
};

export default Product_Details;
