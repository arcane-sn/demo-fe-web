import { ColumnDef } from "@tanstack/react-table";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { CircleCheck, CircleX } from "lucide-react";
import { PermissionData } from "../types/types";

const CheckboxIcon: React.FC<{ checked: boolean }> = ({ checked }) => (
  <div className="w-4 h-4 relative flex items-center justify-center">
    {checked ? (
      <CircleCheck className="w-4 h-4 text-green-600" />
    ) : (
      <CircleX className="w-4 h-4 text-red-600" />
    )}
  </div>
);

const ServiceCell: React.FC<{ service: string }> = ({ service }) => (
  <div className="text-[#252F4A] text-sm font-normal leading-[14px] py-2">
    {service}
  </div>
);

const PermissionNameCell: React.FC<{ permissionName: string }> = ({
  permissionName,
}) => (
  <div className="text-[#252F4A] text-sm font-normal leading-[14px]">
    {permissionName}
  </div>
);

const PermissionCell: React.FC<{ checked: boolean }> = ({ checked }) => (
  <div className="flex items-center justify-center">
    <CheckboxIcon checked={checked} />
  </div>
);

export const getPermissionColumns = (): ColumnDef<PermissionData>[] => [
  {
    id: "service",
    accessorKey: "service",
    header: ({ column }) => (
      <DataGridColumnHeader title="Service" column={column} />
    ),
    cell: ({ row }) => <ServiceCell service={row.original.service} />,
    enableSorting: true,
    size: 250,
  },
  {
    id: "permissionName",
    accessorKey: "permissionName",
    header: ({ column }) => (
      <DataGridColumnHeader title="Permission Name" column={column} />
    ),
    cell: ({ row }) => (
      <PermissionNameCell permissionName={row.original.permissionName} />
    ),
    enableSorting: true,
    size: 300,
  },
  {
    id: "create",
    accessorKey: "create",
    header: ({ column }) => (
      <DataGridColumnHeader title="Create" column={column} />
    ),
    cell: ({ row }) => <PermissionCell checked={row.original.create} />,
    enableSorting: true,
    size: 125,
  },
  {
    id: "read",
    accessorKey: "read",
    header: ({ column }) => (
      <DataGridColumnHeader title="Read" column={column} />
    ),
    cell: ({ row }) => <PermissionCell checked={row.original.read} />,
    enableSorting: true,
    size: 125,
  },
  {
    id: "update",
    accessorKey: "update",
    header: ({ column }) => (
      <DataGridColumnHeader title="Update" column={column} />
    ),
    cell: ({ row }) => <PermissionCell checked={row.original.update} />,
    enableSorting: true,
    size: 125,
  },
  {
    id: "delete",
    accessorKey: "delete",
    header: ({ column }) => (
      <DataGridColumnHeader title="Delete" column={column} />
    ),
    cell: ({ row }) => <PermissionCell checked={row.original.delete} />,
    enableSorting: true,
    size: 125,
  },
];
