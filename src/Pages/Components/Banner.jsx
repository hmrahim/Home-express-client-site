import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import slide1 from "../../assets/01.jpg"
import slide2 from "../../assets/02.jpg"



// import required modules
import { Navigation } from 'swiper/modules';

const Banner = () => {
    return (
        <div className='mt-[64px] '>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
        <SwiperSlide>
            <img className='w-full' src={slide1} alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img className='w-full' src={slide2} alt="" />
        </SwiperSlide>
       
      
      </Swiper>
        </div>
    );
};

export default Banner;