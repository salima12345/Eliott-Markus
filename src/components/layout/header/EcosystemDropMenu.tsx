"use client";

import React from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "@/lib/themes";
import { ArrowUpRight } from 'lucide-react';

interface EcosystemDropMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenModal: () => void;
}

const LinkedInIcon = ({ color, className }: { color: string; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16.116" height="16.115" viewBox="0 0 16.116 16.115" className={className}>
    <path d="M3.607,16.116H.266V5.357H3.607ZM1.935,3.889A1.944,1.944,0,1,1,3.87,1.936,1.951,1.951,0,0,1,1.935,3.889ZM16.112,16.116H12.778V10.878c0-1.248-.025-2.849-1.737-2.849-1.737,0-2,1.356-2,2.759v5.328H5.7V5.357H8.9V6.824h.047a3.511,3.511,0,0,1,3.161-1.737c3.381,0,4,2.227,4,5.119v5.91Z" transform="translate(0 -0.001)" fill={color} />
  </svg>
);

const TwitterIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16.116" height="16.115" viewBox="0 0 314.132 283.946">
    <g transform="translate(-1.254 -2.25)">
      <path d="M248.651,2.25H296.82L191.585,122.527,315.386,286.2H218.451l-75.923-99.265L55.655,286.2H7.457L120.016,157.547,1.254,2.25h99.4l68.628,90.732ZM231.745,257.365h26.691L86.147,29.567H57.5Z" transform="translate(0)" fill={color} />
    </g>
  </svg>
);

const FacebookIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="9.864" height="18.418" viewBox="0 0 9.864 18.418">
    <path d="M10.827,10.36l.512-3.333h-3.2V4.864a1.667,1.667,0,0,1,1.879-1.8h1.454V.225A17.731,17.731,0,0,0,8.893,0C6.259,0,4.537,1.6,4.537,4.486v2.54H1.609V10.36H4.537v8.058h3.6V10.36Z" transform="translate(-1.609)" fill={color} />
  </svg>
);

const InstagramIcon = ({ color }: { color: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="17.125" height="18.121" viewBox="0 0 16.125 16.121">
    <path d="M8.059,6.165A4.133,4.133,0,1,0,12.192,10.3,4.127,4.127,0,0,0,8.059,6.165Zm0,6.82A2.687,2.687,0,1,1,10.746,10.3a2.692,2.692,0,0,1-2.687,2.687ZM13.325,6a.964.964,0,1,1-.964-.964A.962.962,0,0,1,13.325,6Zm2.738.978a4.771,4.771,0,0,0-1.3-3.378,4.8,4.8,0,0,0-3.378-1.3c-1.331-.076-5.32-.076-6.651,0a4.8,4.8,0,0,0-3.378,1.3,4.787,4.787,0,0,0-1.3,3.378c-.076,1.331-.076,5.32,0,6.651A4.771,4.771,0,0,0,1.354,17a4.808,4.808,0,0,0,3.378,1.3c1.331.076,5.32.076,6.651,0A4.771,4.771,0,0,0,14.761,17a4.8,4.8,0,0,0,1.3-3.378c.076-1.331.076-5.317,0-6.648ZM14.343,15.05a2.721,2.721,0,0,1-1.532,1.532c-1.061.421-3.579.324-4.752.324S4.364,17,3.307,16.583A2.721,2.721,0,0,1,1.774,15.05c-.421-1.061-.324-3.579-.324-4.752S1.357,6.6,1.774,5.546A2.721,2.721,0,0,1,3.307,4.014c1.061-.421,3.579-.324,4.752-.324s3.694-.094,4.752.324a2.721,2.721,0,0,1,1.532,1.532c.421,1.061.324,3.579.324,4.752S14.764,13.993,14.343,15.05Z" transform="translate(0.005 -2.238)" fill={color} />
  </svg>
);

const EcosystemDropMenu: React.FC<EcosystemDropMenuProps> = ({ isOpen, onOpenModal }) => {
  const { theme } = useTheme();

  const icons = [
    {
      icon: LinkedInIcon,
      link: 'https://www.linkedin.com/company/eliott-&-markus/',
      alt: 'LinkedIn'
    },
    {
      icon: TwitterIcon,
      link: 'https://www.twitter.com/EliottMarkus',
      alt: 'X'
    },
    {
      icon: InstagramIcon,
      link: 'https://www.instagram.com/eliottmarkus',
      alt: 'Instagram'
    },
    {
      icon: FacebookIcon,
      link: 'https://www.facebook.com/eliottmarkus',
      alt: 'Facebook'
    }
  ];

  return (
    <div className="w-[290px] md:w-[388px] lg:w-[288px] xl:w-[388px] 2xl:w-[388px] flex flex-col rounded-[25px] relative transition-all duration-400">
      <motion.div
        className={`w-full rounded-[26px] absolute right-0 -top-[25px] max-w-[388px] min-w-[287px] 
          md:top-[-25px] md:right-0 md:rounded-[26px]
          ${theme === 'dark' ? 'bg-[#222222]' : 'bg-[#E6E5DF]'}`}
        animate={{ 
          backgroundColor: isOpen 
            ? (theme === 'dark' ? '#222222' : '#E6E5DF') 
            : 'rgba(34, 34, 34, 0)',
          padding: isOpen ? '8px' : '0px',
          height: isOpen ? 'auto' : '56px'
        }}
      >
        <motion.div
          initial={{
            width: '218px',
            height: '56px',
            borderRadius: '26px'
          }}
          className={`mx-auto flex items-center justify-center cursor-pointer z-[2] relative transition-all duration-500 
            ${theme === 'dark' 
              ? 'bg-[#454545] text-white' 
              : 'bg-[#D5D4CE] text-black'}
            md:w-[218px] w-full md:rounded-[26px] rounded-none`}
          animate={{ 
            width: isOpen ? '100%' : '218px',
            height: isOpen ? '62px' : '56px',
            borderRadius: isOpen ? '19px' : '26px'
          }}
          onClick={onOpenModal}
        >
          <span className="text-[16px] tracking-[5px] uppercase text-center">
            Ecosystem
          </span>
        </motion.div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              style={{ position: 'relative' }}
              className={`w-full px-4 md:px-5 py-6 md:py-[30px] rounded-none md:rounded-b-[26px] opacity-0 
                ${theme === 'dark' 
                  ? 'bg-[#222222] text-white' 
                  : 'bg-[#E6E5DF] text-black'}`}
              initial={{ 
                opacity: 0, 
                height: 0,
                transform: 'translateY(-10px)'
              }}
              animate={{ 
                opacity: 1, 
                height: 'auto',
                transform: 'translateY(0)'
              }}
              transition={{ 
                duration: 0.3,
                type: 'tween'
              }}
            >
              <nav>
                <ul className={`flex flex-col gap-5 
                  ${theme === 'dark' 
                    ? 'text-white' 
                    : 'text-black'}`}
                >
                  <li className="text-[20px] md:text-[24px] font-semibold text-center self-center cursor-pointer">
                    <Link href="/">Agence</Link>
                  </li>
                  <li className="text-[20px] md:text-[24px] text-center self-center cursor-pointer relative">
                    <Link href="/References">Références <span className="text-[#E0643A] text-[20px]">*</span></Link>
                  </li>
                  <li className="text-[20px] md:text-[24px] text-center self-center cursor-pointer">
                    <Link href="/Team">Équipe</Link>
                  </li>
                  <li className="text-[20px] md:text-[24px] text-center self-center cursor-pointer">
                    <Link href="/Wilo">Wilo Insights</Link>
                  </li>
                  <li className="text-[20px] md:text-[24px] text-center self-center cursor-pointer">
                  <Link href="/Contact" className="flex items-center gap-2">
                      Contact
                      <ArrowUpRight 
                        size={20} 
                        color={theme === 'dark' ? '#ffffff' : '#000000'} 
                        className="cursor-pointer transition-all duration-500 hover:opacity-70"
                      />
                    </Link>
                  </li>
                </ul>
              </nav>
              <div className="mt-6 md:mt-10">
                <ul className="w-[140px] md:w-[170px] mx-auto flex items-center justify-between">
                  {icons.map((icon, index) => (
                    <li key={index}>
                      <Link href={icon.link} target="_blank" rel="noopener noreferrer">
                        <icon.icon 
                          color={theme === 'dark' ? '#ffffff' : '#000000'} 
                          className="cursor-pointer transition-all duration-500 hover:opacity-70"
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EcosystemDropMenu;