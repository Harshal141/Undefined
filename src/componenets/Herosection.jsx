import React from 'react';

function HeroSection() {
  return (
    <section className="flex flex-col items-start pl-1.5 mt-16 w-full font-bold max-md:mt-10 max-md:max-w-full">
      <h1 className="text-lg text-red-400 uppercase max-md:max-w-full">
        Best Destinations around the world
      </h1>
      <p className="self-stretch mt-6 text-6xl tracking-tighter text-indigo-950">
        Travel, enjoy <br /> and live a new <br /> and full life
      </p>
      <p className="mt-6 text-base font-medium leading-8 text-gray-500">
        Built Wicket longer admire do barton vanity itself do in it. Preferred
        to sportsmen it engrossed listening. Park gate sell they west hard for
        the.
      </p>
      <div className="flex flex-wrap gap-5 justify-between mt-11 max-w-full font-medium w-[504px] max-md:mt-10">
        <button className="px-9 py-6 text-2xl text-center text-white bg-amber-500 rounded-xl shadow-2xl max-md:px-5">
          Plan Iternary
        </button>
        <div className="flex my-auto text-2xl text-zinc-500">
          <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/914ec729ab347f1ca0b1e7099aec998580b0401b526b0f5895659abd6e6311f6?placeholderIfAbsent=true&apiKey=39abe5058c20493bb239609f2bdddfc1"
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