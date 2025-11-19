import React from "react";

const ToolTop = ({discount}) => {
  return (
    <div class="tooltip-container absolute right-0 top-0 ">
      <div class="relative">
        <div class="group peer relative z-10 p-1">
          <svg
            class="duration-500 group-hover:rotate-[360deg] group-hover:scale-110 w-2 h-2"
            height="30"
            width="30"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22c-5.518 0-10-4.482-10-10s4.482-10 10-10 10 4.482 10 10-4.482 10-10 10zm-1-16h2v6h-2zm0 8h2v2h-2z"></path>
          </svg>
        </div>
        <div class="absolute left-1/2 w-20 text-white  -translate-x-1/2 rounded bg-primary p-3 text-sm opacity-0 before:absolute before:-bottom-2 before:left-1/2 before:size-4 before:-translate-x-1/2 before:rotate-45 before:bg-primary peer-hover:bottom-[2rem] peer-hover:opacity-100 peer-hover:duration-500">
          <p class="text-center">{discount}% off</p>
        </div>
      </div>
    </div>
  );
};

export default ToolTop;
