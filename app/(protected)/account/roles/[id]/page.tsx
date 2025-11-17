"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { rolesListData } from "../core/data/roles-list-data-mock";
import { RoleListProps } from "../core/types/role-list";
import PermissionsTable from "./component/permissions-table";
import RoleLogSection from "./component/role-log-section";

export default function RoleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const roleId = params.id as string;

  // Find the role data by ID
  const roleData = rolesListData.find((role) => role.id === roleId);

  if (!roleData) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Role Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            The role you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      {/* Title Section */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="text-[#071437] text-xl font-semibold leading-5">
          {roleData.name}
        </div>
        <div className="text-[#4B5675] text-sm font-normal leading-[14px]">
          {roleData.type.charAt(0).toUpperCase() + roleData.type.slice(1)}
        </div>
      </div>

      {/* Permissions Table */}
      <div className="mb-8">
        <PermissionsTable permissions={roleData.permissions} />
      </div>

      {/* Log Section */}
      <div>
        <RoleLogSection roleData={roleData as RoleListProps} />
      </div>
    </div>
  );
}
