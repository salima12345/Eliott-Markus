'use client';

import React, { useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import AnimatedTitle from "../ui/TitleReveal";
import Image from 'next/image';
import { useQuery } from '@apollo/client';
import { HOME_PAGE_QUERY } from "@/lib/graphql/queries/HomeQueries";
import { GET_REFERENCES } from "@/lib/graphql/queries/ReferenceQueries";

// Define types
interface WorkItemProps {
  title: string;
  index: number;
  onHover: (index: number | null) => void;
  slug: string;
}

interface ReferenceItem {
  title: string;
  image: string;
  slug: string;
}

interface HomePageNode {
  template: {
    templateName: string;
    home: {
      titleRealisations: string;
    };
  };
}

interface ReferenceNode {
  title: string;
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  slug: string;
  date: string; // Add date to the interface
}

// WorkItem component
const WorkItem: React.FC<WorkItemProps> = ({ title, index, onHover, slug }) => (
  <div
    className={`relative py-10 border-b-[0.5px] ${index === 0 ? 'border-y-[0.5px]' : 'border-b-[0.5px]'} border-foreground cursor-pointer group`}
    onMouseEnter={() => onHover(index)}
    onMouseLeave={() => onHover(null)}
  >
    <a href={`/References/${slug}`} className="block">
      <h4 className="text-[21px] xl:text-[26px] text-white font-medium opacity-60 group-hover:opacity-100 transition-opacity duration-500">
        {title}
      </h4>
    </a>
  </div>
);

// Main Realization component
function Realization() {
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const controls = useAnimation();

  // Fetch home page data
  const { data } = useQuery(HOME_PAGE_QUERY);

  // Check if data is loaded and available
  const homePageNode = data?.pages?.nodes?.find(
    (node: HomePageNode) => node.template?.templateName === "Home"
  );

  // Extract home page data
  const homeData = homePageNode?.template?.home;

  // Extract titleRealisations with a default value
  const titleRealisations = homeData?.titleRealisations || "";

  // Fetch references
  const { data: referencesData } = useQuery(GET_REFERENCES);

  // Sort references by date in descending order and get the most recent 3
  const items: ReferenceItem[] = referencesData?.references?.nodes
    ?.slice() // Create a copy of the array to avoid mutating the original
    .sort((a: ReferenceNode, b: ReferenceNode) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime(); // Sort by date descending
    })
    .slice(0, 3) // Get the first 3 items (most recent)
    .map((ref: ReferenceNode) => ({
      title: ref.title,
      image: ref.featuredImage?.node?.sourceUrl || '/default-image.jpg',
      slug: ref.slug
    })) || [];

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Handle hover animation
  useEffect(() => {
    controls.start({
      y: -280 * (hoverIndex ?? 0),
      transition: { duration: 0.3, ease: "easeInOut" },
    });
  }, [hoverIndex, controls]);

  return (
    <section className="container mt-10 py-8">
      {/* Animated title */}
      <AnimatedTitle text={titleRealisations} className="font-bold text-[21px] xl:text-[26px]" />

      {/* Image overlay on hover */}
      <motion.div
        className="fixed w-[385px] h-[280px] pointer-events-none z-30 overflow-hidden"
        style={{
          top: cursorPos.y,
          left: cursorPos.x,
          transform: "translate(-20%, -65%)",
        }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: hoverIndex === null ? 0 : 1,
          transition: { duration: 0.3 },
        }}
      >
        <motion.div
          style={{ position: 'relative' }}
          id="work-images"
          className="w-full h-[840px] flex flex-col"
          animate={controls}
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="work-image bg-cover bg-center w-full h-[280px]"
              style={{ backgroundImage: `url(${item.image})` }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* List of realizations */}
      <div className="w-full pt-8">
        <div className="flex flex-col">
          {items.map((item, index) => (
            <WorkItem
              key={index}
              title={item.title}
              index={index}
              onHover={setHoverIndex}
              slug={item.slug}
            />
          ))}
          {/* Link to see all realizations */}
          <div className="relative border-b-[0.5px] border-[#E0643A] cursor-pointer group">
            <a href="/references" className="block">
              <div className="flex items-center justify-between">
                <h4 className="text-[21px] xl:text-[26px] text-[#E0643A] font-medium transition-opacity duration-500">
                  See all our creations
                </h4>
                <Image
                  src="/images/icons/heart-arrow.svg"
                  alt=""
                  width={114}
                  height={114}
                  loading="lazy"
                  className="w-[114px] h-[114px]"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Realization;