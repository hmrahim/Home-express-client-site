import React from "react";

const SectionTitle = ({title}) => {
  return (
    <div>
      <hr className="w-1/5 mx-auto mb-2 h-1 bg-primary " />
      <h1 className="text-2xl text-center uppercase font-bold ">
       {title}
      </h1>
      <hr className="w-1/5 mx-auto mb-10 mt-2 h-1 bg-primary" />
    </div>
  );
};

export default SectionTitle;
