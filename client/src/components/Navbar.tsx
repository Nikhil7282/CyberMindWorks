import Tabs from "./Tabs";
import Logo from "../assets/Logo.svg";
import { useGlobal } from "../context/globalContext";
import { useState } from "react";

const Navbar = () => {
  const { openModel, setOpenModel } = useGlobal();

  const [openMenu, setOpenMenu] = useState(false);

  const links = ["Home", "Find Jobs", "Find Talents", "About Us", "Testimony"];
  return (
    <header
      className={`fixed top-2 z-10 w-full md:top-6 transition-opacity duration-300`}
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 backdrop-blur-0">
        <div className="relative flex h-14 items-center justify-between gap-5 rounded-2xl bg-white/90 px-3 shadow-lg shadow-black/[0.03] backdrop-blur-sm before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(theme(colors.gray.100),theme(colors.gray.200))_border-box] before:[mask-composite:exclude_!important] before:[mask:linear-gradient(white_0_0)_padding-box,_linear-gradient(white_0_0)]">
          <div className="flex items-center">
            <img src={Logo} alt="logo" />
          </div>
          <div className="hidden md:flex">
            <ul className="flex gap-5 justify-between items-center">
              {links.map((link) => (
                <Tabs name={link} key={link} />
              ))}
              <button
                type="button"
                className="text-white bg-gradient-to-r from-[#A128FF] to-[#6100AD] hover:bg-purple-800 focus:outline-none  font-medium rounded-md text-sm px-2 py-[6px] text-center dark:bg-purple-600 dark:hover:bg-purple-700"
                onClick={() => setOpenModel(!openModel)}
              >
                Create Jobs
              </button>
            </ul>
          </div>
          <button
            className="md:hidden focus:outline-none"
            onClick={() => setOpenMenu(!openMenu)}
          >
            <svg
              className="w-6 h-6 text-gray-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {openMenu && (
        <div className="md:hidden flex flex-1 flex-col items-center bg-white shadow-lg rounded-b-lg py-4">
          <ul className="flex flex-col gap-5 justify-center items-center w-full">
            {links.map((link) => (
              <Tabs name={link} key={link} />
            ))}
            <button
              type="button"
              className="text-white bg-gradient-to-r from-[#A128FF] to-[#6100AD] hover:bg-purple-800 focus:outline-none font-medium rounded-md text-sm px-2 py-[6px] text-center dark:bg-purple-600 dark:hover:bg-purple-700"
              onClick={() => setOpenModel(!openModel)}
            >
              Create Jobs
            </button>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
