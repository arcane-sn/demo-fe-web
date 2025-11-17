import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
Dayjs.extend(utc); // Extend Dayjs with the UTC plugin

import { ColumnDef } from "@tanstack/react-table";
import { UserData } from "../types";
import { DataGridColumnHeader } from "@/components/ui/data-grid-column-header";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Badge, BadgeDot } from "@/components/ui/badge";
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

// Define the required props for the columns function
export interface UserColumnsProps {
  copyToClipboard: (text: string) => void;
}

// Export a function that returns the columns array
export const getUserColumns = ({
  copyToClipboard,
}: UserColumnsProps): ColumnDef<UserData>[] => [
  {
    id: "userID",
    accessorKey: "userID",
    header: ({ column }) => (
      <DataGridColumnHeader title="user ID" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
          {row.original.userID}
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
          onClick={() => {
            copyToClipboard(row.original.userID);
            toast.success("User ID copied to clipboard");
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    ),
    enableSorting: true,
    size: 200,
  },
  {
    id: "account",
    // NOTE: This column uses properties, so we must access them individually.
    // Setting `accessorKey` to a non-existent field like "account" is fine
    // as long as you use the `cell` function to render the data.
    header: ({ column }) => (
      <DataGridColumnHeader title="Account" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex">
        <div className="pr-4">
          <Avatar>
            <AvatarImage
              src="https://png.pngtree.com/png-clipart/20190924/original/pngtree-vector-user-young-boy-avatar-icon-png-image_4827810.jpg"
              alt="@reui"
            />
            <AvatarFallback>CH</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <p className="text-B-14-14-500 text-[var(--color-gray-900)]">
            {row.original.name}
          </p>
          <p className="text-B-13-14-400 text-[var(--color-gray-700)]">
            {row.original.email}
          </p>
        </div>
      </div>
    ),
    enableSorting: true,
    size: 300,
  },
  {
    id: "userName",
    accessorKey: "userName",
    header: ({ column }) => (
      <DataGridColumnHeader title="User Name" column={column} />
    ),
    cell: ({ row }) => (
      <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
        {row.original.userName}
      </p>
    ),
    enableSorting: true,
    size: 140,
  },
  {
    id: "phoneNumber",
    accessorKey: "phoneNumber",
    header: ({ column }) => (
      <DataGridColumnHeader title="Phone Number" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
          {row.original.phoneNumber}
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
          onClick={() => {
            copyToClipboard(row.original.phoneNumber);
            toast.success("Phone Number copied to clipboard");
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    ),
    enableSorting: true,
    size: 140,
  },
  {
    id: "accessLevel",
    accessorKey: "accessLevel",
    header: ({ column }) => (
      <DataGridColumnHeader title="Access Level" column={column} />
    ),
    cell: ({ row }) => (
      <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
        {row.original.accessLevel}
      </p>
    ),
    enableSorting: true,
    size: 140,
  },
  {
    id: "role",
    accessorKey: "role",
    header: ({ column }) => (
      <DataGridColumnHeader title="Role" column={column} />
    ),
    cell: ({ row }) => (
      <p className="p-2 text-B-14-14-400 text-[var(--color-gray-700)] ">
        {row.original.role}
      </p>
    ),
    enableSorting: true,
    size: 200,
  },
  {
    id: "clientID",
    accessorKey: "clientID",
    header: ({ column }) => (
      <DataGridColumnHeader title="Client ID" column={column} />
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
          {row.original.clientID}
        </p>
        <Button
          size="sm"
          variant="ghost"
          className="h-6 w-6 p-0"
          onClick={() => {
            copyToClipboard(row.original.clientID);
            toast.success("Client ID copied to clipboard");
          }}
        >
          <Copy className="h-3 w-3" />
        </Button>
      </div>
    ),
    enableSorting: true,
    size: 140,
  },
  {
    id: "accountStatus",
    accessorKey: "accountStatus",
    header: ({ column }) => (
      <DataGridColumnHeader title="Account Status" column={column} />
    ),
    cell: ({ row }) => (
      <Badge
        variant={
          row.original.accountStatus === "active" ? "success" : "destructive"
        }
        size="sm"
        appearance="light"
        shape="circle"
      >
        <BadgeDot
          className={
            row.original.accountStatus === "active" ? "success" : "destructive"
          }
        />
        {row.original.accountStatus}
      </Badge>
    ),
    enableSorting: true,
    size: 140,
  },
  {
    id: "failedLoginAttempt",
    accessorKey: "failedLoginAttempt",
    header: ({ column }) => (
      <DataGridColumnHeader title="Failed Login Attempt" column={column} />
    ),
    cell: ({ row }) => (
      <p className="text-B-14-14-400 text-[var(--color-gray-800)]">
        {row.original.failedLoginAttempt}
      </p>
    ),
    enableSorting: true,
    size: 140,
  },
  {
    id: "lastLoginDate",
    accessorKey: "loginDate", // Corrected accessorKey
    header: ({ column }) => (
      <DataGridColumnHeader title="Last Login Date" column={column} />
    ),
    cell: ({ row }) => renderDateCell(row.original.loginDate),
    enableSorting: true,
    size: 200,
  },
  {
    id: "createdDate",
    accessorKey: "createdDate",
    header: ({ column }) => (
      <DataGridColumnHeader title="Created Date" column={column} />
    ),
    cell: ({ row }) => renderDateCell(row.original.createdDate),
    enableSorting: true,
    size: 200,
  },
  {
    id: "updatedDate",
    accessorKey: "updateDate", // Corrected accessorKey to match interface
    header: ({ column }) => (
      <DataGridColumnHeader title="Updated Date" column={column} />
    ),
    cell: ({ row }) => renderDateCell(row.original.updateDate),
    enableSorting: true,
    size: 200,
  },
];
