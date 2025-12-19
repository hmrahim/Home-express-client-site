import React, { useRef, useState } from "react";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


const RiderSearchingComponent = () => {
 
    const [query, setQuery] = useState("");
  return (
    <div>

 
      <DotLottieReact
      src="https://lottie.host/643f1df9-de2e-4fc3-b156-69dbae6e509e/SzF4io4kwj.lottie"
      loop
      autoplay
    />
    <h1 className="uppercase text-center font-bold tracking-[8px] text-2xl  pb-5">Searching orders</h1>
  
    </div>
  );
};

export default RiderSearchingComponent;
