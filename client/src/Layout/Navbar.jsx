import { useEffect, useState } from "react";
import { NavLink } from "react-router";
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
    { linkName: "Quran Kareem", linkURL: "quran-kareem" },
    { linkName: "Prayer Mat", linkURL: "prayer-mat" },
    { linkName: "Koofi", linkURL: "koofi" },
    { linkName: "Books", linkURL: "books" },
    { linkName: "Fragrance Oil", linkURL: "fragrance-oil" },
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
              <Menu as="div" className="relative inline-block">
                {/* User Button */}
                <MenuButton className="text-beige">
                  <User size={35} strokeWidth={1.7} />
                </MenuButton>

                {/* Dropdown */}
                <MenuItems className="absolute right-0 z-50 mt-3 w-52 origin-top-right rounded-xl border border-brown/20 bg-beige p-1 shadow-xl focus:outline-none">
                  {false ? (
                    <>
                      <MenuItem>
                        <NavLink
                          to="/dashboard"
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-mehroon`}
                        >
                          <LayoutDashboard size={19} />
                          Dashboard
                        </NavLink>
                      </MenuItem>

                      <MenuItem>
                        <button
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-mehroon`}
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
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-mehroon`}
                        >
                          <LogIn size={19} />
                          Login
                        </NavLink>
                      </MenuItem>

                      <MenuItem>
                        <NavLink
                          to="/sign-up"
                          className={`flex w-full items-center gap-3 rounded-lg px-2 py-2 font-medium bg-none text-brown transition hover:text-beige hover:bg-mehroon`}
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
                <Handbag size={35} />
                <span className="absolute bg-brown text-sm rounded-full w-6.25 h-6.25 flex items-center justify-center -top-2 -right-3">
                  {cartItems.length}
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
            <div className="flex gap-2">
              <a
                href="https://wa.me/+923083362107?text=Assalamualaikum! Can I Get More Info About your Store"
                target="_blank"
                className="flex items-center gap-2  bg-brown text-beige font-cinzel-bold px-3 lg:px-5 p-2 rounded-r-4xl"
              >
                <MessageCircle className="size-4 lg:size-6" />
                <span className="text-sm lg:text-lg">Contact Us</span>
              </a>
              <NavLink
                to={"about-us"}
                className="flex items-center gap-2  bg-brown text-beige font-cinzel-bold px-3 lg:px-5 p-2 rounded-r-4xl"
              >
                <Info className="size-4 lg:size-6" />
                <span className="text-sm lg:text-lg">About us</span>
              </NavLink>
            </div>
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
        className={`w-[75%] sm:w-1/2 h-screen fixed top-0 bg-beige text-mehroon flex flex-col justify-between items-center ${headerAsideOpen ? "left-0 z-100" : "-left-full z-0"} transition-all`}
      >
        <div className="w-full p-2 flex justify-between items-center">
          <h1 className="font-playfair-bold text-4xl font-extrabold underline">
            Products
          </h1>

          <button
            className="w-10 h-10 flex justify-center items-center text-beige bg-mehroon rounded-full"
            onClick={headerAsideHandler}
          >
            <X size={23} />
          </button>
        </div>
        <div className="w-full flex flex-col gap-5">
          {navLinks.map((link, ind) => {
            const { linkName, linkURL } = link;
            return (
              <NavLink
                key={ind}
                to={linkURL}
                className="bg-mehroon text-beige font-playfair-regular text-2xl w-full p-3 py-4 tracking-wider"
              >
                {linkName}
              </NavLink>
            );
          })}
        </div>
        <p></p>
      </aside>

      {/* Cart Aside */}
      <aside
        className={`w-full h-screen fixed top-0 p-3 bg-beige flex flex-col justify-between items-center ${cartAsideOpen ? "right-0 z-100" : "-right-full z-0"} transition-all font-cinzel-bold overflow-auto`}
      >
        <div className="w-full p-1 flex gap-2 items-center">
          <button
            className="w-10 h-10 flex justify-center items-center text-beige bg-mehroon rounded-full"
            onClick={cartAsideHandler}
          >
            <X size={23} />
          </button>
          <h1 className="font-cinzel-bold text-2xl sm:text-4xl font-extrabold">
            YOUR SHOPPING CART
          </h1>
        </div>

        {cartItems.length !== 0 ? (
          <div className="w-full flex flex-col justify-start items-start gap-3 p-1 text-beige mt-5">
            <div className="font-lato-regular w-full rounded-2xl p-5 flex justify-between items-center border-brown bg-mehroon">
              <span>Showing {cartItems.length} items in your Cart.</span>
              <button className="text-red-400 flex items-center gap-1 hover:text-red-300">
                <Trash size={22} />
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
                  className="w-full font-lato-regular flex flex-wrap justify-center sm:justify-between items-center gap-3 bg-mehroon p-3 border border-beige relative transition-all rounded-2xl hover:shadow-2xl"
                  key={product_id}
                  id={cart_item_id}
                >
                  <div className="flex gap-4 items-center">
                    <img
                      src={image.url}
                      alt={image.url}
                      className="w-24 h-24 object-cover rounded-2xl"
                    />
                    <div className="flex flex-col gap-1">
                      <p className="p-1 text-beige/80 text-sm">{brand}</p>
                      <h1 className="font-bold text-sm sm:text-lg">{title}</h1>
                      <div className="text-beige/80">
                        Color:
                        <span className="ml-2 p-1 bg-black text-xs border text-beige">
                          {color}
                        </span>
                      </div>
                      <div className="mt-2 text-beige/80">
                        {price.currency}. {price.amount}
                        <span className="text-xs text-beige/80">each</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-center items-center gap-10">
                    <div className="bg-black flex items-center justify-between gap-5 py-2 px-5 rounded-lg border-beige/50 border mr-5">
                      <Minus size={20} />
                      <span>1</span>
                      <Plus size={20} />
                    </div>
                    <div className="flex flex-col items-end">
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
          <div className="min-w-[400px] bg-mehroon text-beige rounded-2xl border border-beige/50 flex flex-col justify-center items-center gap-3 p-5 font-lato-regular">
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

        <div className="w-full bg-mehroon text-beige rounded-2xl border border-beige/50 flex flex-col gap-3 p-2 font-lato-regular">
          <div className="flex justify-between items-center border-b border-beige/20 p-4">
            <h1 className="font-cinzel-bold text-2xl">ORDER SUMMARY</h1>
            <BookText />
          </div>
          <div className="flex flex-col gap-1 border-b border-beige/20 p-4 text-lg">
            <div className="flex justify-between items-center">
              <span className=" text-beige/60">Subtotal</span>
              <span className=" text-beige">Rs. 0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className=" text-beige/60">Shipping Fee</span>
              <span className=" text-beige">Rs. 0</span>
            </div>
          </div>
          <div className="flex flex-col gap-3 border-b border-beige/20 p-4 text-lg">
            <div className="flex justify-between items-center">
              <span className="text-beige/60">Total (PKR)</span>
              <div className="flex flex-col items-end">
                <span className="font-playfair-bold text-2xl sm:text-4xl">
                  RS.0
                </span>
                <span className="text-sm text-beige/60">
                  Includes all applicable taxes
                </span>
              </div>
            </div>
            <button className="w-full bg-beige text-mehroon font-playfair-bold font-extrabold py-2 text-lg sm:text-xl flex items-center justify-center gap-3">
              <span>PROCEED TO CHECKOUT</span>
              <MoveRight />
            </button>
          </div>
          <div className="flex justify-between border-b border-beige/20 p-4 text-lg">
            <div className="text-sm text-beige/60 flex items-center gap-1">
              <Car />
              <span> Fast Delivery (2-4 Days)</span>
            </div>
            <div className="text-sm text-beige/60 flex items-center gap-1">
              <Banknote />
              <span> Cash on Delivery</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
