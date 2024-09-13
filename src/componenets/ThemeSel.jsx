import React from 'react'

export const ThemeSel = () => {
  return (
    <div className="w-full p-4 flex flex-col items-center">
      <p className="text-[#5E6282] text-base">THEME</p>

      <h1 className="text-4xl text-indigo-950">
        What Motivates You For This Journey
      </h1>

      <form className="max-w-sm mx-auto mt-10">
        <select
          id="countries"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
        >
          <option selected>Select a theme</option>
          <option value="US">United States</option>
          <option value="CA">Canada</option>
          <option value="FR">France</option>
          <option value="DE">Germany</option>
        </select>
      </form>

      <div className="w-full flex gap-10 flex-wrap justify-center mt-10">
        <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow ">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5 text-center">
            <h5 className="mb-2 text-2xl tracking-wider text-[#14183E]">
              sightseeing
            </h5>
          </div>
        </div>

        <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow ">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5 text-center">
            <h5 className="mb-2 text-2xl tracking-wider text-[#14183E]">
              sightseeing
            </h5>
          </div>
        </div>
        <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow ">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5 text-center">
            <h5 className="mb-2 text-2xl tracking-wider text-[#14183E]">
              sightseeing
            </h5>
          </div>
        </div>
        <div className="max-w-[300px] bg-white border border-gray-200 rounded-lg shadow ">
          <a href="#">
            <img
              className="rounded-t-lg"
              src="https://flowbite.com/docs/images/blog/image-1.jpg"
              alt=""
            />
          </a>
          <div className="p-5 text-center">
            <h5 className="mb-2 text-2xl tracking-wider text-[#14183E]">
              sightseeing
            </h5>
          </div>
        </div>
      </div>      
    </div>
  );
}
