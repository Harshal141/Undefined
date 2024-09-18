import React from 'react';
import Logo from './Logo';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between w-full max-md:mr-2.5 max-md:max-w-full p-5">
      <Link to="/">
        <Logo />
      </Link>
      <div className="flex gap-10 f-grow align-middle text-xl text-gray-800">
        <Link to="/">Home</Link>
        <Link to="/build">Builder</Link>
      </div>
    </div>
  );
}
