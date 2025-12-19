import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
const PaperPlainLoader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <DotLottieReact
        src="https://lottie.host/557c7b0b-78c5-40a0-845d-aaf63ae217eb/Wu0B8WwIUG.lottie"
        loop
        autoplay
      />
      <strong className="text-center text-2xl tracking-[10px] mb-10">Loading...</strong>
    </div>
  );
};

export default PaperPlainLoader;
