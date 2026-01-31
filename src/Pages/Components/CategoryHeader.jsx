import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { MdCategory } from "react-icons/md";

import "swiper/css";
import "swiper/css/navigation";

export default function CategoryHeader({ cat }) {
  return (
    <div className="bg-white shadow-sm mt-5 ">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={12}
        slidesPerView={3} 
        loop={true} 
        autoplay={{
          delay: 0, 
          disableOnInteraction: false,
          pauseOnMouseEnter: false,
        }}
        speed={2000} 
        breakpoints={{
          320: { slidesPerView: 3 },
          640: { slidesPerView: 5 },
          768: { slidesPerView: 7 },
          1024: { slidesPerView: 9 },
        }}
      >
        {cat?.map((cat) => (
          <SwiperSlide key={cat.id}>
            <div className="flex flex-col items-center gap-1 cursor-pointer group ">
              <div className="w-12 h-12 overflow-hidden  rounded-full bg-transparent  flex items-center justify-center text-xl  group-hover:bg-transparent transition">
                {cat?.image ? (
                  <img className="h-full w-full" src={cat?.image} alt="" />
                ) : (
                  <p className="text-gray-800">
                    {" "}
                    <MdCategory />
                  </p>
                )}
              </div>
              <p className="text-md font-medium group-hover:text-green-500">
                {cat.name}
              </p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
