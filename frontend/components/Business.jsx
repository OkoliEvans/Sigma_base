import React from "react";
import { business } from "../constants";
import Image from "next/image";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Link from "next/link";

const Business = () => {
  return (
    <div className=" w-full shadow-lg rounded-2xl relative flex-col justify-center items-center bg-[#FFFFFF] py-12 md:px-16 px-4 mb-12">
      <div className="flex flex-col justify-center items-center w-[100%]">
        <h2 className="font-semibold text-[#080E26] text-4xl mb-5">
          Create and mint your Election Tickets
        </h2>
        <p className="relative font-light text-blue-950 text-2xl mb-8">
          Here are easy steps to create and mint your Event Tickets on Sigma
        </p>
      </div>
      <div className="flex md:flex-row flex-col justify-start items-center font-medium w-[100%]">
        {business?.map((bus) => {
          return (
            <div
              key={bus.id}
              className={`w-2/3 md:p-4 p-0 mb-8 ${bus.id == 1 ? "mt-8" : ""}`}
            >
              <div className="mb-2">
                <Image
                  src={bus.imageurl}
                  alt="business"
                  width={40}
                  height={40}
                />
              </div>
              <div className="">
                <h2 className="font-semibold text-[#080E26] text-xl mb-2">
                  {bus.name}
                </h2>
                <p className="relative text-blue-950 leading-7">
                  {bus.description}
                </p>
              </div>

              <Link href="/docs">
                <div className="flex flex-row items-center justify-start font-medium text-[#080E26] mt-3">
                  <p>Learn </p>
                  <MdOutlineKeyboardArrowRight />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Business;
