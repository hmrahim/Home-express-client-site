import React from "react";
import { CiLocationOn } from "react-icons/ci";

const OpenMap = ({ location }) => {
  const url = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}&travelmode=driving`;
  console.log(url);
  const openMap = () => {
    window.open(url, "_blank");
  };
  return (
    <div>
      <button className="btn btn-sm btn-primary mt-4" onClick={openMap}>
        Open Location{" "}
        <span className="text-2xl font-bold text-white ">
          {" "}
          <CiLocationOn />
        </span>
      </button>
    </div>
  );
};

export default OpenMap;
