import Link from "next/link";
import { footerLinks, socialMedia } from "../constants";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="flex justify-center items-center sm:py-16 py-6 flex-col rounded-lg bg-[#FFFFFF] sm:px-16 px-6">
      <div className="flex justify-center items-start md:flex-row flex-col mb-8 w-full">
        <div className="flex flex-1 flex-col justify-start mr-10">
          <h2 className="text-[#010da4] text-3xl">Sigma.</h2>
          <p className="font-normal text-blue-950 text-[18px] leading-[30.8px]mt-4 max-w-[312px]">
            Create Unforgettable Memories.
          </p>
        </div>

        <div className="flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10">
          {footerLinks.map((footerlink) => (
            <div
              key={footerlink.title}
              className="flex flex-col ss:my-0 my-4 min-w-[150px]"
            >
              <h4 className="font-poppins font-medium text-[18px] leading-[27px] text-blue-950">
                {footerlink.title}
              </h4>
              <ul className="list-none mt-4">
                {footerlink.links.map((link, index) => (
                  <Link href={link.link} key={link.name}>
                    <li
                      key={link.name}
                      className={`font-poppins font-normal text-[16px] leading-[24px] text-blue-950 
                      hover:text-secondary cursor-pointer ${
                        index !== footerlink.links.length - 1 ? "mb-4" : "mb-0"
                      }`}
                    >
                      {link.name}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full rounded-xl flex h-full justify-between items-center md:flex-row flex-col p-6 bg-[#080E26] ">
        <p className="font-poppins font-normal text-[18px] text-center text-[#FFFFFF] leading-[27px]">
          Copyright Ⓒ 2023 Metasquare. All Rights Reserved.
        </p>

        <div className="flex flex-row md:mt-0 mt-6">
          {socialMedia.map((media, index) => (
            <Image
              key={media.id}
              src={media.icon}
              alt={media.id}
              width={24}
              height={24}
              className={`object-contain cursor-pointer 
                  ${index !== socialMedia.length - 1 ? "mr-6" : "mr-0"}`}
              onClick={() => window.open(media.link)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
