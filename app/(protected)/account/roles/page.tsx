"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { UserCog, Users, Shield, CirclePlus } from "lucide-react";
import { rolesListData } from "./core/data/roles-list-data-mock";
import RolesItem from "./component/roles-item";
import { useRouter } from "next/navigation";

export default function RolesManagementPage() {
  const router = useRouter();

  const handleRoleClick = (roleId: string) => {
    router.push(`/account/roles/${roleId}`);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-row justify-between pb-8">
        <div className="">
          <h1 className="text-b-20-20-500 flex items-center gap-2">
            Account List
          </h1>
          <p className="text-B-14-14-400 text-[var(--color-gray-700)]">
            View and manage all registered accounts
          </p>
        </div>
        <div className="pl-6">
          <Button
            type="button"
            onClick={() => {
              console.log("pressed");
            }}
            disabled
          >
            <CirclePlus />
            Create New Account
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {rolesListData.map((item, index) => (
          <RolesItem
            key={item.id}
            {...item}
            onClick={() => handleRoleClick(item.id)}
          />
        ))}
      </div>
    </div>
  );
}
