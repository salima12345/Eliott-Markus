import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export enum Expertise {
  Strategy = "Strategy",
  Content = "Content",
  Design = "Design",
  TechWeb = "Tech/Web",
  DigitalInfluence = "Digital Influence",
  Consulting = "Consulting",
  Other = "Other"
}

interface ExpertiseMenuProps {
  selectedItem: string;
  onSelect: (value: Expertise) => void;
}

const ExpertiseMenu: React.FC<ExpertiseMenuProps> = ({ selectedItem, onSelect }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const items = Object.values(Expertise);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, []);

  const toggleExpand = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  const handleItemSelect = (item: Expertise, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onSelect(item);
    setIsExpanded(false);
  };

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
              selectedItem === "E&M expertise *" ? "text-[#454545]" : "text-white"
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
          {items.map((item) => (
            <button
              key={item}
              type="button"
              className="w-full px-6 py-4 text-left transition-colors "
              onClick={(e) => handleItemSelect(item, e)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExpertiseMenu;