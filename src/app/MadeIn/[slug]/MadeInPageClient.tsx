'use client';
import React from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import AnimatedTitle from '@/components/ui/TitleReveal';
import Button from '@/components/ui/Button';
import Footer from '@/components/layout/footer';
import { MoveVertical } from 'lucide-react';
import parse from 'html-react-parser';
import Header from '@/components/layout/header';

interface Service {
  title: string;
}

interface PageContent {
  subtitle: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  description: string[];
  services: Service[];
}

const MadeInPageClient: React.FC<{ content: PageContent }> = ({ content }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const imageRef = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const { subtitle, title, imageSrc, imageAlt, description, services } = content;

  const imageVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 1.5, ease: "easeOut" } },
  };

  const parsedDescription = React.useMemo(() => {
    return description.map((paragraph) =>
      parse(paragraph, {
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
      })
    );
  }, [description]);

  const handleScrollToNextSection = () => {
    const nextSection = document.getElementById('services-section');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
    <Header/>
      <div className="py-8 mt-10">
        <div className="container flex items-end justify-between">
          <div className="flex flex-col gap-4">
            <AnimatedTitle text={subtitle} className="font-semibold text-[14px]" />
            <div className="overflow-hidden min-h-[60px]">
              <motion.h5
                style={{ position: 'relative' }}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-[56px]"
              >
                {title}
              </motion.h5>
            </div>
          </div>
          <div className="w-[60px]">
            <Button
              Icon={MoveVertical}
              lightIconColor="#333333"
              darkIconColor="#ffffff"
              altText="arrow icon"
              onClick={handleScrollToNextSection}
            />
          </div>
        </div>
        <div id='services-section' className="relative mt-8 mx-4 2xl:mx-12 w-auto h-[255px] xl:h-[344px] overflow-hidden rounded-lg">
          <motion.div
            style={{ position: 'relative' }}
            ref={imageRef}
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="h-full w-full relative"
          >
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              className="rounded-lg object-cover"
            />
          </motion.div>
        </div>
        <motion.div
          style={{ position: 'relative' }}
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="container"
        >
          <div className="mt-10 flex flex-col xl:flex-row items-start justify-center gap-10 w-full xl:max-w-6xl mx-auto">
            <div className="text-[20px] font-medium leading-[30px] w-full xl:max-w-xl">
              {parsedDescription}
            </div>
            <div className="flex flex-col gap-3">
              {services.map((service) => (
                <div key={service.title} className="flex items-center gap-2">
                  <p className="text-sm relative -top-1 font-bold">
                    {(services.indexOf(service) + 1).toString().padStart(2, "0")}
                  </p>
                  <p className="text-[20px] font-bold">{service.title}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default MadeInPageClient;