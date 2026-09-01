import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import Logo from "../assets/Images/22.png";
const TopBar = () => {
  const [asideOpen, setAsideOpen] = useState(false);

  const aside_Handler = () => {
    setAsideOpen(!asideOpen);
  };

  const windowResizeing = () => {
    if (window.innerWidth > 768) {
      if (asideOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
      document.body.style.overflow = "auto";
      return;
    }
  };

  useEffect(() => {
    document.body.style.overflow = asideOpen ? "hidden" : "";
    window.addEventListener("resize", windowResizeing);
    return () => window.removeEventListener("resize", windowResizeing);
  });

  const nav_Links = [
    { linkName: "Quran Kareem", linkURL: "qurankareem" },
    { linkName: "Qaida", linkURL: "qaida" },
    { linkName: "Surahs", linkURL: "surahs" },
    { linkName: "Books", linkURL: "books" },
    { linkName: "Accessories", linkURL: "accessories" },
    { linkName: "Prayer Mat", linkURL: "prayermat" },
    { linkName: "Koofi", linkURL: "koofi" },
    { linkName: "Fragrance Oil", linkURL: "fragranceoil" },
  ];

  return (
    <>
      <header className="w-full relative">
        <div className="w-full p-2.5 bg-black text-white text-sm text-center font-cinzel-regular font-bold">
          <Swiper
            slidesPerView={1}
            modules={[Autoplay]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
          >
            <SwiperSlide>
              Free shipping in Karachi for orders over PKR 2,999
            </SwiperSlide>
            <SwiperSlide>
              Free shipping in Karachi for orders over PKR 2,999
            </SwiperSlide>
          </Swiper>
        </div>
        <div className="w-full p-2 bg-blue-50 text-black border-b flex flex-wrap justify-around items-center text-sm font-cinzel-semibold tracking-wide">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ziakutub@gmail.com"
            target="_blank"
          >
            ✉ ziakutub@gmail.com
          </a>
          <a
            href="https://wa.me/+923492279579?text=Assalamualaikum! Can I Get More Info About your Store"
            target="_blank"
          >
            💬 +92 349 2279579
          </a>
        </div>
        <div className="w-full bg-blue-50 text-black no-underline flex flex-wrap justify-center sm:justify-between items-center gap-10 md:gap-0 py-4 md:py-0 px-3 sm:px-5 border-b font-cinzel-semibold">
          <a href="/">
            <img src={Logo} alt="Logo" className="w-[150px] h-[140px]" />
          </a>
          <form className="flex flex-wrap justify-center items-center gap-3">
            <input
              type="search"
              placeholder="Search..."
              className="px-3 py-2 border min-w-80 focus:outline-0"
            />

            <button className="px-5 py-2 bg-black rounded-2xl text-white">
              Search
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <button className="relative">
              <FaRegHeart size={40} />
              <p className="absolute bg-black text-lg text-white rounded-full w-6.25 h-6.25 flex items-center justify-center -top-2 -right-3">
                0
              </p>
            </button>
            <button className="relative">
              <BsCart4 size={40} />
              <p className="absolute bg-black text-lg text-white rounded-full w-6.25 h-6.25 flex items-center justify-center -top-2 -right-3">
                0
              </p>
            </button>

            <button className="flex md:hidden" onClick={aside_Handler}>
              <FiMenu size={40} />
            </button>
          </div>
        </div>

        <nav className="w-full p-2 bg-black text-white hidden md:flex flex-row justify-evenly items-center relative">
          {nav_Links.map((link, ind) => {
            const { linkName, linkURL } = link;
            return (
              <a
                key={ind}
                href={linkURL}
                className="text-sm lg:text-lg hover:underline uppercase font-cinzel-semibold"
              >
                {linkName}
              </a>
            );
          })}
        </nav>
      </header>

      <div
        className={`w-full h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-xs z-50 ${asideOpen ? "flex" : "hidden"}  transition-all`}
        onClick={aside_Handler}
      ></div>

      <aside
        className={`w-[75%] sm:w-1/2 h-screen fixed top-0 bg-black text-white z-100 flex flex-col justify-evenly items-start px-8 ${asideOpen ? "left-0" : "-left-full"} transition-all`}
      >
        <button className="absolute right-10 top-5" onClick={aside_Handler}>
          <RxCross1 size={30} />
        </button>
        {nav_Links.map((link, ind) => {
          const { linkName, linkURL } = link;
          return (
            <a
              key={ind}
              href={linkURL}
              className="hover:underline text-lg sm:text-2xl uppercase font-cinzel-semibold"
            >
              {linkName}
            </a>
          );
        })}
      </aside>
    </>
  );
};

export default TopBar;
