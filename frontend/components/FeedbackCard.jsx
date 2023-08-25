import Image from "next/image";

const FeedbackCard = ({ content, title, name }) => (
  <div className="flex flex-col justify-between px-12 py-10  rounded-2xl max-w-[370px] md:mr-10 sm:mr-5 mr-0 my-5 bg-[#FFFFFF]">
    <p className="font-poppins font-normal text-[18px] text-blue-950 leading-[28px] my-4">
      {content}
    </p>

    <div className="flex flex-row">
      <div className="flex flex-col ml-4">
        <h4 className="font-poppins font-semibold text-blue-950 text-[20px] leading-[28px]">
          {name}
        </h4>
        <p className="font-poppins font-normal text-[#080E26] text-[16px] leading-[28px]">
          {title}
        </p>
      </div>
    </div>
  </div>
);

export default FeedbackCard;
