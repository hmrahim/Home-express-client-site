import React from "react";
import "./loader.css";

const Loader = ({display}) => {
  return (
    <div className={`text-center mt-10 ${display}`}>
      <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-yellow-500 mx-auto"></div>
      <h2 className="text-zinc-900  mt-4">Loading...</h2>
      <p className="text-zinc-600 dark:text-zinc-400">
        Your adventure is about to begin
      </p>
    </div>
  );
};

export default Loader;
