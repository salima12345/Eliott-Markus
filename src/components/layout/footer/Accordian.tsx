"use client";

import React, {
  useState,
  createContext,
  useContext,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import Image from "next/image";
import { useTheme } from "@/lib/themes";

type AccordionContextType = {
  expandedItem: string | null;
  setExpandedItem: (item: string | null) => void;
};

const AccordionContext = createContext<AccordionContextType | undefined>(undefined);

interface AccordionProps {
  children: ReactNode;
  className?: string;
  defaultExpandedItem?: string;
}

export function Accordion({
  children,
  className = "",
  defaultExpandedItem,
}: AccordionProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(
    defaultExpandedItem || null
  );

  const handleSetExpandedItem = (item: string | null) => {
    setExpandedItem((prevItem) => (prevItem === item ? null : item));
  };

  return (
    <AccordionContext.Provider
      value={{ expandedItem, setExpandedItem: handleSetExpandedItem }}
    >
      <div className={`space-y-2 ${className}`}>{children}</div>
    </AccordionContext.Provider>
  );
}

interface AccordionItemProps {
  value: string;
  children: ReactNode;
}

export function AccordionItem({ value, children }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  if (!context) throw new Error("AccordionItem must be used within an Accordion");
  const { expandedItem, setExpandedItem } = context;
  const isExpanded = expandedItem === value;

  const toggleItem = () => {
    setExpandedItem(isExpanded ? null : value);
  };

  return (
    <div className="rounded-[27px] overflow-hidden w-full xl:max-w-[290px]">
      {React.Children.map(children, (child) => {
        if (React.isValidElement<AccordionTriggerProps>(child)) {
          return React.cloneElement(child, {
            isExpanded,
            toggleItem,
          });
        }
        return child;
      })}
    </div>
  );
}

interface AccordionTriggerProps {
  children: ReactNode;
  isExpanded?: boolean;
  toggleItem?: () => void;
  showPlaceholder?: boolean;
}

export function AccordionTrigger({
  children,
  isExpanded,
  toggleItem,
  showPlaceholder = false,
}: AccordionTriggerProps) {
  const { theme } = useTheme(); 
  const bgColor = theme === "dark" ? "bg-grayDark text-white" : "bg-[#E6E5DF] text-black";
  const arrowIcon =
    theme === "dark"
      ? "/images/icons/arrow-circle.svg"
      : "/images/icons/arrow-circle-black.svg";

  return (
    <button
      className={`flex justify-between items-center w-full px-6 ${
        isExpanded ? "pt-4" : "py-4"
      } text-left transition-colors font-medium ${bgColor}`}
      onClick={toggleItem}
    >
      {children}
      {showPlaceholder && !isExpanded && <div className="w-[16px] h-[16px]" />}
      {(!showPlaceholder || isExpanded) && (
        <Image
          src={arrowIcon}
          width={16}
          height={16}
          className={`transform transition-transform duration-700 ease-in-out ${
            isExpanded ? "rotate-180" : ""
          }`}
          alt="Arrow Icon"
        />
      )}
    </button>
  );
}

interface AccordionContentProps {
  children: ReactNode;
  isExpanded?: boolean;
  className?: string;
}

export function AccordionContent({ children, isExpanded, className }: AccordionContentProps) {
  const { theme } = useTheme(); 
  const bgColor = theme === "dark" ? "bg-grayDark" : "bg-[#E6E5DF]";
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [children]);

  return (
    <div
      style={{
        maxHeight: isExpanded ? `${contentHeight}px` : "0",
        transition: "max-height 0.7s ease-in-out",
        overflow: "hidden",
      }}
      className={className}
    >
      <div ref={contentRef} className={`px-6 py-4 ${bgColor}`}>
        {children}
      </div>
    </div>
  );
}
