import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import ProductCard from "./ProductCard";
import SpecialOfferTitle from "./SpecialOfferTitle";




const CoverFLowSlider = ({ data }) => {
  return (
    <div className="my-5 pb-5 px-5 md:px-0 shadow-2xl">
      
        <h1 className="text-center "> <SpecialOfferTitle title="Hot Deals" /> </h1>
      <Swiper
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={1}
        autoplay={{
          delay: 1000, // 🔥 2.5 seconds
          disableOnInteraction: false,
        }}
        coverflowEffect={{
          rotate: 40,
          stretch: 0,
          depth: 120,
          modifier: 1,
          slideShadows: false,
        }}
       
        modules={[EffectCoverflow, Pagination, Autoplay]}
        breakpoints={{
          640: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="w-full py-10"
      >
        {data?.map((product) => (
          <SwiperSlide key={product._id}>
            <ProductCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CoverFLowSlider;
