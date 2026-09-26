import { LoaderCircle } from "lucide-react";

const Loading = () => {
  return (
    <div className="flex items-center justify-center fixed top-0 right-0 backdrop-blur-xl w-full h-screen z-100 text-beige">
      <LoaderCircle className="animate-spin" size={300} />
    </div>
  );
};

export default Loading;
