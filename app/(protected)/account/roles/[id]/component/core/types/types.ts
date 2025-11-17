export interface PermissionData {
  id: string;
  service: string;
  permissionName: string;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

export interface PermissionsTableProps {
  permissions: Array<{
    service: string;
    permissionName: string;
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
  }>;
}
