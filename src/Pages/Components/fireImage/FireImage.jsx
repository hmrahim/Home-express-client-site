import React from "react";
import "./fire.css";

const FireImage = ({ src }) => {
  return (
    <div className="fire-container">
      <img src={src} className="fire-img" />

      {/* Fire */}
      <div className="real-fire">
        <div className="flame"></div>
        <div className="flame"></div>
        <div className="flame"></div>
      </div>
    </div>
  );
};

export default FireImage;
