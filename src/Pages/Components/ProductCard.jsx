import React from "react";
import { Link } from "react-router-dom";
import "./Product.css";
import { SaudiRiyal } from "lucide-react";
import { Helmet } from "react-helmet-async";

const ProductCard = ({ product, refetch }) => {
  const discount = (Number(product?.price) * product?.discount) / 100;
  const discountPrice = Number(product?.price) - discount;
  const [int, dec] = Number(discountPrice).toFixed(2).split(".");
  const [p_int, p_dec] = Number(product?.price).toFixed(2).split(".");

  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }

  return (
    <>
      <Helmet>
     
        <meta
          name="description"
          content={`Buy ${product?.name} at best price`}
        />

        <link
          rel="canonical"
          href={`https://moom24.com/product-details/${product?._id}`}
        />
      </Helmet>

      <div className="rounded-xl p-[1px] bg-gradient-to-r from-green-500 to-emerald-600">
        <div className=" h-[320px] relative bg-base-100 hover:shadow-2xl  relative p-2 duration-300 rounded-xl border-2">
          <figure className="overflow-hidden rounded-xl flex justify-center items-center">
            <img
              className="max-h-[180px] min-h-[180px] w-[180px] mx-5 h-full image-full hover:scale-150 transition-all"
              src={product?.image}
              alt={product?.name}
              loading="lazy" 
            />
          </figure>

          <div className=" ">
            <h1 className=" capitalize text-center text-[16px] md:text-lg ">
              {truncate(product?.name, 20)}
            </h1>

            <div className="flex flex-col w-full">
              <div className="flex items-center  ">
                <div className="flex justify-between items-end w-full">
                  {product?.discount ? (
                    <h2 className="text-2xl  flex items-center text-gray-600">
                      <sub>
                        <SaudiRiyal size={20} />
                      </sub>
                      <del className="flex">
                        <p>{p_int}</p>{" "}
                        {p_dec > 0 && (
                          <p className="text-[12px] font-normal">.{p_dec}</p>
                        )}
                      </del>
                    </h2>
                  ) : (
                    ""
                  )}
                  {product?.discount ? (
                    <h2 className=" flex items-center">
                      <SaudiRiyal size={28} />
                      <p className="text-4xl font-bold">{int}</p>
                      {dec > 0 && <p className="text-sm font-normal">.{dec}</p>}
                    </h2>
                  ) : (
                    <h2 className="text-4xl font-bold flex items-center">
                      <sub>
                        <SaudiRiyal size={20} />
                      </sub>
                      <p className="flex">
                        <p>{p_int}</p>{" "}
                        {p_dec > 0 && (
                          <p className="text-[12px] font-normal">.{p_dec}</p>
                        )}
                      </p>
                    </h2>
                  )}
                </div>

                {product?.discount ? (
                  <h2 className=" bg-gradient-to-r from-green-500 to-emerald-600 px-2 py-1 rounded-bl-xl rounded-tr-xl text-white font-semibold absolute top-0  right-0 animate-pulse">
                    {" "}
                    {product?.discount}% Off
                  </h2>
                ) : (
                  ""
                )}
              </div>

              <Link
                to={`/product-details/${product?._id}`}
                className="absolute bottom-0 left-0 right-0 btn btn-md bg-gradient-to-r from-green-500 to-emerald-600 text-white  w-full mt-2 rounded-b-xl rounded-none"
              >
                Buy Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
