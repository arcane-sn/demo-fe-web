import DialogContent, {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import CardSelection from "../../card/card-selection";

const ModalExport = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [selectedFormat, setSelectedFormat] = useState<string>("pdf");

  const exportFormats = [
    {
      format: "pdf" as const,
      label: "PDF",
      icon: "/assets/icon/pdf.svg",
    },
    {
      format: "csv" as const,
      label: "CSV",
      icon: "/assets/icon/csv.svg",
    },
    {
      format: "xls" as const,
      label: "XLS",
      icon: "/assets/icon/xls.svg",
    },
  ];

  const handleFormatSelect = (format: string) => {
    setSelectedFormat(format);
  };

  const handleExport = () => {
    console.log(`Exporting as ${selectedFormat.toUpperCase()}`);
    // Add export logic here
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[560px]">
        <DialogHeader>
          <DialogTitle>Export</DialogTitle>
        </DialogHeader>
        <DialogBody className="py-4 px-6 w-full">
          <div className="justify-start text-slate-900 text-sm font-medium font-['Inter'] leading-none">
            Files format
          </div>
          <div className="mt-2 self-stretch justify-start text-slate-400 text-xs font-normal font-['Inter'] leading-tight">
            Select a file format for export. The export will include all applied
            filters.
          </div>
          <div className="mt-5 self-stretch inline-flex justify-start items-start gap-7">
            {exportFormats.map((format) => (
              <CardSelection
                key={format.format}
                format={format.format}
                label={format.label}
                icon={format.icon}
                selected={selectedFormat === format.format}
                onClick={handleFormatSelect}
              />
            ))}
          </div>

          <div className="mt-5 py-5 border-t border-gray-200">
            <div className="justify-start text-slate-900 text-sm font-medium font-['Inter'] leading-none">
              Send File
            </div>
            <div className="mt-2 self-stretch justify-start text-slate-400 text-xs font-normal font-['Inter'] leading-tight">
              Exported file will be sent via email
            </div>
            <div className="mt-4 flex items-center justify-start gap-2">
              <div className="w-24 justify-start text-slate-800 text-xs font-normal font-['Inter'] leading-none">
                Send File To
              </div>
              <Input type="email" placeholder="Enter email address" />
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-3 pt-3 border-t mt-6 border-gray-200">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleExport}>Export and Send</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalExport;
