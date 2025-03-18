"use client";

import React, { useEffect, useState, ReactNode } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "@/lib/themes";

interface ExpandableSectionProps<T> {
  title: string;
  items: T[];
  renderItem?: (item: T, index: number, totalItems: number) => ReactNode;
  className?: string;
  testId?: string;
  defaultExpanded?: boolean;
  pushContent?: boolean;
  isHeader?: boolean;
  isExpanded?: boolean;
  setExpanded?: (expanded: boolean) => void;
  isMenuOpen?: boolean;
  navigationState?: {
    isNavigating: boolean;
    targetPath: string;
  };
}

function ExpandableSection<T>({
  title,
  items,
  renderItem,
  className = "",
  testId,
  defaultExpanded = false,
  pushContent = false,
  isHeader = false,
  isExpanded: parentExpanded,
  setExpanded: parentSetExpanded,
  isMenuOpen = false,
  navigationState = { isNavigating: false, targetPath: '' },
}: ExpandableSectionProps<T>): React.JSX.Element {
  const { theme } = useTheme();
  const pathname = usePathname();
  const [localIsExpanded, setLocalIsExpanded] = useState(defaultExpanded);
  const [mounted, setMounted] = useState(false);

  const isControlled = parentExpanded !== undefined && parentSetExpanded !== undefined;
  const isExpanded = isControlled ? parentExpanded : localIsExpanded;

  useEffect(() => {
    setMounted(true);

    // Auto-expand when menu opens if not controlled
    if (isMenuOpen && !isControlled) {
      setLocalIsExpanded(true);
    }
  }, [isMenuOpen, isControlled]);

  if (!mounted) {
    return (
      <div className="relative" data-testid={testId}>
        <div className="w-[290px] h-[56px]"></div>
      </div>
    );
  }

  const toggleExpand = (e: React.MouseEvent) => {
    const clickedElement = e.target as HTMLElement;
    if (clickedElement.closest('a') || clickedElement.closest('link') || navigationState.isNavigating) {
      return;
    }

    const newExpandedState = !isExpanded;
    if (isControlled) {
      parentSetExpanded(newExpandedState);
    } else {
      setLocalIsExpanded(newExpandedState);
    }
  };

  return (
    <div className={`relative ${pushContent ? "mb-4" : ""}`} data-testid={testId}>
      <div
        className={`${
          pushContent ? "" : "absolute z-[50]"
        } xl:w-[287px] w-full overflow-hidden rounded-[26px] transition-colors duration-300
        ${theme === 'dark' ? 'bg-grayDark text-white' : 'bg-[#E6E5DF] text-black'}
        ${className}`}
        style={{
          zIndex: isExpanded ? 10 : "auto",
        }}
        onClick={toggleExpand}
      >
        <button
          className={`w-full h-[56px] px-6 py-4 flex items-center justify-between cursor-pointer
          ${theme ==='dark' ? 'bg-grayDark text-white' : 'bg-[#E6E5DF] text-black'}`}
          aria-expanded={isExpanded}
          aria-controls={`${testId}-content`}
        >
          <p>{title}</p>
          <Image
            src={theme === 'dark' ? "/images/icons/arrow-circle.svg" : "/images/icons/arrow-circle-black.svg"}
            width={16}
            height={16}
            className={`transform ${isExpanded ? "rotate-180" : ""}`}
            style={{
              transition: navigationState.isNavigating ? "none" : "transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            alt={isExpanded ? "Collapse" : "Expand"}
            priority={true}
          />
        </button>

        <div
          id={`${testId}-content`}
          className="flex flex-col gap-5 origin-top"
          style={{
            maxHeight: isExpanded ? `${items.length * 50 + 20}px` : "0px",
            opacity: isExpanded ? 1 : 0,
            visibility: isExpanded ? "visible" : "hidden",
            transition: navigationState.isNavigating 
              ? "none"
              : `
                max-height 0.7s cubic-bezier(0.4, 0, 0.2, 1),
                opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1),
                visibility 0.5s cubic-bezier(0.4, 0, 0.2, 1)
              `,
            pointerEvents: isExpanded ? "auto" : "none"
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {items.map((item, index) =>
            renderItem ? (
              <div key={index} data-nav-item>
                {renderItem(item, index, items.length)}
              </div>
            ) : (
              <div
                key={index}
                className={`px-5 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              >
                {JSON.stringify(item)}
              </div>
            )
          )}
        </div>
      </div>

      {!pushContent && <div className="w-[287px] h-[56px] invisible"></div>}
    </div>
  );
}

export default ExpandableSection;