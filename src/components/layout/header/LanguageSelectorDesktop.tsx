"use client";

import React, { useState } from "react";
import { useTheme } from "@/lib/themes";

export default function LanguageSelector() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  const toggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const bgColor = theme === "dark" ? "bg-grayDark text-white" : "bg-[#E6E5DF] text-black";

  return (
    <div 
      className="relative w-[54px] hidden xl:block pb-2" 
      data-testid="language-selector"
    >
      <div
        className={`absolute ${bgColor} rounded-full overflow-hidden cursor-pointer transition-all duration-300 ease-out`}
        style={{
          height: isExpanded ? "108px" : "54px",
          width: "54px",
        }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={toggleExpand}
      >
        <div className="h-[54px] flex items-center justify-center">
          <span className="font-medium text-sm">EN</span>
        </div>
        <div
          className="h-[54px] flex items-center justify-center transition-opacity duration-300 ease-out"
          style={{
            opacity: isExpanded ? 1 : 0,
            transitionDelay: isExpanded ? "0.2s" : "0s",
          }}
        >
          <span className="font-medium text-sm">FR</span>
        </div>
      </div>
    </div>
  );
}
