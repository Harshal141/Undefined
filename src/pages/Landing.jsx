import React from 'react';
import Logo from '../componenets/Logo';
import Header from '../componenets/Header';
import HeroSection from '../componenets/Herosection';

function TravelApp() {
  return (
    <main className="overflow-hidden w-full max-w-[1280px] m-auto">
      <div className="flex flex-wrap gap-5 justify-between w-full max-md:mr-2.5 max-md:max-w-full p-5">
        <Logo />
        <div className="flex gap-10 f-grow align-middle text-xl text-gray-800">
          <div>Destinations</div>
          <div>Hotels</div>
        </div>
      </div>
      <div className="flex gap-5 max-md:flex-col">
        <div className="flex flex-col md:w-1/2 w-full p-8 h-fit ">
          <div className="flex flex-col w-full max-md:mt-10 max-md:max-w-full">
            <HeroSection />
          </div>
        </div>
        <div className="flex flex-col flex-grow w-1/2 hidden md:block overflow-visible">
          <Header />
        </div>
      </div>
    </main>
  );
}

export default TravelApp;