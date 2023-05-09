import React from "react";
import Linkedin from "./Linkedin";
import Github from "./Github";
const avatar =
  "https://drive.google.com/uc?export=download&id=195dq_KdbmkLrYRlfVVICuVKwuYtzf-Ig";
const Footer = () => {
  return (
    <div
      className={` z-60 w-full p-2 bg-light bg-opacity-80 mt-4 flex flex-col lg:flex-row justify-between items-center px-4  z-60 rounded-2xl `}
    >
      <div className="flex items-center space-x-6">
        <img
          src={avatar}
          alt="Agustina Di Nucci avatar"
          className="w-12 h-12 rounded-full"
        />
        <div>
          <p className={`lg:text-xl text-md font-semibold text-center`}>
            Agustina Di Nucci
          </p>
          <p className={` lg:text-xl text-md font-semibold text-center`}>
            - Full Stack developer -
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Linkedin />
        <Github />
      </div>
    </div>
  );
};

export default Footer;
