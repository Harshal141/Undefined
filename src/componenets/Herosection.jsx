import React from 'react';
import { useNavigate } from 'react-router-dom';
import Pause from '../assets/images/pb.png'

function HeroSection() {
  
  const navigate = useNavigate();
  const goToBuild = () => {
    navigate("/build");
  };

  return (
    <section className="flex flex-col items-start pl-1.5 mt-12 w-full font-bold max-md:mt-10 max-md:max-w-full">
      <h1 className="text-lg text-red-400 uppercase max-md:max-w-full">
        Best Destinations around the world
      </h1>
      <p className="self-stretch mt-6 text-6xl tracking-tighter text-indigo-950">
        Travel, enjoy <br /> and live a new <br /> and full life
      </p>
      <p className="mt-6 text-base font-medium leading-8 text-gray-500">
        Plan your perfect trip with our AI-powered itinerary planner—tailored to
        your preferences, budget, and travel goals. Effortlessly create
        personalized travel plans and discover new experiences.
      </p>
      <div className="flex flex-wrap gap-5 justify-between mt-11 max-w-full font-medium w-[504px] max-md:mt-10">
        <button
          onClick={goToBuild}
          className="px-9 py-6 text-2xl text-center text-white bg-amber-500 rounded-xl shadow-2xl max-md:px-5"
        >
          Plan Iternary
        </button>
        <div className="flex my-auto text-2xl text-zinc-500">
          <img
            loading="lazy"
            src={Pause}
            alt=""
            className="object-contain shrink-0 aspect-square w-[69px] mb-[-20px]"
          />
          <span className="my-auto basis-auto">Find Inspiration</span>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;