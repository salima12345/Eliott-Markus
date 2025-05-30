"use client";

import React, { useState, useEffect, useCallback } from "react";
import ExpandableSection from "./ExpandableSection";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useQuery } from "@apollo/client";
import { GET_EXPERTISES_MENU } from "@/lib/graphql/queries/ExpertiseQuery";
import { startTransition } from "react";

interface ExpertiseItem {
  icon: string;
  text: string;
  path: string;
  expertiseId: number;
}

interface ExpertiseProps {
  defaultExpanded?: boolean;
  pushContent?: boolean;
  isHeader?: boolean;
  isExpanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
  isMenuOpen?: boolean;
  onDataLoaded?: () => void; 
}

interface ExpertiseNode {
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  title: string;
  slug: string;
  expertiseId: number;
}

export default function Expertise({
  defaultExpanded = false,
  pushContent = false,
  isHeader = false,
  isExpanded,
  setExpanded,
  isMenuOpen = false,
  onDataLoaded,
}: ExpertiseProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prefetched, setPrefetched] = useState(false);

  const { data, loading, error } = useQuery(GET_EXPERTISES_MENU);

  const expertises: ExpertiseItem[] =
    data?.expertises?.nodes?.map((expertise: ExpertiseNode) => ({
      icon: expertise.featuredImage?.node?.sourceUrl || "/images/expertises/icons/default.svg",
      text: expertise.title,
      path: `/Expertise/${expertise.slug}`,
      expertiseId: expertise.expertiseId,
    })).reverse() || [];

  // Notify parent when data is loaded
  useEffect(() => {
    if (!loading && !error && data?.expertises?.nodes) {
      onDataLoaded?.();
    }
  }, [loading, error, data, onDataLoaded]);

  // Précharge les routes au hover ou au touch
  const handleHover = useCallback((path: string) => {
    if (!prefetched) {
      router.prefetch(path);
      setPrefetched(true);
    }
  }, [prefetched, router]);

  const handleClick = (e: React.MouseEvent, item: ExpertiseItem) => {
    e.stopPropagation();
    if (isNavigating || pathname === item.path) return;

    startTransition(() => {
      setIsNavigating(true);
      router.push(item.path);
    });
  };

  const renderExpertiseItem = (
    item: ExpertiseItem,
    index: number,
    totalItems: number
  ) => {
    const isActive = pathname === item.path;

    return (
      <div
        key={index}
        onMouseEnter={() => handleHover(item.path)}
        onTouchStart={() => handleHover(item.path)}
        className={`
          flex items-center gap-3 cursor-pointer px-5 
          transition-all duration-200 ease-in-out
          ${isNavigating ? "opacity-50 pointer-events-none" : "opacity-100"}
          ${index === totalItems - 1 ? "pb-4" : ""}
        `}
        onClick={(e) => handleClick(e, item)}
      >
        <div className="relative w-5 h-5">
          <Image
            src={item.icon}
            alt={item.text}
            fill
            className={`transition-transform duration-200 ${isActive ? "scale-110" : ""}`}
            style={{ objectFit: "contain" }}
          />
        </div>
        <p className={`font-medium transition-colors duration-200`}>
          {item.text}
        </p>
      </div>
    );
  };

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const hasData = !loading && !error && expertises.length > 0;
  const effectiveIsExpanded = hasData ? isExpanded : false;

  return (
    <ExpandableSection<ExpertiseItem>
      title="e&m expertise"
      items={expertises}
      renderItem={renderExpertiseItem}
      testId="expertise"
      defaultExpanded={defaultExpanded}
      pushContent={pushContent}
      isHeader={isHeader}
      isExpanded={effectiveIsExpanded}
      setExpanded={setExpanded}
      isMenuOpen={isMenuOpen}
      navigationState={{ isNavigating, targetPath: pathname }}
    />
  );
}