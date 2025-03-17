import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface Icon {
  iconUrl: string;
  linkUrl: string;
}

interface MediaProps {
  icons: Icon[];
}

const Media: React.FC<MediaProps> = ({ icons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [icons.length, isAutoPlay]);

  const handleIconClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
    window.location.href = icons[index].linkUrl; 
  };

  return (
    <div className='rounded-[20px] bg-grayDark text-white p-3 h-full flex justify-center items-end'>
      <div className="flex flex-col items-center gap-8">
        <Image 
          src={icons[currentIndex].iconUrl} 
          alt="Social Media Icon" 
          width={40} 
          height={40} 
          className="w-10 h-10" 
        />
        <div className="flex gap-2">
          {icons.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
              onClick={() => handleIconClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Media;