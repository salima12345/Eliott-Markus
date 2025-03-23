"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useQuery } from "@apollo/client";
import { GET_ALL_MADE_IN_MENU } from "@/lib/graphql/queries/MadeInQueries";

interface MadeMenuProps {
  selectedItem: string;
  onSelect: (value: string) => void;
}

interface MadeInNode {
  featuredImage: {
    node: {
      sourceUrl: string;
    };
  };
  title: string;
  slug: string;
  id: number;
}

const MadeMenu: React.FC<MadeMenuProps> = ({ selectedItem, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const { data, loading, error } = useQuery(GET_ALL_MADE_IN_MENU);

  const items = data?.allMadeInEM?.nodes?.map((madeIn: MadeInNode) => ({
    icon: madeIn.featuredImage?.node?.sourceUrl || "/images/icons/default.svg",
    text: madeIn.title,
    id: madeIn.id,
  })) || [];

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [items]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleItemSelect = (item: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(item);
    setIsExpanded(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="relative group">
      <div className="bg-grayDark xl:w-[287px] w-full rounded-[26px] border border-[#2e2e2e]">
        <button
          type="button"
          className="w-full h-[50px] px-6 py-2 flex items-center justify-between"
          onClick={toggleExpand}
          aria-expanded={isExpanded}
        >
          <p
            className={`${
              selectedItem === "Made in em *" ? "text-[#454545]" : "text-white"
            }`}
          >
            {selectedItem}
          </p>
          <Image
            src="/images/icons/arrow-circle.svg"
            width={16}
            height={16}
            className={`transform transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
            alt={isExpanded ? "Collapse" : "Expand"}
          />
        </button>

        <div
          ref={contentRef}
          className="overflow-hidden transition-all duration-300 ease-in-out"
          style={{
            maxHeight: isExpanded ? `${contentHeight}px` : "0px",
            opacity: isExpanded ? 1 : 0,
            visibility: isExpanded ? "visible" : "hidden",
          }}
        >
            {items.map((item: { id: number; text: string }) => (
            <button
              key={item.id}
              type="button"
              className="w-full px-6 py-4 text-left transition-colors"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleItemSelect(item.text, e)}
            >
              {item.text}
            </button>
            ))}
        </div>
      </div>
    </div>
  );
};

export default MadeMenu;