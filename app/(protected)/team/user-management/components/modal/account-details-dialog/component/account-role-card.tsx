import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface AccountRoleProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  sectionId: string;
}

const AccountRole: React.FC<AccountRoleProps> = ({
  groupValue,
  setValue,
  sectionId,
}) => {
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = (text: string, label: string) => {
    copyToClipboard(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Card id={sectionId} data-scrollspy-anchor={sectionId}>
      <CardHeader>
        <CardTitle>Account Role</CardTitle>
        <CardDescription>
          Manage access level and role assignment for this user
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <Table>
          <TableBody>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Access Level</Label>
              </TableCell>
              <TableCell>
                <Select
                  value={groupValue.accessLevel}
                  onValueChange={(value) => setValue("accessLevel", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="parent">Parent & Sub-Merchants</SelectItem>
                    <SelectItem value="merchant">Merchant Only</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 align-top">
                <Label>Role</Label>
              </TableCell>
              <TableCell>
                <Select
                  value={groupValue.role}
                  onValueChange={(value) => setValue("role", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="super-admin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="viewer">Viewer</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-end pt-6">
          <Button
            variant="primary"
            onClick={() => console.log("Save role changes:", groupValue)}
          >
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountRole;
