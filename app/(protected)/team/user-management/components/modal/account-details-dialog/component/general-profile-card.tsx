import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge, BadgeDot } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import SectionItemDialCode from "@/components/common/section-item-dial-code";
import { Copy, Camera, X } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { toast } from "sonner";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

interface GeneralProfileProps {
  groupValue: any;
  setValue: (label: string, value: any) => void;
  sectionId: string;
}

const GeneralProfile: React.FC<GeneralProfileProps> = ({
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
        <CardTitle>General Profile</CardTitle>
        <CardDescription>
          Review and update the basic information for this user
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <Table>
          <TableBody>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Status</Label>
              </TableCell>
              <TableCell>
          <Badge
            variant={
              groupValue.status === "active" ? "success" : "destructive"
            }
            appearance="outline"
            size="md"
            shape="circle"
          >
            <BadgeDot className={groupValue.status === "active" ? "success" : "destructive"} />
            {groupValue.status}
          </Badge>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 align-top">
                <Label>User ID</Label>
              </TableCell>
              <TableCell>
          <div className="flex items-center gap-2">
                  <span>{groupValue.userID}</span>
            <Button
                    size="icon"
              variant="ghost"
              onClick={() => handleCopy(groupValue.userID, "User ID")}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 align-top">
                <Label>Client ID</Label>
              </TableCell>
              <TableCell>
          <div className="flex items-center gap-2">
                  <span>{groupValue.clientID}</span>
            <Button
                    size="icon"
              variant="ghost"
              onClick={() => handleCopy(groupValue.clientID, "Client ID")}
            >
                    <Copy className="h-4 w-4" />
            </Button>
          </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 align-top">
                <Label>Username</Label>
              </TableCell>
              <TableCell>
          <Input
            value={groupValue.userName}
            onChange={(e) => setValue("userName", e.target.value)}
            placeholder="Enter username"
          />
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 align-top">
                <Label>Full Name</Label>
              </TableCell>
              <TableCell>
          <Input
            value={groupValue.fullName}
            onChange={(e) => setValue("fullName", e.target.value)}
            placeholder="Enter full name"
          />
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 align-top">
                <Label>Phone Number</Label>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
            <SectionItemDialCode
              value={groupValue.dialCode}
                    onValueChange={(val) => setValue("dialCode", val)}
              className="w-32"
            />
            <Input
              value={groupValue.phoneNumber}
              onChange={(e) => setValue("phoneNumber", e.target.value)}
              placeholder="e.g. 81234567890"
            />
          </div>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 align-top">
                <Label>Email</Label>
              </TableCell>
              <TableCell>
          <Input
            value={groupValue.email}
            onChange={(e) => setValue("email", e.target.value)}
            placeholder="Enter email address"
          />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="flex justify-end pt-6">
          <Button onClick={() => console.log("Save changes:", groupValue)}>
            Save Changes
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GeneralProfile;
