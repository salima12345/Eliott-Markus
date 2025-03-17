"use client";
import React, { useCallback } from 'react';
import Expertise from '../layout/header/Expertise';
import MadeIn from '../layout/header/MadeIn';
import Button from '../ui/Button';
import { motion } from 'framer-motion';
import { MoveVertical } from 'lucide-react';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';

const extractTextFromHTML = (htmlString: string): string => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.body.textContent || '';
};

function AboutTop() {
  const { loading, error, data } = useQuery(HOME_PAGE_QUERY);

  const scrollToSection = useCallback(() => {
    const section = document.getElementById('about-bottom');
    const header = document.querySelector('header');
    const headerHeight = header?.offsetHeight || 0;

    if (section) {
      const top = section.offsetTop - headerHeight;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }
  }, []);

  if (loading) return <p></p>;
  if (error) return <p>Error: {error.message}</p>;

  const homePageNode = data.pages.nodes.find(
    (node: { template: { templateName: string } }) => node.template?.templateName === "Home"
  );

  const homeData = homePageNode.template.home;

  const titleText = extractTextFromHTML(homeData.titleHero);

  return (
    <section className="flex flex-col xl:flex-row xl:justify-between gap-24 w-full">
      <div className="overflow-hidden max-w-[535px] w-full 3xl:-ml-12">
        <motion.h1
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
          className="font-semibold leading-tight text-[60px] xl:text-[80px]"
        >
          {titleText}
        </motion.h1>
      </div>

      <div className="w-full">
        <div className="flex flex-col gap-5 overflow-hidden">
          <motion.p
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
            className="font-semibold text-[20px] sm:text-[24px] xl:text-[26px]"
          >
            {homeData.descriptionHero}
          </motion.p>

          <div className="w-[60px]">
            <Button
              Icon={MoveVertical}
              lightIconColor="#333333"
              darkIconColor="#ffffff"
              altText="Scroll to next section"
              onClick={scrollToSection}
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden block xl:hidden w-full">
        <div className="flex flex-col gap-4">
          <Expertise defaultExpanded={true} pushContent={true} />
          <MadeIn defaultExpanded={false} pushContent={true} />
        </div>
      </div>
    </section>
  );
}

export default AboutTop;