import Business from "@/components/Business";
import Hero from "@/components/Hero";
import ListedEvent from "@/components/ListedEvent";
import Testimonials from "@/components/Testimonials";
import Works from "@/components/Works";

const Home = () => {
  return (
    <div className="bg-[#F1F5F6] w-full">
      <div className="bg-[#F1F5F6] flex justify-center items-start">
        <div className="xl:max-w-[1280px] w-full">
          <Hero />
        </div>
      </div>

      <div className="flex bg-[#F1F5F6] sm:px-16 px-6 justify-center items-start">
        <div className="xl:max-w-[1280px] w-full">
          <Business />
          <ListedEvent />
          <Works />
          <Testimonials />
        </div>
      </div>
    </div>
  );
};

export default Home;
