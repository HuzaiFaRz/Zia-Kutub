import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { Handbag, Logs, MessageCircle, Search, User, X } from "lucide-react";

const Navbar = () => {
  const [headerAsideOpen, setHeaderAsideOpen] = useState(false);
  const [cartAsideOpen, setCartAsideOpen] = useState(false);

  const headerAsideHandler = () => {
    setHeaderAsideOpen(!headerAsideOpen);
  };

  const cartAsideHandler = () => {
    setCartAsideOpen(!cartAsideOpen);
  };

  useEffect(() => {
    document.body.style.overflow =
      headerAsideOpen || cartAsideOpen ? "hidden" : "auto";
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
      <header className="w-full p-2 xl:p-3 fixed top-0 z-10 bg-beige">
        <nav className="bg-mehroon w-full h-auto px-6 lg:px-10 xl:px-16 py-4 rounded-t-4xl shadow-2xl flex flex-col gap-10">
          <div className="w-full flex flex-wrap justify-between items-start gap-5 sm:gap-0">
            <NavLink
              to={"/"}
              className="font-playfair-bold text-beige underline underline-offset-4 text-3xl lg:text-4xl cursor-pointer"
            >
              Zia Kutub
            </NavLink>

            <form className="relative text-beige w-full sm:w-auto sm:ml-auto sm:mr-4 order-3 sm:order-2">
              <input
                type="search"
                className="outline-0 text-sm lg:text-lg border p-2 w-full sm:min-w-64 placeholder:text-beige"
                placeholder="Product Search"
              />
              <button type="submit">
                <Search
                  className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                  size={28}
                />
              </button>
            </form>

            <div className="flex gap-3 text-beige sm:ml-4 order-2 sm:order-3">
              <NavLink to={"/signup"}>
                <User size={35} />
              </NavLink>
              <button className="relative" onClick={cartAsideHandler}>
                <Handbag size={35} />
                <span className="absolute bg-brown text-sm rounded-full w-6.25 h-6.25 flex items-center justify-center -top-2 -right-3">
                  0
                </span>
              </button>
            </div>
          </div>
          <div className="w-full flex flex-wrap justify-between items-center text-beige">
            <Logs
              size={35}
              onClick={headerAsideHandler}
              className="flex end:hidden"
            />

            <div className="hidden end:flex gap-3 lg:gap-5 xl:gap-8 items-center font-lato-regular">
              {navLinks.map((link, ind) => {
                const { linkName, linkURL } = link;
                return (
                  <NavLink
                    key={ind}
                    to={linkURL}
                    className="text-sm lg:text-lg p-2 tracking-wider"
                  >
                    {linkName}
                  </NavLink>
                );
              })}
            </div>

            <a
              href="https://wa.me/+923083362107?text=Assalamualaikum! Can I Get More Info About your Store"
              target="_blank"
              className="flex items-center gap-2  bg-brown text-beige font-cinzel-bold px-3 lg:px-5 p-2 rounded-r-4xl"
            >
              <MessageCircle className="size-4 lg:size-6" />
              <span className="text-sm lg:text-lg">Contact Us</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Asides Overlay */}
      <div
        className={`w-full h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-xs z-50 ${headerAsideOpen || cartAsideOpen ? "flex" : "hidden"}  transition-all`}
        onClick={() => {
          if (headerAsideOpen) return headerAsideHandler();
          if (cartAsideOpen) return cartAsideHandler();
        }}
      ></div>

      {/* Header Aside */}
      <aside
        className={`w-[75%] sm:w-1/2 h-screen fixed top-0 bg-mehroon/80 text-beige flex flex-col justify-evenly items-start px-8 ${headerAsideOpen ? "left-0 z-100" : "-left-full z-0"} transition-all overflow-hidden`}
      >
        <button className="absolute right-5 top-5" onClick={headerAsideHandler}>
          <X size={40} />
        </button>
        {navLinks.map((link, ind) => {
          const { linkName, linkURL } = link;
          return (
            <NavLink
              key={ind}
              to={linkURL}
              className="text-2xl w-full p-3 py-4 tracking-wider font-lato-regular border-b border-l border-beige"
            >
              {linkName}
            </NavLink>
          );
        })}
      </aside>

      {/* Cart Aside */}
      <aside
        className={`w-[75%] sm:w-1/2 h-screen fixed top-0 bg-mehroon/50 text-beige flex flex-col justify-center items-center px-8 ${cartAsideOpen ? "right-0 z-100" : "-right-full z-0"} transition-all font-cinzel-bold`}
      >
        <button className="absolute left-5 top-5" onClick={cartAsideHandler}>
          <X size={40} />
        </button>
        <p className="text-5xl">No Items</p>
      </aside>
    </>
  );
};

export default Navbar;
