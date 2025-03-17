import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

function Copyright() {
  return (
    <div className='py-4 flex flex-col gap-5 sm:flex-row items-center sm:justify-between text-sm'>
      <p className='text-center sm:text-left'>© Copyright 2005–2024 Eliott & Markus. All Rights Reserved.</p>
      <div className='flex flex-col sm:flex-row items-center gap-3 sm:gap-10 order-3 sm:order-2'>
        <Link href="/conditions-generales" className='hover:underline'>Conditions générales</Link>
        <Link href="/mentions-legales" className='hover:underline'>Mentions légales</Link>
      </div>
      <Link href="https://mirovia.com/" className='order-2 sm:order-3'>
        <Image 
          src="/images/Mirovia.svg" 
          alt="Mirovia" 
          width={100} 
          height={90} 
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Link>
    </div>
  );
}

export default Copyright;