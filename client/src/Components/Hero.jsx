import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const Hero = () => {
  const hero_Images = [
    {
      url: "https://images.unsplash.com/photo-1710367446263-512c6ececbc7?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fHx8fA%3D%3D",
      name: "Premium Quran Kareem",
      shortDetails:
        "A beautifully designed edition of the Holy Quran, perfect for daily recitation, reflection, and spiritual connection.",
    },

    {
      url: "https://images.unsplash.com/photo-1718466044521-d38654f3ba0a?q=80&w=773&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1hfHx8fA%3D%3D",
      name: "Premium Attar Collection",
      shortDetails:
        "Experience elegant, long-lasting Islamic fragrances crafted with rich and captivating traditional scents.",
    },

    {
      url: "https://images.unsplash.com/photo-1641816514743-d264c1481585?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fHx8fA%3D%3D",
      name: "Islamic Books & Hadith",
      shortDetails:
        "Explore a carefully selected collection of Hadith, Seerah, Islamic teachings, and books for deeper knowledge and understanding.",
    },

    {
      url: "https://images.unsplash.com/photo-1782237319321-bac65528d4a5?q=80&w=580&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fHx8fA%3D%3D",
      name: "Traditional Prayer Cap",
      shortDetails:
        "A comfortable and elegant prayer cap designed for Salah, combining traditional Islamic style with everyday comfort.",
    },

    {
      url: "https://images.unsplash.com/photo-1589725617374-6d1cd65c8014?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjV8fHByYXllciUyMG1hdHxlbnwwfHwwfHx8MA%3D%3D",
      name: "Premium Prayer Mat",
      shortDetails:
        "A soft and beautifully crafted prayer mat offering comfort, quality, and a peaceful experience during every Salah.",
    },
  ];

  return (
    <Swiper
      slidesPerView={1}
      modules={[Autoplay]}
      loop={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
    >
      {hero_Images.map((sliderDetils, ind) => {
        const { url, name, shortDetails } = sliderDetils;

        return (
          <SwiperSlide className="p-4" key={ind}>
            <div className="min-h-112.5 rounded-2xl overflow-hidden bg-gray-50 flex flex-col md:flex-row items-center">
              <div className="w-full md:w-1/2 p-8 sm:p-10 lg:p-14 order-2 md:order-1">
                <span
                  className="inline-block mb-4 px-4 py-1.5 rounded-full
                       bg-green-100 text-green-700 text-sm font-cinzel-extrabold"
                >
                  Islamic Collection
                </span>

                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl font-bold
                     text-gray-900 leading-tight mb-5 font-cinzel-bold"
                >
                  {name}
                </h2>

                <p
                  className="text-gray-600 text-base sm:text-lg leading-relaxed
                    max-w-lg mb-8 font-cinzel-regular"
                >
                  {shortDetails}
                </p>

                <button
                  className="inline-flex items-center gap-2
                   px-6 py-3 rounded-full
                   bg-green-700 text-white font-semibold
                   shadow-md
                   hover:bg-green-800
                   hover:scale-105
                   transition-all duration-300 font-cinzel-regular"
                >
                  View More
                  <span className="text-lg">→</span>
                </button>
              </div>

              <div
                className="w-full md:w-1/2 h-75 md:h-112.5
                    p-4 md:p-6 order-1 md:order-2"
              >
                <img
                  src={url}
                  alt={name}
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </div>

            {/* <div className="relative overflow-hidden rounded-2xl min-h-112.5 flex items-center">
              <img
                src={url}
                alt={name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/45"></div>
              <div className="relative z-10 max-w-xl px-8 sm:px-12 text-white">
                <span className="inline-block mb-3 px-4 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm font-medium">
                  Islamic Collection
                </span>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-4">
                  {name}
                </h2>
                <p className="text-base sm:text-lg text-white/90 leading-relaxed mb-7 max-w-lg">
                  {shortDetails}
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white text-gray-900 font-semibold hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                  View More <span className="text-lg">→</span>
                </button>
              </div>
            </div> */}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Hero;
