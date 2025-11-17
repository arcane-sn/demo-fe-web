"use client";

import React, { useMemo } from "react";
import { ReusableTable } from "@/components/table";
import {
  // PermissionsTableProps,
  // PermissionData,
  getPermissionColumns,
  headerConfig,
  footerConfig,
  getTableConfig,
} from "./core";
import { PermissionData, PermissionsTableProps } from "./core/types/types";

const PermissionsTable: React.FC<PermissionsTableProps> = ({ permissions }) => {
  // Transform permissions data
  const tableData: PermissionData[] = useMemo(
    () =>
      permissions.map((permission, index) => ({
        id: `${index}`,
        service: permission.service,
        permissionName: permission.permissionName,
        create: permission.create,
        read: permission.read,
        update: permission.update,
        delete: permission.delete,
      })),
    [permissions]
  );

  const columns = useMemo(() => getPermissionColumns(), []);
  const tableConfig = useMemo(() => getTableConfig(tableData), [tableData]);

  return (
    <div className="bg-white shadow-[0px_3px_4px_rgba(0,0,0,0.03)] rounded-xl border border-[#F1F1F4] overflow-hidden">
      <ReusableTable
        config={{ ...tableConfig, columns }}
        headerConfig={headerConfig}
        footerConfig={footerConfig}
        loading={false}
        error={undefined}
      />
    </div>
  );
};

export default PermissionsTable;
