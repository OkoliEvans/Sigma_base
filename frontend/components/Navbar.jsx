import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useRouter } from "next/router";

const Navbar = () => {
  let Anchors = [
    { name: "Home", address: "/index2" },
    { name: "Votes", address: "/votes" },
    { name: "About", address: "/about" },
    { name: "Docs", address: "/docs" },
  ];

  const router = useRouter();

  let [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-[#FFFFFF] fixed top-0 left-0 z-30 p-4">
      <div className="md:flex items-center justify-between text-[#010101] text-sm font-medium">
        <Link href="/">
          <h2 className="text-[#010da4] text-3xl">Sigma.</h2>
        </Link>
        <div
          onClick={() => setOpen(!open)}
          className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
        >
          {open ? <MdOutlineClose /> : <HiMenuAlt3 />}
        </div>

        <ul
          className={`md:flex md:items-center md:pb-0 pb-12 absolute md:static  md:z-auto z-[100] right-4  w-[70%] md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in-out ${
            open ? "top-20 bg-[#FFFFFF] rounded-2xl shadow-lg" : "top-[-490px]"
          }`}
        >
          {Anchors.map((anchor) => (
            <li
              key={anchor.name}
              className="lg:ml-[32px] md:ml-[2px] text-base md:my-0 my-7 mb-[10px]"
            >
              <Link
                href={anchor.address}
                className={`  border border-transparent ${
                  router.pathname == anchor.address
                    ? "text-[#010101] border !border-[#010101] rounded-2xl px-[24px] py-[8px]"
                    : ""
                } hover:border hover:text-[#F5F6FF] hover:bg-[#010101] rounded-2xl px-[24px] py-[8px] duration-500 ease-in-out`}
              >
                {anchor.name}
              </Link>
            </li>
          ))}
          <div className="md:ml-6 md:my-0 my-7 mb-[10px]">
            <ConnectButton />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
