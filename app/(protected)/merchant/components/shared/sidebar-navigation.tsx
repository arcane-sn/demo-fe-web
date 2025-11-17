"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface SidebarSection {
  id: string;
  title: string;
}

interface SidebarNavigationProps {
  sections: SidebarSection[];
  className?: string;
}

export function SidebarNavigation({
  sections,
  className,
}: SidebarNavigationProps) {
  const [activeSection, setActiveSection] = useState<string>("");

  // In sidebar-navigation.tsx, update handleSectionClick:
  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - 80;

      // Check if we're in a dialog context
      const scrollContainer = element.closest(".overflow-y-auto");

      if (scrollContainer) {
        // We're in a dialog, scroll the container
        scrollContainer.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      } else {
        // We're on a regular page, scroll the window
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }

      setActiveSection(sectionId);
    }
  };

  // Auto-detect active section based on scroll position
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0px -50% 0px",
        threshold: 0.3,
      }
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <div className={cn("h-full ", className)}>
      <div className="space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.id;

          return (
            <div
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={cn(
                "cursor-pointer flex items-center gap-3 py-3 text-base font-normal transition-all duration-200 rounded-lg px-3",
                isActive
                  ? "text-blue-600 bg-gray-50"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              )}
            >
              <span className="flex w-2 h-2 relative">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-200",
                    isActive ? "bg-blue-600" : "bg-gray-300"
                  )}
                ></span>
              </span>
              {section.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
