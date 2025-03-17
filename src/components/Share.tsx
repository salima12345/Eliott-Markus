import React from 'react';
import { motion } from 'framer-motion';
import MagneticButton from '@/components/ui/MagneticButton';

interface ShareProps {
  url: string;
}

const Share: React.FC<ShareProps> = ({ url }) => {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <motion.div 
      className="mt-12 py-6 border-y border-[#D5D4CE]"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: "easeOut"
          }
        }
      }}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col xl:flex-row items-center justify-between gap-6 xl:gap-0">
        <h2 className="font-semibold text-lg text-[#222] w-full xl:w-auto text-center xl:text-left">
          Share
        </h2>
        <ul className="grid grid-cols-2 lg:flex w-full lg:w-auto gap-y-6 gap-x-4 lg:gap-[70px]">
          <MagneticButton>
            <motion.li 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 w-full xl:justify-start xl:gap-4"
              >
                <span className="text-base text-[#222]">LinkedIn</span>
                <div className="w-11 h-11 rounded-full bg-[#E6E5DF] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g transform="translate(-359 -3019)">
                      <path d="M0,0H20V20H0Z" transform="translate(359 3019)" fill="#fff" opacity="0"></path>
                      <path d="M3.112,13.9H.23V4.622H3.112ZM1.669,3.355A1.677,1.677,0,1,1,3.339,1.67,1.683,1.683,0,0,1,1.669,3.355ZM13.9,13.9H11.024V9.386c0-1.077-.022-2.458-1.5-2.458-1.5,0-1.728,1.17-1.728,2.38v4.6H4.918V4.622H7.683V5.888h.04a3.029,3.029,0,0,1,2.727-1.5c2.917,0,3.454,1.921,3.454,4.416v5.1Z" transform="translate(362.048 3022.047)"></path>
                    </g>
                  </svg>
                </div>
              </a>
            </motion.li>
          </MagneticButton>
          <MagneticButton>
            <motion.li 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-6 w-full xl:justify-start xl:gap-4"
              >
                <span className="text-base text-[#222]">Facebook</span>
                <div className="w-11 h-11 rounded-full bg-[#E6E5DF] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g transform="translate(-486 -3019)">
                      <path d="M0,0H20V20H0Z" transform="translate(486 3019)" fill="#fff" opacity="0"></path>
                      <path d="M8.666,7.931l.392-2.552H6.609V3.723A1.276,1.276,0,0,1,8.048,2.345H9.161V.172A13.574,13.574,0,0,0,7.185,0,3.115,3.115,0,0,0,3.851,3.435V5.379H1.609V7.931H3.851V14.1H6.609V7.931Z" transform="translate(490.614 3021.95)"></path>
                    </g>
                  </svg>
                </div>
              </a>
            </motion.li>
          </MagneticButton>
          <MagneticButton>
  <motion.li 
    whileHover={{ scale: 1.05 }} 
    whileTap={{ scale: 0.95 }}
  >
    <a
      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-6 w-full xl:justify-start xl:gap-4"
    >
      <span className="text-base text-[#222]">Twitter</span>
      <div className="w-11 h-11 rounded-full bg-[#E6E5DF] flex items-center justify-center">
      <svg 
  xmlns="http://www.w3.org/2000/svg" 
  width="14" 
  height="14" 
  viewBox="0 0 24 24" 
  fill="#000" 
  style={{ display: 'block', margin: 'auto' }}
>
  <path d="M18.244,2.25h3.308l-7.227,8.26L24,21.75H16.577l-5.214-6.817L4.99,21.75H1.68l7.73-8.835L0,2.25H7.594l4.713,6.231ZM17.038,19.77h2.039L6.486,3.937H4.298Z" />
</svg>
      </div>
    </a>
  </motion.li>
</MagneticButton>
          <MagneticButton>
            <motion.li 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
            >
              <button className="flex items-center gap-6 w-full xl:justify-start xl:gap-4">
                <span className="text-base text-[#222]">Copy the link</span>
                <div className="w-8 h-8 rounded-full bg-[#E6E5DF] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
                    <g transform="translate(-424 -3019)">
                      <path d="M0,0H20V20H0Z" transform="translate(424 3019)" fill="#fff" opacity="0"></path>
                      <g transform="translate(426.218 3021.208)">
                        <path d="M15,8.271a2.394,2.394,0,0,0,3.61.259l1.436-1.436a2.394,2.394,0,1,0-3.385-3.385l-.823.819" transform="translate(-8.175)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path>
                        <path d="M8.74,14.452a2.394,2.394,0,0,0-3.61-.259L3.694,15.63a2.394,2.394,0,1,0,3.385,3.385L7.9,18.2" transform="translate(0 -7.138)" fill="none" stroke="#000" stroke-linecap="round" stroke-linejoin="round" stroke-width="1"></path>
                      </g>
                    </g>
                  </svg>
                </div>
              </button>
            </motion.li>
          </MagneticButton>
        </ul>
      </div>
    </motion.div>
  );
};

export default Share;