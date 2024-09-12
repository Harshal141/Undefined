import React from 'react';

function Logo() {
  return (
    <div className="flex flex-col">
      <div className="flex items-start">
        <img
          loading="lazy"
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/4c7f627344620c1e5b7132dda64fb8746c0368134b305593505dcf28af74a3f3?placeholderIfAbsent=true&apiKey=39abe5058c20493bb239609f2bdddfc1"
          alt="Company Logo"
          className="object-contain z-10 shrink-0 self-end mt-2 max-w-full aspect-[5.71] w-[166px] max-md:-mr-1"
        />
        <div className="flex shrink-0 self-start w-5 h-3 bg-orange-100 rounded-lg" />
      </div>
      <div className="flex gap-10 self-start mt-1">
        <div className="flex shrink-0 w-5 h-3 bg-orange-100 rounded-lg" />
        <div className="flex shrink-0 h-3 bg-orange-100 rounded-lg w-[84px]" />
      </div>
    </div>
  );
}

export default Logo;