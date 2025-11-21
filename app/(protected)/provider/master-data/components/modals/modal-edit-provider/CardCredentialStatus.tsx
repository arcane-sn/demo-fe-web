import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Switch, SwitchWrapper } from "@/components/ui/switch";
import {
  Alert,
  AlertContent,
  AlertDescription,
  AlertIcon,
  AlertTitle,
} from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import React, { useState } from "react";

const CardCredentialStatus = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <Card id="Credential Status-1.5" className="min-w-0 max-w-full">
      <CardHeader>
        <CardTitle>Credential Status</CardTitle>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <Table className="w-full">
          <TableBody>
            <TableRow className="border-0 hover:!bg-transparent">
              <TableCell className="w-1/4">
                <Label>Credential Status</Label>
              </TableCell>
              <TableCell>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <SwitchWrapper>
                      <Switch
                        checked={isActive}
                        onCheckedChange={setIsActive}
                      />
                      <span className="text-sm font-medium text-slate-900 ml-2">
                        Active
                      </span>
                    </SwitchWrapper>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Toggle OFF to make the credential inactive
                  </p>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {!isActive && (
          <div className="mt-5 min-w-0 max-w-full">
            <Alert
              variant="warning"
              appearance="light"
              size="md"
              className="min-w-0 max-w-full"
            >
              <AlertIcon>
                <AlertCircle className="size-5" />
              </AlertIcon>
              <AlertContent className="min-w-0">
                <AlertTitle>Inactive Credential</AlertTitle>
                <AlertDescription>
                  Deactivating provider credential will prevent the merchant from
                  making any transactions using this provider. Please review
                  carefully before proceeding.
                </AlertDescription>
              </AlertContent>
            </Alert>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CardCredentialStatus;

