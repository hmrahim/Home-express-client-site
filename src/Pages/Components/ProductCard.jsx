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

      <div className="group relative overflow-hidden rounded-xl p-[1.5px] bg-gradient-to-r from-emerald-500/80 to-green-500/80 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.01] before:absolute before:inset-0 before:bg-gradient-to-r before:from-emerald-400/30 before:to-green-400/30 before:blur-lg before:opacity-0 group-hover:before:opacity-100">
        
        {/* Inner Card - Compact Height */}
        <div className="relative h-[400px] bg-white/95 hover:bg-emerald-50/80 p-4 rounded-xl border border-emerald-100/50 backdrop-blur-sm transition-all duration-500 hover:shadow-glow-sm hover:border-emerald-200/70">
         

          {/* Compact Image */}
          <div className="relative h-[150px] mx-auto mb-2 overflow-hidden rounded-xl shadow-lg border-2 border-white/60 hover:border-emerald-200/80 transition-all duration-500">
            <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <img
              className="w-full h-full object-contain p-2 transition-all duration-700 group-hover:scale-105 hover:brightness-110 shadow-md rounded-xl"
              src={product?.image}
              alt={product?.name}
              loading="lazy"
            />
            {/* Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 opacity-0 group-hover:opacity-100 transition-all duration-700 -translate-x-full group-hover:translate-x-full"></div>
          </div>

          {/* Compact Content */}
          <div className="space-y-3 text-center relative z-10 px-1">
            
            {/* Compact Name */}
            <h1 className="font-semibold text-base md:text-lg leading-tight bg-gradient-to-r from-gray-800 to-gray-700 bg-clip-text text-transparent hover:from-emerald-600 hover:to-green-600 transition-all duration-300 capitalize">
              {truncate(product?.name, 25)}
            </h1>

            {/* Compact Price */}
            <div className="p-3 bg-white/90 rounded-xl shadow-md border border-emerald-100 hover:border-emerald-200 hover:shadow-glow-price transition-all duration-300 hover:scale-[1.01]">
              <div className="flex items-end justify-center space-x-2 mb-1">
                
                {/* Original Price */}
                {product?.discount && (
                  <div className="flex items-center space-x-1">
                    <SaudiRiyal className="text-gray-400 w-4 h-4" />
                    <span className="text-lg font-medium text-gray-400 line-through">
                      {p_int}{p_dec > 0 && <span className="text-xs">.{p_dec}</span>}
                    </span>
                  </div>
                )}
                
                {/* Discount Price */}
                <div className="flex items-end space-x-1">
                  <SaudiRiyal className="text-emerald-600 w-6 h-6" />
                  <div className="flex items-baseline">
                    <span className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                      {int}
                    </span>
                    {dec > 0 && (
                      <span className="text-sm font-medium text-emerald-600 -mt-1">.{dec}</span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Compact Savings */}
              {product?.discount && (
                <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm w-full">
                  Save {product?.discount}%!
                </div>
              )}
            </div>

            {/* Slim Compact Button */}
            <Link
              to={`/product-details/${product?._id}`}
              className="group/btn block w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-lg hover:shadow-glow-btn border hover:border-emerald-400/50 transform hover:-translate-y-1 transition-all duration-400 uppercase tracking-wide text-sm before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:-skew-x-12 before:-translate-x-full group-hover/btn:before:translate-x-full before:transition-transform before:duration-700"
            >
              <span className="flex items-center justify-center space-x-1.5 group-hover/btn:scale-105 transition-transform duration-300">
                <span>Buy Now</span>
                <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.02); }
        }
        .animate-pulse { animation: pulse-slow 2s ease-in-out infinite; }
        .shadow-glow-sm {
          box-shadow: 0 15px 35px -10px rgba(16, 185, 129, 0.4);
        }
        .shadow-glow-price {
          box-shadow: 0 12px 25px -8px rgba(16, 185, 129, 0.3);
        }
        .shadow-glow-btn {
          box-shadow: 0 12px 30px -8px rgba(16, 185, 129, 0.5);
        }
      `}</style>
    </>
  );
};

export default ProductCard;