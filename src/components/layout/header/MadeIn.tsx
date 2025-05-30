"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import ExpandableSection from "./ExpandableSection";
import { useQuery } from "@apollo/client";
import { startTransition } from "react";
import { GET_ALL_MADE_IN_MENU } from "@/lib/graphql/queries/MadeInQueries";

interface MadeInItem {
  title: string;
  slug: string;
  path: string;
  id: string;
}

interface MadeInProps {
  defaultExpanded?: boolean;
  pushContent?: boolean;
  isHeader?: boolean;
  isExpanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
  isMenuOpen?: boolean;
  onDataLoaded?: () => void; 
}

interface MadeInNode {
  title: string;
  slug: string;
  id: string;
}

export default function MadeIn({
  defaultExpanded = false,
  pushContent = false,
  isHeader = false,
  isExpanded,
  setExpanded,
  isMenuOpen = false,
  onDataLoaded,
}: MadeInProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [prefetched, setPrefetched] = useState(false);

  const { data, loading, error } = useQuery(GET_ALL_MADE_IN_MENU);

  const madeInItems: MadeInItem[] =
    data?.allMadeInEM?.nodes?.map((item: MadeInNode) => ({
      title: item.title,
      slug: item.slug,
      path: `/MadeIn/${item.slug}`,
      id: item.id,
    })).reverse() || [];

  // Notify parent when data is loaded
  useEffect(() => {
    if (!loading && !error && data?.allMadeInEM?.nodes) {
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

  const handleClick = (e: React.MouseEvent, item: MadeInItem) => {
    e.stopPropagation();
    if (isNavigating || pathname === item.path) return;

    startTransition(() => {
      setIsNavigating(true);
      router.push(item.path);
    });
  };

  const renderMadeInItem = (
    item: MadeInItem,
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
          group relative flex items-center gap-3 cursor-pointer px-5 
          transition-all duration-200 ease-in-out
          ${isNavigating ? "opacity-50 pointer-events-none" : "opacity-100"}
          ${index === totalItems - 1 ? "pb-4" : ""}
        `}
        onClick={(e) => handleClick(e, item)}
      >
        <p className={`font-semibold ${isActive ? "text-[#E0643A]" : ""}`}>
          {item.title}
        </p>
        <div className="absolute top-0 right-0 h-full bg-[#E0643A] rounded-l-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-[5px]"></div>
      </div>
    );
  };

  useEffect(() => {
    setIsNavigating(false);
  }, [pathname]);

  const hasData = !loading && !error && madeInItems.length > 0;
  const effectiveIsExpanded = hasData ? isExpanded : false;

  return (
    <ExpandableSection<MadeInItem>
      title="Made in e&m"
      items={madeInItems}
      renderItem={renderMadeInItem}
      testId="made-in"
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