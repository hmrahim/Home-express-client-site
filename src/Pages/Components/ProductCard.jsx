import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { SaudiRiyal } from "lucide-react";

const ProductCard = ({ product, refetch }) => {
  const discount = (Number(product?.price) * product?.discount) / 100;
  const discountPrice = Number(product?.price) - discount;
  const [int, dec] = Number(discountPrice).toFixed(2).split(".");
const [p_int,p_dec] = Number(product?.price).toFixed(2).split(".")
  return (
    <div>
      <div className=" bg-base-100 hover:shadow-xl shadow-red-700 relative p-2 duration-300 rounded-xl">
        <figure className="overflow-hidden h-44 flex justify-center items-center">
          <img
            className=" mx-5 h-full image-full hover:scale-150 transition-all"
            src={product?.image}
            alt="Shoes"
          />
        </figure>

        <div className="">
          <h2 className="card-title">{product?.name}</h2>

          <div className="flex flex-col w-full">
            <div className="flex items-center  ">
              <div className="flex justify-between items-end w-full">
                {product?.discount ? (
                  <h2 className="text-2xl  flex items-center text-gray-600">
                    <sub>
                      <SaudiRiyal size={20} />
                    </sub>
                    <del className="flex"> 
                     <p>
                       {p_int} 
                      </p>  {
                      p_dec >0 && <p className="text-[12px] font-normal">.{p_dec}</p>
                    }
                      </del>
                  </h2>
                ) : (
                  ""
                )}
                {product?.discount ? (
                  <h2 className=" flex items-center">
                    <SaudiRiyal size={28} />
                    <p className="text-4xl font-bold">{int}</p>
                    {
                      dec >0 && <p className="text-sm font-normal">.{dec}</p>
                    }
                    
                  </h2>
                ) : (
                  <h2 className="text-4xl font-bold flex items-center">
                   <sub>
                      <SaudiRiyal size={20} />
                    </sub>
                    <p className="flex"> 
                     <p>
                       {p_int} 
                      </p>  {
                      p_dec >0 && <p className="text-[12px] font-normal">.{p_dec}</p>
                    }
                      </p>
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

            <Link
              to={`/product-details/${product?._id}`}
              className="btn btn-md btn-primary w-full mt-2"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
