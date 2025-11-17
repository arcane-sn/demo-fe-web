import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AuditLogFilterModalProps {
  open: boolean;
  onClose: () => void;
}

const AuditLogFilterModal: React.FC<AuditLogFilterModalProps> = ({
  open,
  onClose,
}) => {
  const handleApplyFilter = () => {
    console.log("Applying audit log filters...");
    // Add filter logic here
    onClose();
  };

  const handleResetFilter = () => {
    console.log("Resetting audit log filters...");
    // Add reset logic here
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Filter Audit Logs</DialogTitle>
          <DialogDescription>
            Set filters to narrow down the audit log results.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="action">Action Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select action type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="create">CREATE</SelectItem>
                <SelectItem value="update">UPDATE</SelectItem>
                <SelectItem value="delete">DELETE</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="user">User</Label>
            <Input id="user" placeholder="Enter user name or ID" />
          </div>
          <div>
            <Label htmlFor="sectionType">Section Type</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select section type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user-management">User Management</SelectItem>
                <SelectItem value="account-settings">
                  Account Settings
                </SelectItem>
                <SelectItem value="merchant-data">Merchant Data</SelectItem>
                <SelectItem value="system-config">System Config</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dateRange">Date Range</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="custom">Custom Range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={handleResetFilter}>
              Reset
            </Button>
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleApplyFilter}>Apply Filters</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuditLogFilterModal;
