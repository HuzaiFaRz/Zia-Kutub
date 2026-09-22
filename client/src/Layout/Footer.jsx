import { NavLink } from "react-router-dom";

import instagram_icon from "/src/assets/Images/instagram.png";
import facebook_icon from "/src/assets/Images/facebook.png";
import whatsapp_icon from "/src/assets/Images/whatsapp.png";
import { otherPagesLinks1, otherPagesLinks2 } from "./Navbar";
import { Mail, MapPin, Phone, Timer } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full h-auto p-2 xl:p-3 z-1 bg-beige">
      <div className="bg-mehroon text-beige font-lato-regular w-full h-auto px-6 lg:px-10 xl:px-16 rounded-t-4xl shadow-2xl py-5 flex flex-col gap-8">
        <div className="w-full flex flex-wrap justify-between items-center">
          <NavLink
            to={"/"}
            className="font-playfair-bold text-beige text-xl sm:text-3xl lg:text-4xl cursor-pointer"
          >
            Zia Kutub
            <div className="w-full h-px bg-linear-to-r from-transparent via-beige to-transparent mt-2"></div>
          </NavLink>
          <div className="flex justify-center items-center gap-4 text-beige order-2 sm:order-3">
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

        <div className="w-full flex flex-wrap justify-between items-cemter gap-15">
          <div className="hidden md:flex flex-col gap-4 w-xs">
            <h1 className="font-cinzel-bold text-2xl font-extrabold text-beige">
              Get in Touch
            </h1>
            {otherPagesLinks1.map((link, ind) => {
              const { linkName, linkURL } = link;
              return (
                <NavLink
                  key={ind}
                  to={linkURL}
                  className="footerLink relative overflow-hidden border-b text-beige/80 border-beige/50 py-3 px-3 tracking-wider text-sm lg:text-lg"
                >
                  {linkName}
                </NavLink>
              );
            })}
          </div>

          <div className="flex flex-col gap-4 w-xs text-beige">
            <h1 className="font-cinzel-bold text-2xl">
              Legal & Support
            </h1>
            {otherPagesLinks2.map((link, ind) => {
              const { linkName, linkURL } = link;
              return (
                <NavLink
                  key={ind}
                  to={linkURL}
                  className="footerLink relative overflow-hidden border-b border-beige/50 text-beige/80 py-3 px-3 tracking-wider text-sm lg:text-lg font-lato-regular"
                >
                  {linkName}
                </NavLink>
              );
            })}
          </div>

          <div className="flex flex-col items-start gap-4 w-xs text-beige/50">
            <h1 className="font-cinzel-bold text-2xl font-extrabold text-beige">
              Reach Us
            </h1>
            <div className="flex items-center justify-center gap-3">
              <Phone />
              <a
                href="https://wa.me/+923083362107?text=Assalamualaikum! Can I Get More Info About your Store"
                target="_blank"
              >
                +92 308 3362107
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Mail />
              <a
                href="https://wa.me/+923083362107?text=Assalamualaikum!"
                target="_blank"
              >
                ziakutubcenter@gmail.com
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <MapPin />
              <a href="https://goo.gl/maps/Dz5em4obPG3Ju8ET9" target="_blank">
                Shaheed Masjid Kharadar Karachi, Pakistan.
              </a>
            </div>
            <div className="flex items-center justify-center gap-3">
              <Timer />
              <div className="flex flex-col gap-1">
                <span>Mon to Sat 11:30 AM Till 10:30 PM</span>
                <span>Sun 01:30 PM Till 06:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end w-full lg:w-auto items-end">
          <h1 className="font-lato-regular tracking-wide text-sm text-beige/70 text-end">
            © 2026 Zia-Kutub. All rights reserved.
          </h1>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
