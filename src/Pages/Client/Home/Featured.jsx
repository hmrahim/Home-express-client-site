import React from "react";
import ProductCard from "../../Components/ProductCard";
import product2 from "../../../assets/cat-2.jpg"
import product3 from "../../../assets/cat-3.jpg"
import product4 from "../../../assets/cat-4.jpg"
import product5 from "../../../assets/cat-5.jpg"
import product6 from "../../../assets/cat-6.jpg"
import product7 from "../../../assets/cat-7.jpg"



const Featured = () => {
  return (
    <div className="w-11/12 mx-auto my-20 flex flex-col md:flex-row gap-4 text-center bg-white">
      <div className="md:w-1/5 w-full shadow-md  bg-slate-300 rounded-md ">
        <h1 className="text-2xl font-semibold uppercase  mt-5 mb-3">
          Category
        </h1>
        <hr />
        <div>
          <ul className="flex flex-col justify-start items-start gap-2 mx-2 my-2">
            <li className="p-1 bg-primary text-white  cursor-pointer w-full  rounded-md ">
              <a className="" href="">
                Electric
              </a>
            </li>
            <li className="p-1 bg-primary text-white  cursor-pointer w-full  rounded-md ">
              <a className="" href="">
                Plumbing
              </a>
            </li>
            <li className="p-1 bg-primary text-white  cursor-pointer w-full  rounded-md ">
              <a className="" href="">
                Painting
              </a>
            </li>
           
          </ul>
        </div>
      </div>
      <div className="md:w-4/5 w-full shadow-md  bg-slate-300 rounded-md px-4">
        <h1 className="text-2xl font-semibold uppercase mt-5 mb-3">
          Featured Product
        </h1>
        <hr />
        <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 my-2 justify-items-center ">
          <ProductCard img={product2} title="" desc="" price="" />
          <ProductCard img={product3} title="" desc="" price="" />
          <ProductCard img={product4} title="" desc="" price="" />
          <ProductCard img={product5} title="" desc="" price="" />
          <ProductCard img={product6} title="" desc="" price="" />
          <ProductCard img={product7} title="" desc="" price="" />
          
        </div>
      </div>
    </div>
  );
};

export default Featured;
