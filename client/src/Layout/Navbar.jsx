import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Banknote,
  BookText,
  Car,
  Handbag,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Logs,
  MessageCircle,
  Minus,
  MoveRight,
  Plus,
  Search,
  Trash,
  User,
  UserPlus,
  X,
} from "lucide-react";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

export const otherPagesLinks1 = [
  {
    linkName: "Orders",
    linkURL: "/orders",
  },
  {
    linkName: "Contact Us",
    linkURL: "/contact-us",
  },
  {
    linkName: "About Us",
    linkURL: "/about-us",
  },
];

export const otherPagesLinks2 = [
  {
    linkName: "FAQ's",
    linkURL: "/faqs",
  },
  {
    linkName: "Privacy & Policy",
    linkURL: "/privacy-policy",
  },
  {
    linkName: "Terms & Condition",
    linkURL: "/terms-condition",
  },
  {
    linkName: "Return & Exchange",
    linkURL: "/return-exchange",
  },
];

const Navbar = () => {
  const [headerAsideOpen, setHeaderAsideOpen] = useState(false);
  const [cartAsideOpen, setCartAsideOpen] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      cart_item_id: "cart_804",
      product_id: "prod_pr_09",
      title: "Orthopedic Soft Velvet Prayer Mat (Janamaz)",
      brand: "Al-Hidayah Store",
      color: "Emerald Green",
      price: {
        amount: 3200,
        currency: "Rs",
      },
      quantity: 2,
      image: {
        url: "https://images.unsplash.com/photo-1580870069867-74c57ee1bb07?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHN8ZW58MHx8MHx8fDA%3D",
        alt: "Emerald Green Velvet Prayer Mat",
      },
    },
    {
      cart_item_id: "cart_805",
      product_id: "prod_att_02",
      title: "Non-Alcoholic Concentrated Attar Oil (12ml)",
      brand: "Junaid Jamshed (J.)",
      color: "Amber Gold",
      price: {
        amount: 2150,
        currency: "Rs",
      },
      quantity: 1,
      image: {
        url: "https://images.unsplash.com/photo-1591624298055-3cfb0aa676c5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJheWVyJTIwbWF0fGVufDB8fDB8fHww",
        alt: "12ml Concentrated Perfume Oil",
      },
    },
  ]);

  const allLinks = [...otherPagesLinks1, ...otherPagesLinks2];

  const headerAsideHandler = () => {
    setHeaderAsideOpen(!headerAsideOpen);
  };

  const cartAsideHandler = () => {
    setCartAsideOpen(!cartAsideOpen);
  };

  useEffect(() => {
    document.body.style.overflow =
      headerAsideOpen || cartAsideOpen ? "hidden" : "auto";
  }, [headerAsideOpen, cartAsideOpen]);

  const productsLinks = [
    {
      linkName: "Quran Kareem",
      linkURL: "quran-kareem",
    },
    {
      linkName: "Prayer Mat",
      linkURL: "prayer-mat",
    },
    {
      linkName: "Koofi",
      linkURL: "koofi",
    },
    {
      linkName: "Books",
      linkURL: "books",
    },
    {
      linkName: "Fragrance Oil",
      linkURL: "fragrance-oil",
    },
    {
      linkName: "Accessories",
      linkURL: "/accessories",
    },
  ];

  return (
    <>
      <header className="w-full p-2 xl:p-3 fixed top-0 z-10 bg-beige">
        <nav className="bg-mehroon w-full h-auto px-6 lg:px-10 xl:px-16 py-4 rounded-t-4xl flex flex-col gap-10">
          <div className="w-full flex flex-wrap justify-between items-center gap-5 sm:gap-0">
            <NavLink
              to={"/"}
              className="font-playfair-bold text-beige text-3xl lg:text-4xl cursor-pointer"
            >
              Zia Kutub
              <div className="w-full h-px bg-linear-to-r from-transparent via-beige to-transparent mt-2"></div>
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

            <div className="flex items-center gap-3 text-beige sm:ml-4 order-2 sm:order-3 z-10">
              <Logs
                className="size-7 lg:size-10 flex md:hidden"
                onClick={headerAsideHandler}
              />

              <Menu as="div" className="relative inline-block">
                {/* User Button */}
                <MenuButton className="text-beige">
                  <User className="size-7 lg:size-10" />
                </MenuButton>

                {/* Dropdown */}
                <MenuItems
                  modal={false}
                  className={`absolute right-0 z-50 mt-3 w-52 origin-top-right rounded-xl border border-brown/20 bg-beige p-1 shadow-xl focus:outline-none`}
                >
                  {false ? (
                    <>
                      <MenuItem>
                        <NavLink
                          to="/dashboard"
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-dark`}
                        >
                          <LayoutDashboard size={19} />
                          Dashboard
                        </NavLink>
                      </MenuItem>

                      <MenuItem>
                        <button
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-dark`}
                        >
                          <LogOut size={19} />
                          Logout
                        </button>
                      </MenuItem>
                    </>
                  ) : (
                    <>
                      <MenuItem>
                        <NavLink
                          to="/login"
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-dark`}
                        >
                          <LogIn size={19} />
                          Login
                        </NavLink>
                      </MenuItem>

                      <MenuItem>
                        <NavLink
                          to="/sign-up"
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-dark`}
                        >
                          <UserPlus size={19} />
                          Register
                        </NavLink>
                      </MenuItem>
                    </>
                  )}
                </MenuItems>
              </Menu>

              <button className="relative" onClick={cartAsideHandler}>
                <Handbag className="size-7 lg:size-10" />
                <span className="absolute bg-brown text-xs rounded-full w-6.25 h-6.25 flex items-center justify-center -top-2 -right-3">
                  {cartItems.length}
                </span>
              </button>
            </div>
          </div>
          <div className="w-full hidden md:flex justify-evenly items-center text-beige text-sm lg:text-lg">
            {productsLinks.map((link, ind) => {
              const { linkName, linkURL } = link;
              return (
                <NavLink
                  key={ind}
                  to={linkURL}
                  className={
                    "bg-dark text-beige p-1 px-5 rounded-4xl hover:scale-105 transition-transform"
                  }
                >
                  {linkName}
                </NavLink>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Asides Overlay */}
      <div
        className={`w-full h-screen fixed top-0 left-0 bg-black/40 backdrop-blur-xs z-50 ${headerAsideOpen ? "flex" : "hidden"}`}
        onClick={headerAsideHandler}
      ></div>

      {/* Header Aside */}
      <aside
        data-lenis-prevent
        className={`w-[75%] sm:w-1/2 h-full overflow-y-auto fixed top-0 bg-dark text-beige flex flex-col items-center ${headerAsideOpen ? "left-0 z-100" : "-left-full z-0"} transition-all`}
      >
        <div className="w-full flex justify-between items-center p-5">
          <NavLink
            to={"/"}
            className="font-playfair-bold text-beige text-xl sm:text-3xl lg:text-4xl cursor-pointer"
          >
            Zia Kutub
            <div className="w-full h-px bg-linear-to-r from-transparent via-beige to-transparent mt-2"></div>
          </NavLink>
          <button
            className="w-7 sm:w-10 h-7 sm:h-10 flex justify-center items-center text-beige bg-mehroon rounded-full"
            onClick={headerAsideHandler}
          >
            <X className="size-4 sm:size-6" />
          </button>
        </div>

        <div className="flex flex-col items-start justify-center self-center justify-self-center  w-full px-3 gap-5 mt-5 p-3 font-lato-regular">
          <h1 className="font-cinzel-bold text-2xl font-extrabold w-full text-center">
            PRODUCTS
          </h1>
          {productsLinks.map((link, ind) => {
            const { linkName, linkURL } = link;
            return (
              <NavLink
                key={ind}
                to={linkURL}
                className="text-beige text-lg py-2 px-2 tracking-wider border-b w-full"
              >
                {linkName}
              </NavLink>
            );
          })}

          <h1 className="font-cinzel-bold text-2xl font-extrabold w-full text-center mt-5">
            OTHERS
          </h1>
          {otherPagesLinks1.map((link, ind) => {
            const { linkName, linkURL } = link;
            return (
              <NavLink
                key={ind}
                to={linkURL}
                className="text-beige text-lg py-2 px-2 tracking-wider border-b w-full"
              >
                {linkName}
              </NavLink>
            );
          })}
        </div>
      </aside>

      {/* Cart Aside */}
      <aside
        data-lenis-prevent
        className={`w-full h-full overflow-y-auto scroll-smooth fixed top-0 p-3 bg-beige flex flex-col justify-between items-center ${cartAsideOpen ? "right-0 z-100" : "-right-full z-0"} transition-all font-cinzel-bold`}
      >
        <div className="w-full p-1 flex gap-2 items-center">
          <button
            className="w-7 sm:w-10 h-7 sm:h-10 flex justify-center items-center text-beige bg-mehroon rounded-full"
            onClick={cartAsideHandler}
          >
            <X className="size-4 sm:size-6" />
          </button>
          <h1 className="font-cinzel-bold text-lg sm:text-xl md:text-4xl font-extrabold">
            YOUR SHOPPING CART
          </h1>
        </div>

        {cartItems.length !== 0 ? (
          <div className="w-full flex flex-col justify-start items-start gap-3 p-0 sm:p-1 text-beige mt-5">
            <div className="font-lato-regular w-full rounded-2xl p-5 flex justify-between items-center border-brown bg-mehroon text-xs sm:text-sm">
              <span>Showing {cartItems.length} items in your Cart.</span>
              <button className="text-red-400 flex items-center gap-1 hover:text-red-300">
                <Trash className="size-4 sm:size-5" />
                <span>Empty Cart</span>
              </button>
            </div>

            {cartItems.map((elem) => {
              const {
                brand,
                color,
                price,
                quantity,
                title,
                product_id,
                cart_item_id,
                image,
              } = elem;
              return (
                <div
                  className="w-full font-lato-regular flex flex-wrap justify-start sm:justify-between items-center gap-3 bg-mehroon p-2 sm:p-3 px-4 sm:px-8 border border-beige relative transition-all rounded-2xl hover:shadow-2xl"
                  key={product_id}
                  id={cart_item_id}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={image.url}
                      alt={image.url}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                    <div className="flex flex-col gap-1 text-xs sm:text-lg">
                      <p className="p-1 text-beige/80">{brand}</p>
                      <h1 className="font-bold">{title}</h1>
                      <div className="text-beige/80 mt-2">
                        Color:
                        <span className="ml-2 p-1 bg-black border text-beige text-[8px] sm:text-xs">
                          {color}
                        </span>
                      </div>
                      <div className="mt-2 text-beige/80">
                        {price.currency}. {price.amount}
                        <span className="text-xs text-beige/80">each</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end lg:justify-center items-center gap-10 w-full lg:w-auto text-xs sm:text-lg">
                    <div className="bg-dark flex items-center justify-between py-1 sm:py-2 px-3 sm:px-5 gap-5 rounded-lg border-beige/50 border mr-3 sm:mr-5">
                      <Minus size={20} />
                      <span>1</span>
                      <Plus size={20} />
                    </div>
                    <div className="flex flex-col items-start sm:items-end">
                      <span className="text-beige/60">Total</span>
                      <span className="-mt-1">
                        {price.currency}. {price.amount * quantity}
                      </span>
                    </div>
                    <Trash className="text-beige/40 hover:text-red-500" />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="w-full sm:min-w-100 bg-mehroon text-beige rounded-2xl border border-beige/50 flex flex-col justify-center items-center gap-3 p-5 font-lato-regular">
            <Handbag
              className="bg-beige p-2  rounded-full text-mehroon"
              size={50}
            />
            <h1 className="font-cinzel-bold text-2xl">YOUR CART IS EMPTY</h1>
            <button
              onClick={cartAsideHandler}
              className="bg-beige text-mehroon font-playfair-bold font-extrabold py-2 px-5 text-LG flex items-center justify-center gap-3"
            >
              <span>CONTINEU SHOPPING</span>
            </button>
          </div>
        )}

        <div className="w-full mt-2 bg-mehroon text-beige rounded-2xl border border-beige/50 flex flex-col gap-3 p-2 font-lato-regular">
          <div className="flex justify-between items-center border-b border-beige/20 p-4">
            <h1 className="font-cinzel-bold text-lg sm:text-2xl">
              ORDER SUMMARY
            </h1>
            <BookText />
          </div>
          <div className="flex flex-col gap-1 border-b border-beige/20 p-4 text-sm sm:text-lg">
            <div className="flex justify-between items-center">
              <span className="text-beige/60">Subtotal</span>
              <span className="text-beige">Rs. 0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-beige/60">Shipping Fee</span>
              <span className="text-beige">Rs. 0</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-b border-beige/20 p-4 text-sm sm:text-lg">
            <div className="flex justify-between items-center">
              <span className="text-beige/60">Total (PKR)</span>
              <div className="flex flex-col items-end">
                <span className="text-xl sm:text-4xl">RS.0</span>
                <span className="text-xs sm:text-sm text-beige/60">
                  Includes all applicable taxes
                </span>
              </div>
            </div>
            <button className="w-full bg-beige text-mehroon font-playfair-bold font-extrabold py-2 text-xs  sm:text-lg md:text-xl flex items-center justify-center gap-3">
              <span>PROCEED TO CHECKOUT</span>
              <MoveRight />
            </button>
          </div>
          <div className="flex justify-between sm:justify-evenly p-2 text-xs sm:text-sm text-beige/60">
            <div className="flex items-center gap-1">
              <Car className="size-5 sm:size-7" />
              <span> Fast Delivery (2-4 Days)</span>
            </div>
            <div className="flex items-center gap-1">
              <Banknote className="size-5 sm:size-7" />
              <span> Cash on Delivery</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
