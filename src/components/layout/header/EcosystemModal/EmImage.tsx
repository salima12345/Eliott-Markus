import React from 'react'
import Image from 'next/image'

interface EmImageProps {
  className?: string
}

const EmImage: React.FC<EmImageProps> = ({ className = '' }) => {
  return (
    <div className={`relative w-full h-[384px] ${className}`}>
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-[#222222] rounded-[20px] border-2 border-[#222222] overflow-hidden cursor-pointer">
        <div className="absolute z-20 flex flex-col justify-center items-center">
          <Image
            src="/images/darkLogo.svg"
            alt="EM Logo"
            width={100}
            height={100}
          />
        </div>
        <div className="absolute inset-0">
          <Image
            src="https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-menu/bg-em-anim.svg"
            alt="EM BG"
            layout="fill"
            className="object-cover transition-transform duration-1000 hover:scale-[1.4] hover:rotate-[-22deg] hover:translate-y-[10px]"
             priority
            loading="eager"
          />
        </div>
      </div>
    </div>
  )
}

export default EmImage