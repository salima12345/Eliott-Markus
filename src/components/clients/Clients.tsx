'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';
import 'swiper/css';
import 'swiper/css/navigation';

interface ClientCategory {
  title: string;
  href: string;
}

interface MotCle {
  title: string;
}

export default function Clients() {
  const [showButtons, setShowButtons] = useState(false);
  const swiperRef = useRef<SwiperType>();

  const { data, loading, error } = useQuery(HOME_PAGE_QUERY);

  const motsCles = data?.pages?.nodes
    ?.find((node: { template: { templateName: string } }) => node.template?.templateName === "Home")
    ?.template?.home?.motsCles || [];

  const clientCategories: ClientCategory[] = motsCles.map((motCle: MotCle) => ({
    title: motCle.title,
    href: `/category/${motCle.title.toLowerCase().replace(/\s+/g, '-')}`, 
  }));

  useEffect(() => {
    const checkOverflow = () => {
      if (swiperRef.current) {
        const { isBeginning, isEnd } = swiperRef.current;
        setShowButtons(!isBeginning || !isEnd);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, []);

  if (loading) return <p></p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mt-10 py-8 relative px-4 flex items-center justify-center">
      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={'auto'}
        navigation={{
          nextEl: '.client-swiper-next',
          prevEl: '.client-swiper-prev',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onResize={() => {
          if (swiperRef.current) {
            const { isBeginning, isEnd } = swiperRef.current;
            setShowButtons(!isBeginning || !isEnd);
          }
        }}
        className="flex justify-center"
      >
        {clientCategories.map((category, index) => (
          <SwiperSlide key={index} className="!w-auto">
            <Link rel="preload" href={category.href} className="bg-grayDark rounded-[26px] p-8 block">
              <h3 className="font-medium text-[22px] whitespace-nowrap">{category.title}</h3>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      {showButtons && (
        <>
          <button className="client-swiper-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-grayDark bg-opacity-70 backdrop-blur-md rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10 text-white transition-all duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed sm:w-8 sm:h-8">
            <Image
              src="/images/icons/ChevronLeft.svg"
              width={24}
              height={24}
              alt="Chevron Left"
              className="w-6 h-6 sm:w-4 sm:h-4"
            />
          </button>
          <button className="client-swiper-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-grayDark bg-opacity-70 backdrop-blur-md rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10 text-white transition-all duration-300 ease-in-out hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 disabled:cursor-not-allowed sm:w-8 sm:h-8">
            <Image
              src="/images/icons/ChevronRight.svg"
              width={24}
              height={24}
              alt="Chevron Right"
              className="w-6 h-6 sm:w-4 sm:h-4"
            />
          </button>
        </>
      )}
    </div>
  );
}