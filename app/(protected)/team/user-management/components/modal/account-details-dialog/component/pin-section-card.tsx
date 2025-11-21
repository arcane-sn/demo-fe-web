import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Info } from "lucide-react";
import { Icons } from "@/components/common/icons";
interface PinSectionProps {
  sectionId: string;
}

const PinSection: React.FC<PinSectionProps> = ({ sectionId }) => {
  return (
    <Card id={sectionId} data-scrollspy-anchor={sectionId}>
      <CardHeader>
        <CardTitle>6-Digit PIN</CardTitle>
        <CardDescription>
          Set a backup 6-digit PIN to keep this account secure
        </CardDescription>
      </CardHeader>
      <CardContent className="min-w-0 max-w-full">
        <div className="flex items-center justify-between rounded-md border border-dashed border-muted-foreground/30 p-4">
            <div className="flex items-center gap-4">
            <div className="rounded-md border border-muted-foreground/30 p-3">
                  <Icons.pin_lock />
              </div>
              <div>
              <p className="text-sm font-medium text-foreground">
                PIN not configured
              </p>
              <p className="text-xs text-muted-foreground">
                Only the account owner can configure the security PIN.
                </p>
              </div>
            </div>
          <Badge variant="destructive" appearance="light" size="sm">
              Unsecured
            </Badge>
        </div>
        <div className="mt-4 flex items-start gap-2">
          <Info className="h-4 w-4 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">
            For security reasons, PIN setup is only available through
            self-service by the account owner.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PinSection;
