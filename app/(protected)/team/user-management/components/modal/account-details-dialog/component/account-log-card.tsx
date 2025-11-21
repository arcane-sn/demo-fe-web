import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";

Dayjs.extend(utc);

interface AccountLogProps {
  groupValue: any;
  sectionId: string;
}

const AccountLog: React.FC<AccountLogProps> = ({ groupValue, sectionId }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return { date: "N/A", time: "N/A" };
    const localTime = Dayjs.utc(dateString).local();
    return {
      date: localTime.format("ddd, MMM DD, YYYY"),
      time: `${localTime.format("HH:mm:ss")} (GMT ${localTime.format("Z")})`,
    };
  };

  const lastLogin = formatDate(groupValue.lastLogin);
  const lastUpdate = formatDate(groupValue.lastUpdate);
  const createdDate = formatDate(groupValue.createdDate);

  return (
    <Card id={sectionId} data-scrollspy-anchor={sectionId}>
      <CardHeader>
        <CardTitle>Account Log</CardTitle>
        <CardDescription>
          Historical activities and timestamps for this account
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <Table>
          <TableBody>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/3">
                <Label>Last Login</Label>
              </TableCell>
              <TableCell>
                <p className="text-sm text-foreground">{lastLogin.date}</p>
                <p className="text-xs text-muted-foreground">{lastLogin.time}</p>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 ">
                <Label>Failed Login Attempts</Label>
              </TableCell>  
              <TableCell>{groupValue.failedLoginAttempts}</TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 ">
                <Label>Last Update</Label>
              </TableCell>
              <TableCell>
                <p className="text-sm text-foreground">{lastUpdate.date}</p>
                <p className="text-xs text-muted-foreground">
                  {lastUpdate.time}
                </p>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 ">
                <Label>Updated By</Label>
              </TableCell>
              <TableCell>{groupValue.updatedBy}</TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4 ">
                <Label>Created Date</Label>
              </TableCell>
              <TableCell>
                <p className="text-sm text-foreground">{createdDate.date}</p>
                <p className="text-xs text-muted-foreground">
                  {createdDate.time}
                </p>
              </TableCell>
            </TableRow>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Created By</Label>
              </TableCell>
              <TableCell>{groupValue.createdBy}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default AccountLog;
