import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, SquareChevronRight } from "lucide-react";
import Image from "next/image";
import React from "react";

interface RolesItemProps {
  name: string;
  type: string;
  description: string;
  asignUser: number;
  icon: string;
  onClick: () => void;
}
const RolesItem: React.FC<RolesItemProps> = ({
  name,
  type,
  description,
  asignUser,
  icon,
  onClick,
}) => {
  return (
    <Card onClick={onClick}>
      <CardContent>
        <div className="flex flex-row gap-2 ">
          <div className="relative w-[44px] h-[44px] mb-4 ">
            <Image src={icon} fill alt={name} className="object-contain" />
          </div>
          <div className="flex flex-row justify-between pt-2 w-full">
            <div className="">
              <p className="text-b-15-16-500 text-[var(--color-gray-900)]">
                {name}
              </p>
              <p className="text-b-13-14-400 text-[var(--color-gray-700)]">
                {type}
              </p>
            </div>
            <div>
              <SquareChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
        </div>

        <p className="text-b-13-20-400 text-[var(--color-gray-700)] pb-8">
          {description}
        </p>
        <p className="text-b-13-14-400 text-[var(--color-gray-800)]">
          {asignUser} person
        </p>
      </CardContent>
    </Card>
  );
};

export default RolesItem;
