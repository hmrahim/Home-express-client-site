import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function SubHeader() {
  const [location, setLocation] = useState("Detecting location...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation("Geolocation not supported");
      setLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );

          const data = await response.json();
          console.log(data);

          const city =
            data.address.city ||
            data.address.town ||
            data.address.village ||
            data.address.country;

          setLocation(city || "Unknown location");
        } catch (error) {
          setLocation("Unable to detect location");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLocation("Location access denied");
        setLoading(false);
      }
    );
  }, []);

  return (
     <div className="w-full   fixed top-20 z-10 opacity-95">
      <div
        
        className="min-w-full navbar bg-gradient-to-r from-green-500 to-emerald-600 text-base-100 shadow-sm  flex justify-between  "
      >
      <div className="min-w-full px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">

        {/* Location Section */}
        <div className="flex items-center gap-3 cursor-pointer group">

          {/* Animated Location Icon */}
          <div className="relative flex items-center justify-center">
            {loading && (
              <span className="absolute h-6 w-6 rounded-full bg-white/40 animate-ping"></span>
            )}

            <svg
              className="w-6 h-6 text-white animate-bounce"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
            </svg>
          </div>

          {/* Location Text */}
          <div className="flex flex-col leading-tight transition-all duration-700 ease-in-out">
            <span className="text-sm opacity-80">
              Your Current Location
            </span>

            <span
              className={`font-semibold text-lg tracking-wide transition-all duration-700 ${
                loading
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              }`}
            >
              {location}
            </span>
          </div>
        </div>

        {/* Button Section */}
        <div className="w-full sm:w-auto">
          <button className="relative w-full sm:w-auto inline-flex items-center justify-center px-6 py-2 font-semibold text-indigo-600 bg-white rounded-full shadow-xl overflow-hidden group transition-all duration-500">
            
            {/* Hover Background Animation */}
            <span className="absolute inset-0 bg-indigo-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out rounded-full"></span>

            <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
             <NavLink className="ml-2" to="/dashboard/quotation">Get a quotation</NavLink>
              <svg
                className="w-4 h-4 transform group-hover:translate-x-1 transition duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </span>
          </button>
        </div>

      </div>
    </div>
    </div>
  );
}