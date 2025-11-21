"use client";

import { cn } from "@/lib/utils";

interface InitialsAvatarProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "size-8 text-xs",
  md: "size-9 text-sm",
  lg: "size-10 text-base",
};

export function InitialsAvatar({
  name,
  size = "md",
  className,
}: InitialsAvatarProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div
      className={cn(
        "rounded-full border-1 border-blue-500 bg-blue-50 flex items-center justify-center shrink-0",
        sizeClasses[size],
        className
      )}
    >
      <span className="font-semibold text-blue-500 leading-none">
        {initials}
      </span>
    </div>
  );
}

