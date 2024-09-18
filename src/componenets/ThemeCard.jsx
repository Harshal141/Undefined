import React from 'react';

const ThemeCard = ({ title, imageUrl, isActive, onClick }) => {
  return (
    // Toggle active cards by changing theme
    <div
      className={`relative grid h-[15rem] w-64 flex-col items-end justify-center overflow-hidden rounded-lg cursor-pointer ${
        isActive
          ? "border-4 border-blue-400 shadow-2xl"
          : "border border-transparent"
      }`}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-500 ease-[cubic-bezier(0.25, 1, 0.5, 1)] transform hover:scale-110"
        style={{ backgroundImage: `url(${imageUrl})` }}
      >
        <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
      </div>
      <div className="relative text-center p-4">
        <h2 className="mb-4 text-md font-medium text-white">{title}</h2>
      </div>
    </div>
  );
};

export default ThemeCard;
