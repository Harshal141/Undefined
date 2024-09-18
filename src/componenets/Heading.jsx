import React from 'react'

export const Heading = ({header, slogan}) => {
  return (
    <div className="w-full p-4 flex flex-col items-center">
      <p className="text-[#5E6282] text-base">{header}</p>

      <h1 className="text-4xl text-indigo-950">
        {slogan}
      </h1>
    </div>
  );
};
