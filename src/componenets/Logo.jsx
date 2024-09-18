import React from 'react';
import logo from "../assets/logo.png"

function Logo() {
  return (
    <div className="flex items-start">
      <img
        loading="lazy"
        src={logo}
        alt="Company Logo"
        className="object-contain z-10 shrink-0 self-end max-w-full aspect-[5.71] w-[250px]"
      />
    </div>
  );
}

export default Logo;