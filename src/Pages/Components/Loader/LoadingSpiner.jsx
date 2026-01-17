import React from "react";
import "./loader.css";

const LoadingSpiner = () => {
  return (
    <div className="w-full flex justify-center flex-col items-center">
      {" "}
      <div className="loader "></div>
      <h1 className="mt-2 font-bold text-2xl">Loading...</h1>
    </div>
  );
};

export default LoadingSpiner;
