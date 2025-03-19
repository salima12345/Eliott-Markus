import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { GET_ECOSYSTEM_DATA } from '@/lib/graphql/queries/EcosystemQueries';
import Button from '@/components/ui/Button';
import Media from './MediaCard';
import Statistics from './Statistics';
import QuoteCarousel from './Quotes';
import DateTimeWeather from './DateTimeWeather';
import EmImage from './EmImage';
import MiroviaImage from './MiroviaImage';
import LawCareImage from './LawCareImage';
import BlancheImage from './BlancheImage';
import WiloImage from './WiloImage';
import DeskImage from './DeskImage';
import { X } from 'lucide-react';

interface EcosystemModalProps {
  onClose: () => void;
}

interface Quote {
  quote: string;
  fullName: string;
  image: {
    node: {
      sourceUrl: string;
    };
  };
}

interface EcosystemData {
  quotes: Quote[];
  consultantsEtExperts: number;
  references: number;
  continents: number;
}

interface FooterData {
  linkedin: string;
  twitter: string;
  instagram: string;
}

interface QueryResult {
  options: {
    ecosystem: EcosystemData;
    footer: FooterData;
  };
}

export default function EcosystemModal({ onClose }: EcosystemModalProps) {
  const { data, loading, error } = useQuery<QueryResult>(GET_ECOSYSTEM_DATA);

  if (loading) return <p></p>;
  if (error) return <p>Error: {error.message}</p>;

  const ecosystemData = data?.options?.ecosystem;
  const footerData = data?.options?.footer;

  const quotes =
    ecosystemData?.quotes?.map((quote) => ({
      text: quote.quote,
      author: quote.fullName,
      imageSrc: quote.image?.node?.sourceUrl || '/images/fallback-image.jpg',
    })) || [];

  const socialMediaIcons = [
    {
      iconUrl:
        'https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-menu/linkedin.svg',
      linkUrl: footerData?.linkedin || '',
    },
    {
      iconUrl:
        'https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-menu/x_icon.svg',
      linkUrl: footerData?.twitter || '',
    },
    {
      iconUrl:
        'https://www.eliott-markus.com/wp-content/themes/em-wp/images/em-menu/instagram.svg',
      linkUrl: footerData?.instagram || '',
    },
  ].filter((icon) => icon.linkUrl);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.15,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: '10%',
      transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      y: '10%',
      transition: { duration: 0.6, ease: 'easeInOut' },
    },
  };

  const modalContent = (
    <motion.div
      className="fixed flex items-center justify-center inset-0 w-screen min-h-screen bg-black bg-opacity-60 backdrop-blur-sm z-[50] overflow-auto flex justify-center items-center px-5 py-1"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={containerVariants}
    >
      <div className="absolute top-4 right-4 z-[9999]">
        <Button Icon={X} altText="Close" onClick={onClose} />
      </div>

      <motion.div
        className="container mx-auto h-full flex flex-col py-10 gap-3"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col xl:flex-row justify-between gap-3"
          variants={itemVariants}
        >
          {/* First column/row */}
          <motion.div className="w-full xl:w-1/3 flex flex-col gap-3" variants={itemVariants}>
            <motion.div className="flex gap-3" variants={itemVariants}>
              <motion.div className="h-[137px] w-1/2" variants={itemVariants}>
                <Media icons={socialMediaIcons} />
              </motion.div>
              <motion.div className="h-[137px] w-1/2" variants={itemVariants}>
                <Statistics value={ecosystemData?.consultantsEtExperts ?? 0} title="Consultants and experts" />
              </motion.div>
            </motion.div>
            <motion.div className="xl:hidden flex gap-3" variants={itemVariants}>
              <div className="h-[137px] w-1/2">
                <Statistics value={ecosystemData?.references ?? 0} title="References" />
              </div>
              <div className="h-[137px] w-1/2">
                <Statistics value={ecosystemData?.continents ?? 0} title="Continents" />
              </div>
            </motion.div>
            <motion.div className="h-[384px]" variants={itemVariants}>
              <QuoteCarousel quotes={quotes} />
            </motion.div>
            <motion.div className="flex gap-3" variants={itemVariants}>
              <div className="h-[170px] w-1/2">
                <DateTimeWeather city="Paris" continent="Europe" isDark={false} />
              </div>
              <div className="h-[170px] w-1/2">
                <DateTimeWeather city="Casablanca" continent="Africa" isDark={true} />
              </div>
            </motion.div>
          </motion.div>
          {/* Second column/row */}
          <motion.div className="w-full xl:w-1/3 flex flex-col gap-3" variants={itemVariants}>
            <motion.div className="hidden xl:flex gap-3" variants={itemVariants}>
              <div className="h-[137px] w-1/2">
                <Statistics value={ecosystemData?.references ?? 0} title="References" />
              </div>
              <div className="h-[137px] w-1/2">
                <Statistics value={ecosystemData?.continents ?? 0} title="Continents" />
              </div>
            </motion.div>
            <motion.div className="h-[384px] flex" variants={itemVariants}>
              <EmImage className="w-full h-full" />
            </motion.div>
            <motion.div className="h-[170px]" variants={itemVariants}>
              <BlancheImage />
            </motion.div>
          </motion.div>
          {/* Third column/row */}
          <motion.div className="w-full xl:w-1/3 flex flex-col gap-3" variants={itemVariants}>
            <motion.div className="h-[171px]" variants={itemVariants}>
              <MiroviaImage />
            </motion.div>
            <motion.div className="h-[170px]" variants={itemVariants}>
              <LawCareImage />
            </motion.div>
            <motion.div className="h-[171px]" variants={itemVariants}>
              <DeskImage />
            </motion.div>
            <motion.div className="h-[170px] bg-[#F3F0E7] rounded-[25px]" variants={itemVariants}>
              <WiloImage />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modalContent, document.body);
}