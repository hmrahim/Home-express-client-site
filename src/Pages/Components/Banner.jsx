import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { useQuery } from "@tanstack/react-query";
import { getBanner } from "../../api/AllApi";


const Banner = () => {

  const {data,isPending} = useQuery({
    queryKey: ["banner"],
    queryFn: getBanner,
    refetchInterval: 1000,
  });


  return (
   <div className="w-full h-[40vh] mt-[68px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        navigation={true}
        className="h-full"
      >
        {data?.data?.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full bg-cover bg-center relative mt-5"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="relative z-10 h-full flex items-center px-10 md:px-20">
                {/* <div className="max-w-xl text-white">
                  <h1 className="text-3xl md:text-5xl font-bold mb-4">
                    {slide.title}
                  </h1>
                  <p className="mb-6 text-lg opacity-90">
                    {slide.desc}
                  </p>
                  <button className="bg-red-500 hover:bg-red-600 transition px-6 py-3 rounded-md">
                    Shop Now
                  </button>
                </div> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banner;
