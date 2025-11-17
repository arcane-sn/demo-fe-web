"use client";

import Image from "next/image";
import { useState } from "react";

interface CardSelectionProps {
  format: "pdf" | "csv" | "xls";
  label: string;
  icon: string;
  selected?: boolean;
  onClick?: (format: string) => void;
  className?: string;
}

const CardSelection = ({
  format,
  label,
  icon,
  selected = false,
  onClick,
  className = "",
}: CardSelectionProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    onClick?.(format);
  };

  const getCardStyles = () => {
    if (selected) {
      return "bg-blue-50 outline-blue-500";
    }
    if (isHovered) {
      return "bg-gray-50 outline-gray-300";
    }
    return "bg-white outline-zinc-200";
  };

  return (
    <div
      className={`flex-1 h-40 rounded-xl shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] outline-1 outline-offset-[-1px] inline-flex flex-col justify-center items-center gap-2.5 cursor-pointer transition-all duration-200 ${getCardStyles()} ${className}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-36 self-stretch h-40 flex flex-col justify-center items-center gap-2.5 overflow-hidden">
        <Image src="/assets/image/export-bg.png" alt="export-bg" fill />
        <Image
          className="w-7 h-9 z-10"
          src={icon}
          alt={format}
          width={28}
          height={36}
        />
        <div className="z-10 text-center justify-start text-slate-900 text-base font-medium font-['Inter'] leading-none">
          {label}
        </div>
      </div>
    </div>
  );
};

export default CardSelection;
