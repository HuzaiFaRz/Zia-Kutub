import Hero from "../Components/Hero.jsx";
import ThreeDProductsHero from "../Components/ThreeDProductsHero.jsx";
import Getting_Products from "../Product/Getting_Products.jsx";

const Home = () => {
  return (
    <div className="w-full h-full p-2 xl:p-3">
      <ThreeDProductsHero />
      <Getting_Products/>
    </div>
  );
};

export default Home;
