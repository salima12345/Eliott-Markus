import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const WiloImage = () => {
  return (
    <div className='h-[170px]'>
         <Link 
      href="https://www.eliott-markus.com/wilo/" 
      className="h-full rounded-[25px] overflow-hidden relative flex items-center justify-center cursor-pointer group"
      rel="noopener"
    >
      <div className="logo">
        <Image
          src="https://www.eliott-markus.com/wp-content/uploads/2023/06/wilo-logo.svg"
          alt="Wilo Logo"
          width={100}
          height={100}
          className="w-[220px]"
           priority
          loading="eager"
        />
      </div>
    </Link>
    </div>
 
  );
};

export default WiloImage;