import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LawCareImage = () => {
  return (
    <Link 
    href="https://welawcare.com/" 
    target="_blank" 
    rel="noopener noreferrer" 
    className="bottom h-[170px] rounded-[25px] overflow-hidden relative flex items-center justify-center cursor-pointer group">
      <div className="w-full h-full absolute top-0 left-0 transition-all duration-400 group-hover:opacity-0">
        <Image
          src="https://www.eliott-markus.com/wp-content/uploads/2023/06/welawcare-bg.svg"
          alt="Welawcare BG"
          layout="fill"
          objectFit="cover"
           priority
          loading="eager"
        />
      </div>
      <div className="w-full h-full absolute top-0 left-0 z-2 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
        <Image
          src="https://www.eliott-markus.com/wp-content/uploads/2023/06/welawcare-bg-hover.svg"
          alt="Welawcare BG Hover"
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div className="relative z-3 flex flex-col">
        <Image
          src="https://www.eliott-markus.com/wp-content/uploads/2023/06/welawcare-logo.svg"
          alt="Welawcare Logo"
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

export default LawCareImage;