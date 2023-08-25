import React from "react";

const Works = () => (
  <section className="flex-1 flex flex-col sm:flex-row justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
    <div className="flex-1 flex justify-center items-center md:mr-10 mr-0 md:mt-0 mt-10 relative">
      <div className="absolute md:visible invisible">
        {/* <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/H7oF8cvAY8M?start=3"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe> */}
      </div>
    </div>

    <div className="md:ml-5 flex-1 flex justify-center items-start flex-col">
      <h2 className="font-rubik font-semibold xs:text-[48px] text-[40px] text-blue-950 xs:leading-[76.8px] leading-[66.8px] w-full">
        How Does <br className="sm:block hidden" /> It Work?
      </h2>
      <p className="font-rubik font-normal text-[#080E26] text-[18px] leading-[30.8px]max-w-[470px] mt-5">
        This platform leverages blockchain technology to transform the
        traditional ticketing industry. It operates on a peer-to-peer network
        where event organizers can directly sell tickets to customers,
        eliminating the need for intermediaries.
      </p>

      <p className="font-poppins font-normal text-[#080E26] text-[18px] leading-[30.8px] max-w-[470px] mt-5">
        It also reduces ticket scalping, as the platform can enforce fair
        pricing and prevent excessive reselling.
      </p>
    </div>
  </section>
);

export default Works;
