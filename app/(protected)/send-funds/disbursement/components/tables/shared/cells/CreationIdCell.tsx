import { Copy } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';

interface CreationIdCellProps {
  creationId: string;
  label?: string;
}

export function CreationIdCell({ 
  creationId, 
  label = 'Creation ID copied to clipboard' 
}: CreationIdCellProps) {
  const { copyToClipboard } = useCopyToClipboard();
  
  const handleCopy = () => {
    copyToClipboard(creationId);
    toast.success(label);
  };
  
  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm text-foreground">
        {creationId}
      </span>
      <Button
        size="sm"
        variant="ghost"
        className="h-6 w-6 p-0"
        onClick={handleCopy}
      >
        <Copy className="h-3 w-3" />
      </Button>
    </div>
  );
}

