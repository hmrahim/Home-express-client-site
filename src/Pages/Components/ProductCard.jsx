import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ img }) => {
  return (
    <div>
      <Link to={`/product-details/1`}>
        <div className="card card-compact  bg-base-100 shadow-xl relative">
          <figure>
            <img className=" transform-3d  " src={img} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">Shoes!</h2>

            <div className="card-actions ">
              <div className="flex items-center  gap-16">
                <h2 className="text-4xl font-bold flex ">
                  40
                  <sub className="text-xl gap-0 font-semibold ml-0 pt-2">
                    SR
                  </sub>
                </h2>
                <h2 className=" bg-primary px-2 py-1 rounded-bl-xl rounded-tr-xl text-white font-semibold absolute top-0  right-0 animate-pulse">
                  {" "}
                  -25% Off
                </h2>
              </div>

              <button className="btn btn-sm btn-primary">Buy Now</button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
