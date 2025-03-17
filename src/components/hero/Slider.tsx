"use client";

import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCreative, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/autoplay";

const slides = [
  { url: "https://www.eliott-markus.com/wp-content/uploads/2023/05/strategy.svg", alt: "Stratégie marketing" },
  { url: "https://www.eliott-markus.com/wp-content/uploads/2023/05/influence.svg", alt: "Relations Media" },
  { url: "https://www.eliott-markus.com/wp-content/uploads/2023/05/design.svg", alt: "Design visuel" },
  { url: "https://www.eliott-markus.com/wp-content/uploads/2023/05/tech.svg", alt: "Tech & Web" },
  { url: "https://www.eliott-markus.com/wp-content/uploads/2023/05/content.svg", alt: "Edition & contenus" },
  { url: "https://www.eliott-markus.com/wp-content/uploads/2023/05/digital.svg", alt: "Social Media / Référencement" },
  { url: "https://www.eliott-markus.com/wp-content/uploads/2023/05/consulting.svg", alt: "Outsourcing" },
];

const SliderSwiper = () => {
  return (
    <div className="w-full max-w-[350px] md:max-w-[450px] ml-auto py-8 mt-10">
      <Swiper
        allowTouchMove={false}
        modules={[Navigation, EffectCreative, Autoplay]}
        speed={2000}
        loop={true}
        effect="creative"
        creativeEffect={{
          prev: {
            translate: [0, 0, 0],
            scale: 1,
          },
          next: {
            translate: ["100%", 0, 0],
          },
          limitProgress: 2,
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
          },
          768: {
            slidesPerView: 1.5, 
          },
        }}
        className="w-full h-[250px] md:h-[287px] overflow-hidden"
        data-testid="swiper"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index} data-testid="swiper-slide">
            <div className="block w-[250px] md:w-[287px] h-[250px] md:h-[287px] relative rounded-[35px] overflow-hidden">
              <Image
                width={287}
                height={287}
                src={slide.url}
                alt={slide.alt}
                className="w-full h-full object-contain"
                loading={index === 0 ? "eager" : "lazy"} 
                priority={index === 0} 
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SliderSwiper;
