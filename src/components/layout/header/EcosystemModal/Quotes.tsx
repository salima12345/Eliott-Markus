
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Quote {
  text: string;
  author: string;
  imageSrc: string;
}

interface QuoteCarouselProps {
  quotes: Quote[];
}

const QuoteCarousel: React.FC<QuoteCarouselProps> = ({ quotes }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayInterval = 5000;

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % quotes.length);
      }, autoPlayInterval);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, quotes.length]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  const { text, author, imageSrc } = quotes[currentIndex];

  return (
    <div className='rounded-[20px] h-[384px] md:min-w-1/2 bg-grayDark text-white p-3 h-full flex flex-col justify-between'>
      <div className='flex flex-col items-center px-5 flex-grow'>
        <div className='text-center mb-6 flex-grow flex flex-col justify-center'>
          <p className='text-[30px] font-medium mb-6'>«&nbsp;{text}&nbsp;»</p>
          <span className='font-medium'>{author}</span>
        </div>
        <Image
          src={imageSrc}
          alt={`${author}'s image`}
          width={50}
          height={50}
          className='w-[50px] h-[50px] rounded-full'
        />
        <div className="flex gap-2 mt-6">
          {quotes.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuoteCarousel;
