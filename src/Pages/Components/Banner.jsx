import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import slide1 from "../../assets/01.jpg";
import slide2 from "../../assets/02.jpg";

// import required modules
import { Navigation } from "swiper/modules";

const banners = [
  {
    id: 1,
    image: slide1,
    title: "Winter Sale - Up to 50% Off",
    subtitle: "Grab the best deals on all products now!",
    link: "#",
  },
  {
    id: 2,
    image: slide2,
    title: "New Arrivals",
    subtitle: "Check out the latest collection of showers and toilets",
    link: "#",
  },
  {
    id: 3,
    image: slide1,
    title: "Luxury Bath Essentials",
    subtitle: "Upgrade your bathroom with premium products",
    link: "#",
  },
];

const Banner = () => {
  const [current, setCurrent] = useState(0);

  // Auto change slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % banners.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="mt-[64px] ">
      
      {/* <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
          <img className="w-full" src={slide1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img className="w-full" src={slide2} alt="" />
        </SwiperSlide>
      </Swiper> */}
      <div className="relative w-full h-64 md:h-screen lg:h-screen overflow-hidden bg-primary">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute top-0 left-0 w-full h-screen md:h-screen transition-opacity duration-1000 ${
              index === current ? "opacity-100 z-0" : "opacity-0 z-0"
            }`}
          >
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-screen bg-cover object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-start p-6 md:p-12 text-white">
              <h2 className="text-xl md:text-4xl font-bold mb-2">
                {banner.title}
              </h2>
              <p className="text-sm md:text-lg mb-4">{banner.subtitle}</p>
              <a
                href={banner.link}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded text-sm md:text-base font-semibold"
              >
                Shop Now
              </a>
            </div>
          </div>
        ))}

        {/* Navigation Dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, idx) => (
            <span
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
                idx === current ? "bg-white w-4 h-4" : "bg-gray-400"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Banner;
