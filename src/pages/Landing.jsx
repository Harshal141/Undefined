import React from 'react';
import Header from '../componenets/Header';
import HeroSection from '../componenets/Herosection';
import { Navbar } from '../componenets/Navbar';

function TravelApp() {
  return (
    <main className="overflow-hidden w-full max-w-[1280px] m-auto">
      <Navbar />
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