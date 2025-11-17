import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
Dayjs.extend(utc); // Extend Dayjs with the UTC plugin

import { ColumnDef } from "@tanstack/react-table";
import { PermissionData } from "../types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Helper function to render date columns correctly
const renderDateCell = (dateString: string) => {
  // Parse the UTC string explicitly and convert to local time
  const localTime = Dayjs.utc(dateString).local();

  // Format the date part
  const formattedDate = localTime.format("ddd, MMM DD, YYYY");

  // Format the time part and get the local GMT/UTC offset (Z gives +HH:mm)
  const formattedTime = localTime.format("hh:mm:ss");
  const localOffset = localTime.format("Z");

  return (
    <div>
      <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
        {formattedDate}
      </p>
      <p className="text-B-11-12-400 text-[var(--color-gray-700)]">
        {formattedTime}
        {` (GMT ${localOffset})`}
      </p>
    </div>
  );
};

// Export a function that returns the columns array
export const getPermissionColumns = (): ColumnDef<PermissionData>[] => [
  {
    id: "service",
    accessorKey: "service",
    header: ({ column }) => (
      <DataGridColumnHeader title="Service" column={column} />
    ),
    cell: ({ row }) => (
      <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
        {row.original.service}
      </p>
    ),
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
      <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
        {row.original.permissionName}
      </p>
    ),
    enableSorting: true,
    size: 300,
  },
  {
    id: "createdBy",
    accessorKey: "createdBy",
    header: ({ column }) => (
      <DataGridColumnHeader title="Created by" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={row.original.createdBy.avatar}
            alt={row.original.createdBy.name}
          />
          <AvatarFallback>
            {row.original.createdBy.name
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-B-14-14-500 text-[var(--color-gray-900)]">
            {row.original.createdBy.name}
          </p>
          <p className="text-B-13-14-400 text-[var(--color-gray-700)]">
            {row.original.createdBy.email}
          </p>
        </div>
      </div>
    ),
    enableSorting: true,
    size: 250,
  },
  {
    id: "createdDate",
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataGridColumnHeader title="Created Date" column={column} />
    ),
    cell: ({ row }) => renderDateCell(row.original.createdDate),
    enableSorting: true,
    size: 168,
  },
  {
    id: "updatedDate",
    accessorKey: "updatedDate",
    header: ({ column }) => (
      <DataGridColumnHeader title="Updated Date" column={column} />
    ),
    cell: ({ row }) => renderDateCell(row.original.updatedDate),
    enableSorting: true,
    size: 168,
  },
];
