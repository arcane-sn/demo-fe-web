import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

interface NavigationTabProps {
  activeTab: "profile" | "security";
  onTabChange: (tab: "profile" | "security") => void;
  className?: string;
}

const NavigationTab: React.FC<NavigationTabProps> = ({
  activeTab,
  onTabChange,
  className,
}) => {
  useEffect(() => {
    console.log("activeTab", activeTab);
  }, [activeTab]);

  const handleTabChange = (value: string) => {
    // Only allow tab change if the tab is not currently active
    if (value !== activeTab) {
      onTabChange(value as "profile" | "security");
    }
  };

  return (
    <div className={cn("self-stretch", className)}>
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList
          variant="line"
          size="md"
          className="border-b border-[#F1F1F4] bg-transparent p-0 h-auto justify-start gap-[10px] pt-[14px]"
        >
          <TabsTrigger
            value="profile"
            className={cn(
              "pb-5 px-[10px] justify-center items-center gap-[4px] text-sm font-medium leading-[14px] break-words border-b-2 border-transparent data-[state=active]:border-[#1B84FF] data-[state=active]:text-[#1B84FF] text-[#4B5675] hover:text-[#1B84FF] hover:border-[#1B84FF]/30 transition-colors"
            )}
          >
            Profiles
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className={cn(
              "pb-5 px-[10px] justify-center items-center gap-[4px] text-sm font-medium leading-[14px] break-words border-b-2 border-transparent data-[state=active]:border-[#1B84FF] data-[state=active]:text-[#1B84FF] text-[#4B5675] hover:text-[#1B84FF] hover:border-[#1B84FF]/30 transition-colors"
            )}
          >
            Security
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </div>
  );
};

export default NavigationTab;
