import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaRegHeart } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { FiMenu } from "react-icons/fi";
import Logo from "../assets/Images/22.png";
import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [headerAsideOpen, setHeaderAsideOpen] = useState(false);
  const [cartAsideOpen, setCartAsideOpen] = useState(false);
  const [wishListBoxOpen, setWishListBoxOpen] = useState(false);

  const headerAsideHandler = () => {
    setHeaderAsideOpen(!headerAsideOpen);
  };

  const cartAsideHandler = () => {
    setCartAsideOpen(!cartAsideOpen);
  };

  const wishListBoxHandler = () => {
    setWishListBoxOpen(!wishListBoxOpen);
  };

  useEffect(() => {
    document.body.style.overflow =
      headerAsideOpen || wishListBoxOpen || cartAsideOpen ? "hidden" : "auto";
  });

  const navLinks = [
    { linkName: "Quran Kareem", linkURL: "qurankareem" },
    { linkName: "Prayer Mat", linkURL: "prayermat" },
    { linkName: "Koofi", linkURL: "koofi" },
    { linkName: "Books", linkURL: "books" },
    { linkName: "Fragrance Oil", linkURL: "fragranceoil" },
    { linkName: "Accessories", linkURL: "accessories" },
  ];

  return (
    <>
      {/* Header */}
      <header className="w-full relative">
        <div className="w-full p-2.5 bg-black text-white text-sm text-center font-cinzel-regular font-bold">
          <Swiper
            slidesPerView={1}
            modules={[Autoplay]}
            loop={true}
            allowTouchMove={false}
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
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ziakutubcenter@gmail.com"
            target="_blank"
          >
            ✉ ziakutubcenter@gmail.com
          </a>
          <a
            href="https://wa.me/+923083362107?text=Assalamualaikum! Can I Get More Info About your Store"
            target="_blank"
          >
            💬 +92 308 3362107
          </a>
        </div>
        <div className="w-full bg-blue-50 text-black no-underline flex flex-wrap justify-center sm:justify-between items-center gap-10 md:gap-0 py-4 md:py-0 px-3 sm:px-5 border-b font-cinzel-semibold">
          <a href="/">
            <img src={Logo} alt="Logo" className="w-37.5 h-35" />
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
            <button className="relative" onClick={wishListBoxHandler}>
              <FaRegHeart size={40} />
              <p className="absolute bg-black text-lg text-white rounded-full w-6.25 h-6.25 flex items-center justify-center -top-2 -right-3">
                0
              </p>
            </button>
            <button className="relative" onClick={cartAsideHandler}>
              <BsCart4 size={40} />
              <p className="absolute bg-black text-lg text-white rounded-full w-6.25 h-6.25 flex items-center justify-center -top-2 -right-3">
                0
              </p>
            </button>

            <button className="flex md:hidden" onClick={headerAsideHandler}>
              <FiMenu size={40} />
            </button>
          </div>
        </div>

        <nav className="w-full p-2 bg-black text-white hidden md:flex flex-row justify-evenly items-center relative">
          {navLinks.map((link, ind) => {
            const { linkName, linkURL } = link;
            return (
              <NavLink
                key={ind}
                to={linkURL}
                className="text-sm lg:text-lg hover:underline uppercase font-cinzel-semibold"
              >
                {linkName}
              </NavLink>
            );
          })}
        </nav>
      </header>

      {/* Asides Overlay */}
      <div
        className={`w-full h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-xs z-50 ${headerAsideOpen || cartAsideOpen || wishListBoxOpen ? "flex" : "hidden"}  transition-all`}
        onClick={() => {
          if (headerAsideOpen) return headerAsideHandler();
          if (cartAsideOpen) return cartAsideHandler();
          if (wishListBoxOpen) return setWishListBoxOpen();
        }}
      ></div>

      {/* Header Aside */}
      <aside
        className={`w-[75%] sm:w-1/2 h-screen fixed top-0 bg-black text-white flex flex-col justify-evenly items-start px-8 ${headerAsideOpen ? "left-0 z-100" : "-left-full z-0"} transition-all overflow-auto`}
      >
        <button
          className="absolute right-10 top-5"
          onClick={headerAsideHandler}
        >
          <RxCross1 size={30} />
        </button>
        {navLinks.map((link, ind) => {
          const { linkName, linkURL } = link;
          return (
            <NavLink
              key={ind}
              to={linkURL}
              className="hover:underline text-lg sm:text-2xl uppercase font-cinzel-semibold"
            >
              {linkName}
            </NavLink>
          );
        })}
      </aside>

      {/* Cart Aside */}
      <aside
        className={`w-[75%] sm:w-1/2 h-screen fixed top-0 bg-black text-white flex flex-col justify-center items-center px-8 ${cartAsideOpen ? "right-0 z-100" : "-right-full z-0"} transition-all overflow-auto`}
      >
        <button className="absolute left-10 top-5" onClick={cartAsideHandler}>
          <RxCross1 size={30} />
        </button>
        <p className="text-4xl">No Items</p>
      </aside>

      {/* WishList Box */}

      <div
        className={`w-full sm:w-160 min-h-62.5 fixed left-1/2 top-1/2 -translate-1/2 bg-black text-white flex flex-col justify-center items-center px-8 ${wishListBoxOpen ? "opacity-100 z-100" : "opacity-0 z-0 hidden"} transition-all overflow-auto`}
      >
        <button className="absolute right-3 top-3" onClick={wishListBoxHandler}>
          <RxCross1 size={20} />
        </button>
        <p className="text-4xl">No Items</p>
      </div>
    </>
  );
};

export default Navbar;
