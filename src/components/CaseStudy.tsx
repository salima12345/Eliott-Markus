'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useTheme } from '@/lib/themes';

interface Expertise {
  name: string;
}

interface CaseStudyCardProps {
  imageUrl: string;
  title: string;
  description?: string; // Marked as optional since it's not used
  expertise: Expertise[] | null | undefined;
  slug: string;
}

function CaseStudyCard({ imageUrl, title, expertise, slug }: CaseStudyCardProps) {
  const { theme } = useTheme();
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });

  const expertiseList = Array.isArray(expertise) ? expertise : [];

  return (
    <Link href={`/References/${slug}`} className="block">
      <div className='flex flex-col gap-4 max-w-[590px]'>
        <motion.div
          ref={ref}
          className="relative w-full aspect-[590/388] rounded-[14px] overflow-hidden"
          initial={{ opacity: 0, y: 100 }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            transition: {
              duration: 1,
              ease: [0.25, 0.4, 0.3, 0.96],
            }
          } : { opacity: 0, y: 100 }}
        >
          <motion.div
            style={{ position: 'relative' }} 
            className="w-full h-full"
            initial={{ scale: 1.4 }}
            animate={isInView ? {
              scale: 1,
              transition: {
                duration: 1,
                ease: [0.25, 0.4, 0.3, 0.96],
              }
            } : { scale: 1.2 }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 590px) 100vw, 590px"
              priority
              className="object-cover"
            />
          </motion.div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-2"
        >
          {expertiseList.map((item, index) => (
            <span
              key={index}
              className={`
                px-4 py-1.5 rounded-[27px] text-[14px] font-medium text-foreground
                ${theme === 'dark'
                  ? 'bg-grayDark '
                  : 'bg-[#E6E5DF] '}
              `}
            >
              {item.name}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`text-[20px] font-medium text-foreground`}
        >
          {title}
        </motion.div>
      </div>
    </Link>
  );
}

export default CaseStudyCard;