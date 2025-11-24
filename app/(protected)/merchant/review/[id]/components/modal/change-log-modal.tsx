"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";
import { X } from "lucide-react";

interface SectionChange {
  id: string;
  sectionName: string;
  changeType: "Update" | "Delete" | "Create";
  sectionId?: string;
}

interface ChangeLogModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchantId?: string;
  onGoToSection?: (sectionId: string) => void;
}

// Mock data - replace with actual data from API
const mockSectionChanges: SectionChange[] = [
  {
    id: "1",
    sectionName: "Business Profile",
    changeType: "Update",
    sectionId: "business-profile",
  },
  {
    id: "2",
    sectionName: "QRIS Channel",
    changeType: "Delete",
    sectionId: "qris-channel",
  },
  {
    id: "3",
    sectionName: "e-Wallet Channel",
    changeType: "Update",
    sectionId: "e-wallet-channel",
  },
  {
    id: "4",
    sectionName: "Bank Info",
    changeType: "Update",
    sectionId: "bank-info",
  },
];

export function ChangeLogModal({
  open,
  onOpenChange,
  merchantId,
  onGoToSection,
}: ChangeLogModalProps) {
  const handleGoToSection = (sectionId: string) => {
    if (onGoToSection) {
      onGoToSection(sectionId);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] p-0 [&>button]:hidden">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-semibold text-gray-900">Changes Log</DialogTitle>
            <button
              onClick={() => onOpenChange(false)}
              className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>
          </div>
        </DialogHeader>
        <DialogBody className="px-6 py-6 overflow-y-auto">
          <div className="flex flex-col gap-6">
            {/* Section Changes Header */}
            <div className="flex flex-col gap-2">
              <h3 className="font-semibold text-base text-gray-900">Section Changes</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                This section displays the log of modifications that have been made. You can jump into the section by click the 'Go to Section' button.
              </p>
            </div>

            {/* List of Changes */}
            <Table>
              <TableBody>
                {mockSectionChanges.map((change) => (
                  <TableRow 
                    key={change.id} 
                    className="border-b border-gray-200 hover:bg-transparent"
                  >
                    <TableCell className="font-medium text-sm text-gray-900 py-4 px-4">
                      {change.sectionName}
                    </TableCell>
                    <TableCell className="text-xs text-gray-500 py-4 px-4 text-center">
                      {change.changeType}
                    </TableCell>
                    <TableCell className="py-4 px-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => change.sectionId && handleGoToSection(change.sectionId)}
                        className="text-xs border-gray-300 hover:bg-gray-50 text-gray-700"
                      >
                        Go to Section
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogBody>
        <DialogFooter className="px-6 py-4 border-t border-gray-200">
          <div className="flex justify-end w-full">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-300 hover:bg-gray-50"
            >
              Close
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

