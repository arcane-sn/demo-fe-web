import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface AuditLogExportModalProps {
  open: boolean;
  onClose: () => void;
}

const AuditLogExportModal: React.FC<AuditLogExportModalProps> = ({
  open,
  onClose,
}) => {
  const handleExport = () => {
    console.log("Exporting audit logs...");
    // Add export logic here
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Export Audit Logs</DialogTitle>
          <DialogDescription>
            Choose the format and date range for exporting audit logs.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Export Format</label>
            <select className="w-full mt-1 p-2 border rounded">
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
          <div>
            <label className="text-sm font-medium">Date Range</label>
            <select className="w-full mt-1 p-2 border rounded">
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditLogExportModal;
