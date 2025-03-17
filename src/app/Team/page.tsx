"use client";

import React, { useState, useRef, useMemo } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring } from "framer-motion";
import AnimatedTitle from "@/components/ui/TitleReveal";
import TeamReveal from "@/components/TeamReveal";
import Footer from "@/components/layout/footer";
import { useLenis } from "@studio-freight/react-lenis";
import type Lenis from "@studio-freight/lenis/types";
import { useQuery } from "@apollo/client";
import { GET_TALENTS_PAGE, GET_TALENTS } from "@/lib/graphql/queries/TalentsQueries";
import { GET_EXPERTISES } from "@/lib/graphql/queries/ExpertiseQuery";

type Talent = {
  id: string;
  talentId: string;
  slug: string;
  title: string;
  featuredImage?: {
    node?: {
      sourceUrl?: string;
    };
  };
  singleTalent?: {
    hasBio?: boolean;
    linkedin?: string;
    mail?: string;
    quote?: string;
    twitter?: string;
    status?: string;
  };
};

type Expertise = {
  id: string;
  title: string;
  singleExpertises: {
    team: {
      nodes: Array<{ id: string }>;
    };
  };
};

type TalentsPage = {
  template?: {
    templateName?: string; 
    talentsPage?: {
      title?: string;
      subtitle?: string;
      description?: string;
    };
  };
};



const Team = () => {
  const [activeCategory, setActiveCategory] = useState("ALL");
  const imageRef = useRef(null);
  const teamSectionRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useLenis((lenis) => {
    lenisRef.current = lenis;
  });

  const { data: talentsPageData } = useQuery<{ pages: { nodes: TalentsPage[] } }>(GET_TALENTS_PAGE);
  const { data: expertisesData } = useQuery<{ expertises: { nodes: Expertise[] } }>(GET_EXPERTISES);
  const { data: talentsData } = useQuery<{ talents: { nodes: Talent[] } }>(GET_TALENTS);

  const talentsPageNode = talentsPageData?.pages?.nodes?.find(
    (node) => node.template?.templateName === "Talents"
  );
  const pageContent = talentsPageNode?.template?.talentsPage || {};

  const talentsMap = useMemo(() => {
    return talentsData?.talents?.nodes?.reduce((acc: Record<string, Talent>, talent) => {
      acc[talent.id] = talent;
      return acc;
    }, {}) || {};
  }, [talentsData]);

  const expertisesCategories = useMemo(() => {
    return expertisesData?.expertises?.nodes?.map((expertise) => ({
      name: expertise.title,
      members: expertise.singleExpertises.team.nodes
        .map((node) => talentsMap[node.id])
        .filter(Boolean),
    })) || [];
  }, [expertisesData, talentsMap]);

  const categories = useMemo(
    () => [
      {
        name: "ALL",
        members: talentsData?.talents?.nodes || [],
      },
      ...expertisesCategories,
    ],
    [expertisesCategories, talentsData]
  );

  const activeMembers = useMemo(() => {
    if (activeCategory === "ALL") {
      return [...(categories[0].members || [])].reverse();
    }
    return categories.find((c) => c.name === activeCategory)?.members || [];
  }, [activeCategory, categories]);

  const transformedMembers = useMemo(
    () =>
      activeMembers.map((member) => ({
        id: member.id,
        image: member.featuredImage?.node?.sourceUrl,
        name: member.title,
        jobTitle: member.singleTalent?.status || "",
        hasBiography: member.singleTalent?.hasBio || false,
        slug: member.slug,
      })),
    [activeMembers]
  );

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);

    if (lenisRef.current && teamSectionRef.current) {
      const sectionTop = teamSectionRef.current.offsetTop - 120;
      lenisRef.current.scrollTo(sectionTop, {
        duration: 2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    }
  };

  if (!talentsPageData || !expertisesData || !talentsData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#222]"></div>
      </div>
    );
  }
  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1  z-50 origin-left"
        style={{ scaleX }}
      />
      <main className="min-h-screen">
        <section className="flex flex-col">
          <div className="pt-10">
            <div className="container mx-auto max-w-[1200px] px-4">
              <div className="flex flex-col">
                <AnimatedTitle
                  text={pageContent?.title || "Talents"}
                  className="font-semibold text-sm pb-5 text-[#222]"
                />
                <div className="flex flex-col xl:flex-row gap-6 xl:gap-15 mt-6">
                  <div className="xl:min-w-[590px]">
                    <motion.h1
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                      className="font-semibold text-3xl xl:text-4xl text-[#222]"
                    >
                      <small>{pageContent?.subtitle || "We are eliott & markus"}</small>
                    </motion.h1>
                  </div>
                  <div className="xl:min-w-[489px]">
                    <motion.div
                      initial={{ y: "100%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 2, ease: [0.33, 1, 0.68, 1] }}
                      className="text-base font-medium text-[#222]"
                      dangerouslySetInnerHTML={{
                        __html:
                          pageContent?.description ||
                          "eliott & markus is a community of talented people...",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-[90%] h-[350px] mx-auto my-10 overflow-hidden rounded-lg">
            <motion.div
              ref={imageRef}
              initial={{ y: "-100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full w-full relative"
            >
              <Image
                src="https://www.eliott-markus.com/wp-content/uploads/2023/05/talent-bg-scaled.jpg.webp"
                alt="Team"
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </div>

          <div ref={teamSectionRef} className="px-4 mt-24 mx-auto">
  <div className="flex flex-col xl:flex-row gap-10 xl:gap-24">
    {/* Category Filters */}
    <div className="w-auto xl:sticky xl:top-28 self-start">
      <ul className="flex flex-row xl:flex-col flex-wrap gap-3">
        {categories.map((category) => (
          <motion.li
            key={category.name}
            onClick={() => handleCategoryClick(category.name)}
            className={`inline-block  py-2 rounded-full cursor-pointer text-sm font-medium transition-all duration-300 h-10 text-center ${
              activeCategory === category.name
                ? "bg-[#222] text-[#E6E5DF]"
                : "bg-[#E6E5DF] hover:bg-[#E6E5DF]/80"
            }`}
            style={{
              width: `max(${category.name.length * 10}px, ${
                category.name.length * 8
              }px + 32px)`,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category.name}
          </motion.li>
        ))}
      </ul>
    </div>

    {/* TeamReveal Component */}
    <div className="flex-grow">
      <TeamReveal members={transformedMembers} />
    </div>
  </div>
</div>
        </section>
        <Footer />
      </main>
    </>
  );
};

export default Team;