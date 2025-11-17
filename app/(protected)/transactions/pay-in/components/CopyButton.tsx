import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copied to clipboard`);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-6 w-6 p-0 hover:bg-gray-100"
      onClick={handleCopy}
    >
      <Copy className="h-3 w-3 text-gray-400" />
    </Button>
  );
};

export default CopyButton;
