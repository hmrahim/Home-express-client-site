import React from "react";
import "./DliveryAnimation.css";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const DeliveryAnimation = () => {
  return (
    <div>
      <div>
        <DotLottieReact
          src="https://lottie.host/f8cf5b59-6cd5-4b96-9d5a-4dac178d4097/XliYPmHBhO.lottie"
          loop
          autoplay
          className="w-32 mx-auto"
        />
        <h1 className="text-center font-bold tracking-[5px]">Delivery Complete</h1>
      </div>
      <DotLottieReact
        src="https://lottie.host/06121447-6c1a-42c5-90ae-cf7308c31b32/gb64DdDLgm.lottie"
        loop
        autoplay
      />
    </div>
  );
};

export default DeliveryAnimation;
