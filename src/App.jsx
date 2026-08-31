import Hero from "./Components/Hero";
import TopBar from "./Layout/TopBar";
import "swiper/css";

const App = () => {
  return (
    <>
      <main className="w-full h-full">
        <TopBar />
        <Hero />
      </main>
    </>
  );
};

export default App;
