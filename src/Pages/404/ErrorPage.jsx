import React from "react";
import { Link } from "react-router-dom";
// require("./ErrorPage");

const ErrorPage = () => {
  return (
    <div>
      <style>{`
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-18px); }
    }

    @keyframes blink {
      0%,90%,100% { transform: scaleY(1); }
      95% { transform: scaleY(0.1); }
    }

    @keyframes wave {
      0%,100% { transform: rotate(0deg); }
      50% { transform: rotate(15deg); }
    }
  `}</style>
      <div className="text-center">
        {/* <!-- Cartoon Character --> */}
        <div
          className="relative mx-auto mb-10 w-40 h-40 mt-10"
          style={{animation: 'float 4s ease-in-out infinite'}}
        >
          {/* <!-- Head --> */}
          <div className="absolute inset-0 bg-indigo-100 rounded-full shadow-lg"></div>

          {/* <!-- Eyes --> */}
          <div
            className="absolute top-16 left-10 w-6 h-6 bg-gray-800 rounded-full origin-center"
            style={{animation: "blink 4s infinite"}}
          ></div>

          <div
            className="absolute top-16 right-10 w-6 h-6 bg-gray-800 rounded-full origin-center"
            style={{animation:" blink 4s infinite"}}
          ></div>

          {/* <!-- Smile --> */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-16 h-8 border-b-4 border-gray-700 rounded-b-full"></div>

          {/* <!-- Hand --> */}
          <div
            className="absolute -right-6 top-24 w-10 h-4 bg-indigo-100 rounded-full origin-left"
            style={{animation: "wave 2s ease-in-out infinite"}}
          ></div>
        </div>

        {/* <!-- 404 Text --> */}
        <h1
          className="text-8xl md:text-9xl font-extrabold  text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-green-600 to-red-500"
          style={{animation:" float 3s ease-in-out infinite"}}
        >
          404
        </h1>

        {/* <!-- Message --> */}
        <p className="mt-4 text-lg md:text-xl  text-transparent bg-clip-text bg-gradient-to-r from-black via-green-500 to-yellow-500">
          Oops! This page went on a coffee break ☕
        </p>

        {/* <!-- Divider --> */}
        <div className="mx-auto mt-4 w-20 h-1 bg-green-500 rounded-full"></div>

        {/* <!-- Button --> */}
        <Link
          to="/"
          className="inline-block mt-8 px-8 py-4 text-white  rounded-xl shadow-md
               bg-gradient-to-r from-green-500 to-emerald-600  hover:bg-indigo-700 hover:scale-105 transition-all duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
