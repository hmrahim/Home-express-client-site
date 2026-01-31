import React from "react";
import "./initial.css"
const InitialSearchComponent = () => {
  return (
    <div className="relative w-full h-96 md:h-[28rem] lg:h-[32rem] bg-gradient-to-b from-base-200 via-gray-200 to-base-100 rounded-2xl overflow-hidden shadow-xl flex items-center justify-center">
      
      {/* Glow / light effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 opacity-30 animate-pulse blur-3xl"></div>
      
      {/* Decorative realistic shapes */}
      <div className="absolute bottom-0 w-full flex justify-around items-end">
        <div className="w-20 h-40 bg-yellow-400 rounded-t-full shadow-2xl transform rotate-[-10deg] animate-bounce-slow"></div>
        <div className="w-24 h-48 bg-orange-500 rounded-t-full shadow-2xl transform rotate-[10deg] animate-bounce-slow delay-200"></div>
        <div className="w-16 h-32 bg-red-500 rounded-t-full shadow-2xl transform rotate-[-5deg] animate-bounce-slow delay-400"></div>
      </div>

      {/* Central Text */}
      <h2 className="relative z-10 text-white text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-wider drop-shadow-lg text-center">
        Special Offers
      </h2>
    </div>
  );
};

export default InitialSearchComponent;
