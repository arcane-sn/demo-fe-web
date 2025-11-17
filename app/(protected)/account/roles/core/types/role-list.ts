interface RoleListProps {
  id: string;
  name: string;
  type: "merchant" | "internal";
  icon: string;
  description: string;
  permissions: Array<{
    service: string;
    permissionName: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  }>;
  asignUser: number;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export type { RoleListProps };
