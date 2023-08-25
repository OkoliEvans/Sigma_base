import { feedback } from "../constants";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import FeedbackCard from "./FeedbackCard";

const Testimonials = () => (
  <div className="sm:py-16 py-6 flex justify-center items-center flex-col relative">
    <div className="w-full flex md:flex-row flex-col justify-between items-center sm:mb-16 mb-6 relative z-[1]">
      <h2 className="font-poppins font-semibold xs:text-[48px] text-[40px] text-blue-950 xs:leading-[76.8px] leading-[66.8px] w-full">
        What People are <br className="sm:block hidden" /> saying about us
      </h2>

      <div className="w-full md:mt-0 mt-6">
        <p className="font-poppins font-normal text-blue-950 text-[18px] leading-[30.8px] max-w-[450px] text-left">
          Join our community of satisfied users today and experience the peace
          of mind that comes with having Decentralized Ticketing Experience.
        </p>
      </div>
    </div>

    <div className="flex flex-col md:flex-row flex-nowrap sm:justify-start justify-center w-full feedback-container relative z-[1]">
      {feedback?.map((card) => (
        <FeedbackCard key={card.id} {...card} />
      ))}
    </div>
  </div>
);

export default Testimonials;
