import React from "react";
import Banner from "../../Components/Banner";
import Featured from "./Featured";
import ElectricItems from "./ElectricItems";
import PlumbingItems from "./PlumbingItems";
import PaintingItems from "./PaintingItems";

const Home = () => {
  return (
    <div className="">
      <Banner />
      <div className="flex justify-center items-center mt-5 px-5">
        <label className="input flex items-center gap-3 border-2 border-primary md:w-1/2 w-full    bg-gray-300">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input type="search" required placeholder="Search Products" className="w-full h-full bg-gray-300 text-white"/>
        </label>
      </div>
      <Featured />
      <ElectricItems />
      <PlumbingItems />
      <PaintingItems />
    </div>
  );
};

export default Home;
