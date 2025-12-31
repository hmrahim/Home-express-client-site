import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const PreBackButton = ({title}) => {
 let navigate = useNavigate();
 
  return (
    <div className="flex justify-between mx-5">
      <Link onClick={()=> navigate(-1)}  className="btn text-base-100 bg-gradient-to-l from-gray-600 to-gray-800 btn-sm">
        <FaArrowLeft />
      </Link>
      <h1 className="text-2xl font-bold text-primary text-center pb-2">
        {title}
      </h1>
      <Link onClick={()=> navigate(1)}   className="btn text-base-100 bg-gradient-to-l from-gray-600 to-gray-800 btn-sm">
        <FaArrowRight />
      </Link>
    </div>
  );
};

export default PreBackButton;
