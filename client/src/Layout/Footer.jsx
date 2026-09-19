import { NavLink } from "react-router";

import instagram_icon from "/src/assets/Images/instagram.png";
import facebook_icon from "/src/assets/Images/facebook.png";
import whatsapp_icon from "/src/assets/Images/whatsapp.png";
import { otherPagesLinks } from "./Navbar";

const Footer = () => {
  return (
    <footer className="w-full h-auto p-2 xl:p-3 z-10 bg-beige">
      <div className="bg-mehroon w-full h-auto px-6 lg:px-10 xl:px-16 rounded-t-4xl shadow-2xl py-5 flex flex-col gap-8">
        <div className="w-full flex flex-wrap justify-between items-center">
          <NavLink
            to={"/"}
            className="font-playfair-bold text-beige underline underline-offset-4 text-xl sm:text-3xl lg:text-4xl cursor-pointer"
          >
            Zia Kutub
          </NavLink>
          <div className="flex justify-center items-center gap-5 text-beige order-2 sm:order-3">
            <a
              href="https://www.instagram.com/ziakutubcenter?stkn=MXVzbzQybWJ5b3ZsYQ=="
              target="_blank"
            >
              <img src={instagram_icon} className="w-6 sm:w-7" />
            </a>
            <a href="javascript:void(0)">
              <img src={facebook_icon} className="w-6 sm:w-7" />
            </a>
            <a
              href="https://wa.me/+923083362107?text=Assalamualaikum! Can I Get More Info About your Store"
              target="_blank"
            >
              <img src={whatsapp_icon} className="w-6 sm:w-7" />
            </a>
          </div>
        </div>

        <div className="w-full flex flex-wrap justify-between items-cemter">
          <div className="hidden md:flex gap-4">
            {otherPagesLinks.map((link, ind) => {
              const { linkName, linkURL } = link;
              return (
                <NavLink
                  key={ind}
                  to={linkURL}
                  className="bg-brown text-beige font-playfair-regular text-sm py-1 px-3 rounded-3xl tracking-wider"
                >
                  {linkName}
                </NavLink>
              );
            })}
          </div>

          <h1 className="font-lato-regular tracking-wide text-xs md:text-sm text-beige/70 text-end w-full sm:w-auto">
            © 2026 Zia-Kutub. All rights reserved.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
