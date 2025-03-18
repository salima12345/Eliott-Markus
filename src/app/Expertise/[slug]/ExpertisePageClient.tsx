'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import parse from 'html-react-parser';
import AnimatedTitle from '@/components/ui/TitleReveal';
import Button from '@/components/ui/Button';
import TeamReveal from '@/components/TeamReveal';
import Footer from '@/components/layout/footer';
import CaseStudyCard from '@/components/CaseStudy';
import { MoveVertical } from 'lucide-react';
import { type CaseStudy } from '@/Data/CaseStudiesData';
import { TeamMember } from '@/Data/TeamData';
import { useRouter } from 'next/navigation';

interface ServiceItemProps {
  number: string;
  title: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ number, title }) => (
  <div className="flex items-center gap-2">
    <p className="text-sm relative -top-1 font-bold">{number.padStart(2, '0')}</p>
    <p className="text-[20px] font-bold">{title}</p>
  </div>
);

interface PageContent {
  title: string;
  description: string;
  servicesDescription: string;
  heroTextColor: string;
  servicesBgColor: string;
  servicesTextColor: string;
  imageSrc: string;
  services: string[];
  nextSlug?: string;
  previousSlug?: string;
}

interface ExpertisePageClientProps {
  pageContent: PageContent;
  members: TeamMember[];
  caseStudiesForSlug: CaseStudy[];
}

const ExpertisePageClient: React.FC<ExpertisePageClientProps> = ({
  pageContent,
  members,
  caseStudiesForSlug,
}) => {
  const {
    title,
    description,
    heroTextColor,
    servicesBgColor,
    servicesTextColor,
    servicesDescription,
    imageSrc,
    services,
    nextSlug,
    previousSlug,
  } = pageContent;

  const router = useRouter();

  const handleNext = () => {
    if (nextSlug) {
      router.push(`/Expertise/${nextSlug}`);
    }
  };

  const handlePrevious = () => {
    if (previousSlug) {
      router.push(`/Expertise/${previousSlug}`);
    }
  };

  const handleScrollToNextSection = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const parsedServicesDescription = React.useMemo(() => {
    return parse(servicesDescription, {
      replace: (domNode) => {
        if (domNode.type === 'tag' && domNode.name === 'a') {
          return (
            <a
              href={domNode.attribs.href}
              className="text-inherit underline hover:opacity-80 transition-opacity"
              target="_blank"
              rel="noopener noreferrer"
            >
              {(domNode.children[0] as unknown as Text).data}
            </a>
          );
        }
        return domNode;
      }
    });
  }, [servicesDescription]);

  return (
    <>
      <div className="container py-8">
        <div className="flex flex-col gap-10 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-5">
              <button
                className="group w-[54px] h-[54px] rounded-full flex items-center justify-center bg-[#E6E5DF] transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = servicesBgColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E6E5DF')}
                onClick={handlePrevious}
              >
                <Image src="/images/icons/arrowLeftDark.svg" alt="Arrow Left" width={19} height={19} loading="lazy" className="transition-all duration-300 group-hover:hidden" />
                <Image src="/images/icons/arrowLeftLight.svg" alt="Arrow Left Hover" width={19} height={19} loading="lazy" className="transition-all duration-300 hidden group-hover:block" />
              </button>
              <button
                className="group w-[54px] h-[54px] rounded-full flex items-center justify-center bg-[#E6E5DF] transition-all duration-300"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = servicesBgColor)}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#E6E5DF')}
                onClick={handleNext}
              >
                <Image src="/images/icons/arrowRight.svg" alt="Arrow Right" width={19} height={19} loading="lazy" className="transition-all duration-300 group-hover:hidden" />
                <Image src="/images/icons/arrowRightLight.svg" alt="Arrow Right Hover" width={19} height={19} loading="lazy" className="transition-all duration-300 hidden group-hover:block" />
              </button>
            </div>
            <div className="overflow-hidden">
              <AnimatedTitle text={title} className="font-semibold text-[14px]" style={{ color: heroTextColor }} />
            </div>
            <div className="overflow-hidden py-2">
              <motion.h3
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px] max-w-full sm:max-w-[80%] md:max-w-[75%] lg:max-w-[70%] xl:max-w-[691px]"
                style={{ color: heroTextColor }}
              >
                {description}
              </motion.h3>
            </div>
          </div>
          <div className="w-[287px] h-[287px] relative rounded-[20px] overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 1.2 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="w-full h-full"
            >
              <Image src={imageSrc} alt={`${title} illustration`} fill className="object-contain" />
            </motion.div>
          </div>
        </div>
        <div className="py-20 flex items-end justify-end">
          <Button
            Icon={MoveVertical}
            lightIconColor="#333333"
            darkIconColor="#ffffff"
            altText="Arrow Icon"
            onClick={handleScrollToNextSection} 
          />
        </div>
        <div id="next-section" className="rounded-[10px]" style={{ background: servicesBgColor }}>
          <motion.div initial={{ y: 20 }} animate={{ y: 0 }} transition={{ duration: 0.5, ease: 'easeOut' }} className="container">
            <div className="flex flex-col xl:flex-row gap-12 py-8 w-full" style={{ color: servicesTextColor }}>
              <div className="text-[20px] font-medium leading-[30px] w-full xl:max-w-[50%] prose prose-p:my-4 first:prose-p:mt-0 last:prose-p:mb-0">
                {parsedServicesDescription}
              </div>
              <div className="flex flex-col gap-8 xl:pl-16">
                {services.map((service, index) => (
                  <ServiceItem key={service} number={(index + 1).toString()} title={service} />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="pt-20">
          <AnimatedTitle text={`The ${title} Team`} className="font-semibold text-[36px] mb-5" />
          <TeamReveal members={members} />
        </div>
        <div>
          {caseStudiesForSlug.length > 0 ? (
            <>
              <AnimatedTitle text="Case Studies" className="font-semibold text-[36px] mb-8" />
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {caseStudiesForSlug.map((study: CaseStudy, index: number) => (
                  <motion.div key={index} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.2 }}>
                    <CaseStudyCard {...study} />
                  </motion.div>
                ))}
              </div>
            </>
          ) : null}
        </div>
      </div>
      <Footer bgColor={servicesBgColor} buttonIcon="/images/icons/ArrowUpLight.svg" />
    </>
  );
};

export default ExpertisePageClient;