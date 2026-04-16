import React from "react";
import { Link } from "react-router-dom";
import { SaudiRiyal, Heart, Star } from "lucide-react";
import { Helmet } from "react-helmet-async";

const SliderCard = ({ product, refetch }) => {
  const discount = (Number(product?.price) * product?.discount) / 100;
  const discountPrice = Number(product?.price) - discount;
  const [int, dec] = Number(discountPrice).toFixed(2).split(".");
  const [p_int, p_dec] = Number(product?.price).toFixed(2).split(".");

  function truncate(str, maxlength) {
    return str.length > maxlength ? str.slice(0, maxlength - 1) + "…" : str;
  }

  return (
    <>
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        @keyframes bounce-slow {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-8px); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        @keyframes pulse-glow {
          0% { box-shadow: 0 0 5px rgba(16,185,129,0.3); }
          50% { box-shadow: 0 0 15px rgba(16,185,129,0.6); }
          100% { box-shadow: 0 0 5px rgba(16,185,129,0.3); }
        }
        .animate-shimmer { animation: shimmer 2s infinite linear; }
        .animate-float { animation: float 2s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 2s infinite; }
        .animate-wiggle { animation: wiggle 0.4s ease-in-out; }
        
        .gradient-text {
          background: linear-gradient(135deg, #10b981, #059669);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      <Helmet>
        <title>{product?.name} price in Saudi Arabia</title>
        <meta name="description" content={`Buy ${product?.name} at best price`} />
        <link rel="canonical" href={`https://moom24.com/product-details/${product?._id}`} />
      </Helmet>

      <div className="group  relative rounded-xl p-[1px] bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-400/30 hover:scale-[1.02]">
     
        
        <Link to={`/product-details/${product?._id}`}>
          <div className=" relative bg-base-100 hover:shadow-2xl p-5 duration-300 rounded-xl border hover:border-emerald-200 transition-all bg-gradient-to-b from-white/80 to-slate-50/80 backdrop-blur-sm ">
            
            {/* Image - Fixed Height */}
            <figure className="overflow-hidden rounded-xl flex justify-center items-center mb-2 gap-5">
              <img
                className="max-h-[150px] min-h-[150px] w-[180px] mx-2 hover:scale-110 hover:rotate-[1deg] transition-all duration-500 hover:brightness-110 object-cover group-hover:contrast-110"
                src={product?.image}
                alt={product?.name}
                loading="lazy"
              />
              
           

              {/* Discount Badge */}
              {product?.discount && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-tr-xl rounded-bl-xl  text-xs font-bold  shadow-lg">
                  {product?.discount}% OFF
                </div>
              )}
            </figure>

            {/* Product Name */}
            <h1 className="capitalize text-center text-sm md:text-base font-semibold mb-2 px-1 leading-tight group-hover:text-emerald-700 transition-all duration-300">
              <span className="gradient-text hover:font-bold">{truncate(product?.name, 20)}</span>
            </h1>

            {/* Price Section */}
            <div className="flex items-center justify-between gap-2">
              {product?.discount ? (
                <h2 className="text-lg text-gray-500 animate-float flex items-center justify-center">
                  <SaudiRiyal size={16} />
                  <del className="ml-1">{p_int}.{p_dec || '00'}</del>
                </h2>
              ) : null}
              
              <h2 className="flex items-center animate-float">
                <SaudiRiyal size={24} className="text-emerald-600 pulse-glow mr-1" />
                <span className="text-3xl font-black gradient-text drop-shadow-sm">{int}</span>
                <span className="text-sm font-medium text-emerald-600 ml-1">.{dec || '00'}</span>
              </h2>
            </div>

          </div>
        </Link>
      </div>
    </>
  );
};

export default SliderCard;