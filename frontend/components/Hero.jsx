import React from "react";

import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <section className="flex md:flex-row flex-col sm:py-16 py-6 sm-px-16 px-6 gap-16">
      <div className="flex flex-1 items-start justify-center flex-col xl:px-0 sm:px-16 px-6">
        <h1 className="font-rubik font-semibold sm:text-[50px] text-[42px] text-[#080E26] sm:leading-[75px] leading-[55px] w-full">
          Get Your Tickets Now to the Best Events in Town
        </h1>
        <p className="font-poppins font-normal text-[#666666] text-xl leading-[30.8px] max-w-[470px] mt-5">
          Join the Crowd and Experience Unforgettable Moments; get NFT ticket
          for event and another NFT as proof of attendance.
        </p>
        <div className="flex mt-4 gap-4">
          <div className="bg-[#080E26] text-white flex items-center justify-center rounded-lg w-36 h-12 p-4 shadow-lg cursor-pointer">
            <Link href="getstarted">Get started</Link>
          </div>
          <div className="bg-[#FFFFFF] hover:bg-[#212529] border hover:border-none border-[#080E26] text-[#080E26] flex items-center justify-center rounded-lg w-36 h-12 p-4 shadow-lg cursor-pointer hover:text-[#FFFFFF]">
            <Link href="create">Create election</Link>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center md:my-0 my-10 relative">
        <Image
          src="/undraw_voting_pic.svg"
          alt="hero_section"
          width={530}
          height={630}
        />
      </div>
    </section>
  );
};

export default Hero;
