import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const DeskImage = () => {
  return (
    <div className="h-[171px] flex flex-col items-center justify-center rounded-[25px] overflow-hidden relative">
      <Swiper
        className="w-full h-full"
        modules={[Pagination]}
        pagination={{
          clickable: true,
          el: '.slider-desk-pagination'
        }}
        slidesPerView={1}
      >
        <SwiperSlide className="!w-full !h-full !flex !flex-col !items-center !justify-center cursor-pointer group">
          <div className="w-[120%] h-full absolute top-0 left-0 -z-10 overflow-hidden">
            <div className="relative w-full h-full transition-transform duration-500 ease-in-out group-hover:-translate-x-10">
              <Image
                src="https://www.eliott-markus.com/wp-content/uploads/2023/05/bg-desk-soon.jpg"
                alt="Desk"
                layout="fill"
                objectFit="cover"
                 priority
                 loading="eager"
              />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center absolute inset-0">
            <h5 className="flex items-center font-bold text-sm tracking-[0.5em] uppercase text-white relative">
              Desk 
              <span className="font-medium text-[10px] tracking-[0.2em] lowercase text-[#222] flex items-center justify-center px-2 py-1 bg-[#f2bd41] rounded-full absolute -right-[45px] -top-4">
                Soon
              </span>
            </h5>
            
            <h3 className="font-bold text-[31px] text-white mt-2">
              Middle East Africa
            </h3>
          </div>
        </SwiperSlide>
      </Swiper>
      
      <div className="slider-desk-pagination absolute bottom-4 z-10 flex justify-center items-center w-full [&_.swiper-pagination-bullet]:bg-white" />
    </div>
  );
};

export default DeskImage;