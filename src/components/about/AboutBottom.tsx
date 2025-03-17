'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from '@/lib/graphql/queries/HomeQueries';
import parse from 'html-react-parser';

interface AnimatedNumberProps {
  targetValue: number;
  duration?: number;
  shouldStart: boolean;
}

function AnimatedNumber({ targetValue, duration = 2000, shouldStart }: AnimatedNumberProps) {
  const [value, setValue] = useState(0);
  const animationRef = useRef<number>();
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimated.current) {
      return;
    }

    let start = 0;
    const startTime = performance.now();
    hasAnimated.current = true;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      start = targetValue * progress;

      if (progress >= 1) {
        setValue(targetValue);
        return;
      }

      setValue(Math.floor(start));
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [targetValue, duration, shouldStart]);

  return <p className="font-semibold text-[26px]">{value}</p>;
}

interface StatCardProps {
  title: string;
  value: number;
  staticValue?: boolean;
  isOrdinal?: boolean;
  triggerAnimation: boolean;
}

function StatCard({ title, value, staticValue = false, isOrdinal = false, triggerAnimation }: StatCardProps) {
  const displayValue = isOrdinal && value === 1 ? (
    <span className="inline-flex items-start">
      1<sup className="leading-none pt-3 align-top">st</sup>
    </span>
  ) : (
    value
  );

  return (
    <div className="flex flex-col gap-3 py-2 border-t-2 border-foreground w-full min-w-[186px] h-[124px]">
      {staticValue ? (
        <p className="font-semibold text-[26px]">{displayValue}</p>
      ) : (
        <AnimatedNumber
          targetValue={value}
          shouldStart={triggerAnimation}
          duration={2000}
        />
      )}
      <h4 className="font-semibold text-[26px]">{title}</h4>
    </div>
  );
}

function AboutBottom() {
  const [hasTriggered, setHasTriggered] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const controls = useAnimation();

  const { data, loading, error } = useQuery(HOME_PAGE_QUERY);

  const ecosystemData = data?.options?.ecosystem || {};
  const homePageData = data?.pages?.nodes?.find((node: { template: { templateName: string } }) =>
    node.template?.templateName === "Home"
  )?.template?.home || {};

  const parseSafe = (val: string | number | undefined | null): number => {
    if (typeof val === 'string') {
      const cleanedValue = val.replace(/\D/g, '');
      return parseInt(cleanedValue) || 0;
    }
    if (typeof val === 'number') return val;
    return 0;
  };

  useEffect(() => {
    const currentRef = sectionRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          controls.start({
            y: 0,
            opacity: 1,
            transition: { duration: 0.8, ease: "easeInOut" }
          });
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    observer.observe(currentRef);

    return () => observer.unobserve(currentRef);
  }, [controls, hasTriggered, data]);

  if (loading) return <div className="h-[500px] flex items-center justify-center"></div>;
  if (error) return <div className="h-[500px] flex items-center justify-center text-red-500">Erreur : {error.message}</div>;

  return (
    <motion.section
      ref={sectionRef}
      id="about-bottom"
      className="flex justify-end w-full mt-16"
      initial={{ y: 40, opacity: 0 }}
      animate={controls}
    >
      <div className="flex-1" />
      <div className="flex flex-col xl:max-w-[782px] w-full">
        <div className="text-2xl leading-[34px] space-y-4">
          {parse(
            (homePageData.descriptionAbout || "Texte par défaut...")
              .replace(/<p>/g, '<p class="mb-4">')
          )}
        </div>

        <div className="flex flex-col xl:flex-row items-center gap-5 pt-6">
          <StatCard
            title="Consultants and Experts"
            value={parseSafe(ecosystemData.consultantsEtExperts)}
            triggerAnimation={hasTriggered}
          />
          <StatCard
            title="References"
            value={parseSafe(ecosystemData.references)}
            triggerAnimation={hasTriggered}
          />
          <StatCard
            title="Continents"
            value={parseSafe(ecosystemData.continents)}
            triggerAnimation={hasTriggered}
          />
          <StatCard
            title="Ranked as Leading"
            value={1}
            staticValue
            isOrdinal
            triggerAnimation={hasTriggered}
          />
        </div>
      </div>
    </motion.section>
  );
}

export default AboutBottom;