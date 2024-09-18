import React from 'react';
import Her from '../assets/images/heroimg.png';

function Header() {
  return (
    <div className="p-5 w-full h-full flex">
      <img src={Her} className="m-auto" />
    </div>
  );
}

export default Header;