import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ product, refetch }) => {
  const discoun = (Number(product?.price) * product?.discount) / 100;
  const discountPrice = Math.round(Number(product?.price) - discoun);

  return (
    <div>
      <div className=" bg-base-100 shadow-xl relative p-5 rounded-xl">
        <figure>
          <img className=" mx-5 image-full" src={product?.image} alt="Shoes" />
        </figure>

        <div className="">
          <h2 className="card-title">{product?.name}</h2>

          <div className="flex flex-col w-full">
            <div className="flex items-center  ">
              <div className="flex justify-between items-end w-full">
                {product?.discount ? (
                  <h2 className="text-2xl font-semibold flex items-center">
                    <del> {product?.price} </del>
                    <sub>SR</sub>
                  </h2>
                ) : (
                  ""
                )}
                {product?.discount ? (
                  <h2 className="text-5xl font-bold flex ">
                    {discountPrice}
                    <sub className="text-xl font-semibold  pt-2">SR</sub>
                  </h2>
                ) : (
                  <h2 className="text-5xl font-bold flex ">
                    {product?.price}
                    <sub className="text-xl font-semibold  pt-2">SR</sub>
                  </h2>
                )}
              </div>

              {product?.discount ? (
                <h2 className=" bg-primary px-2 py-1 rounded-bl-xl rounded-tr-xl text-white font-semibold absolute top-0  right-0 animate-pulse">
                  {" "}
                  {product?.discount}% Off
                </h2>
              ) : (
                ""
              )}
            </div>

            <Link to={`/product-details/${product?._id}`} className="btn btn-md btn-primary w-full mt-2">Buy Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
