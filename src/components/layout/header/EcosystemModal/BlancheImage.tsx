import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const BlancheImage = () => {
  return (
    <Link 
      href="https://www.agence-blanche.com/" 
      target="_blank" 
      rel="noopener noreferrer"
      className="h-[170px] rounded-[25px] overflow-hidden relative flex items-center justify-center cursor-pointer group"
    >
      <div className="w-full h-full absolute top-0 left-0 transition-all duration-400 group-hover:opacity-0">
        <Image
          src="https://www.eliott-markus.com/wp-content/uploads/2023/06/blanche-bg.svg"
          alt="Blanche BG"
          layout="fill"
          objectFit="cover"
          priority
          loading="eager"
        />
      </div>
      <div className="w-full h-full absolute top-0 left-0 z-2 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
        <Image
          src="https://www.eliott-markus.com/wp-content/uploads/2023/06/blanche-bg-hover.svg"
          alt="Blanche BG Hover"
          layout="fill"
          objectFit="cover"
          priority
          loading="eager"
        />
      </div>
      <div className="relative z-3 flex flex-col">
        <Image
          src="https://www.eliott-markus.com/wp-content/uploads/2023/06/blanche-logo.svg"
          alt="Blanche Logo"
          width={100}
          height={100}
          className="w-[220px]"
          priority
          loading="eager"
        />
      </div>
    </Link>
  );
};

export default BlancheImage;