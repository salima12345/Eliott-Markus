"use client";

import React from "react";
import MagneticButton from "./MagneticButton";
import { useTheme } from "@/lib/themes";
import { LucideIcon } from "lucide-react";

interface ButtonProps {
  Icon: LucideIcon;
  altText: string;
  onClick?: () => void;
  iconSize?: number;
  text?: string;
  isFixedSize?: boolean;
  buttonSize?: string;
  lightIconColor?: string;
  darkIconColor?: string;
}

const Button: React.FC<ButtonProps> = ({
  Icon,
  altText,
  onClick,
  iconSize = 16,
  text,
  isFixedSize = true,
  lightIconColor = "black",
  darkIconColor = "white"
}) => {
  const { theme } = useTheme();

  const iconColor = theme === "dark" ? darkIconColor : lightIconColor;

  return (
    <MagneticButton>
      <button
        className={`flex items-center justify-center gap-2 rounded-full
          ${theme === "dark" ? "bg-grayDark text-white" : "bg-[#E6E5DF] text-black"}
          ${isFixedSize ? "w-14 h-14" : "px-5 py-4"}`
        }
        onClick={onClick}
        title={altText}
      >
        <Icon size={iconSize} color={iconColor} />
        
        {text && <span className="text-sm ">{text}</span>}
      </button>
    </MagneticButton>
  );
};

export default Button;