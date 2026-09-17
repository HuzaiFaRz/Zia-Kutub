import { NavLink } from "react-router";

import instagram_icon from "/src/assets/Images/instagram.png";
import facebook_icon from "/src/assets/Images/facebook.png";
import whatsapp_icon from "/src/assets/Images/whatsapp.png";

const Footer = () => {
  return (
    <footer className="w-full p-2 xl:p-3 z-10 bg-beige">
      <div className="bg-mehroon w-full h-auto px-6 lg:px-10 xl:px-16 rounded-t-4xl shadow-2xl py-6 gap-10">
        <div className="w-full flex flex-wrap justify-between items-center gap-5 sm:gap-0">
          <NavLink
            to={"/"}
            className="font-playfair-bold text-beige underline underline-offset-4 text-3xl lg:text-4xl cursor-pointer"
          >
            Zia Kutub
          </NavLink>

          <div className="relative text-beige w-full sm:w-auto  order-3 sm:order-2">
            <h1 className="font-lato-regular tracking-wide text-sm md:text-lg">
              © 2026 Zia-Kutub. All rights reserved.
            </h1>
          </div>

          <div className="flex gap-3 text-beige order-2 sm:order-3">
            <a
              href="https://www.instagram.com/ziakutubcenter?stkn=MXVzbzQybWJ5b3ZsYQ=="
              target="_blank"
            >
              <img src={instagram_icon} className="w-6 md:w-7.5" />
            </a>
            <a href="javascript:void(0)">
              <img src={facebook_icon} className="w-6 md:w-7.5" />
            </a>
            <a
              href="https://wa.me/+923083362107?text=Assalamualaikum! Can I Get More Info About your Store"
              target="_blank"
            >
              <img src={whatsapp_icon} className="w-6 md:w-7.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
