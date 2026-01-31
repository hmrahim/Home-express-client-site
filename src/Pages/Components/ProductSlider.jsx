import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import ProductCard from "./ProductCard";
import { fetchProductForUser } from "../../api/AllApi";
import { useQuery } from "@tanstack/react-query";
import SliderCard from "./SliderCard";

export default function ProductSlider({ title ,data}) {
  const product = data?.slice(0, 15);
    
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      
      {/* Section Title */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-semibold">
          {title}
        </h2>
      </div>

      <Swiper
        modules={[Autoplay, Navigation]}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          reverseDirection: true,   // 👉 Right to Left
        }}
        navigation={true}
        spaceBetween={15}
        breakpoints={{
          320: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
      >
        {product?.map((product) => (
          <SwiperSlide key={product._id}>
            <SliderCard product={product} />
          </SwiperSlide>
        ))}
      </Swiper>

    </div>
  );
}
