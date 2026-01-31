import React from "react";

const SpecialOfferTitle = ({ title = "Special Offer" }) => {
  return (
    <div className="w-full flex justify-center mb-10">
      <h2
        className="
        relative
        text-3xl md:text-4xl lg:text-4xl
        font-extrabold
        uppercase
        tracking-widest
        text-transparent
        bg-clip-text
        bg-gradient-to-r
        from-red-500 via-yellow-500 to-pink-500
        
        animate-pulse
        "
      >
        {title}

        {/* Glow Layer */}
        <span
          className="
          absolute inset-0
          blur-xl
          opacity-40
          
          -z-10
          "
        >
          {title}
        </span>
      </h2>
    </div>
  );
};

export default SpecialOfferTitle;
