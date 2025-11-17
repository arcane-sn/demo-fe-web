'use client';

import { Copy, Check, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useClipboard } from '../../core/hooks/use-clipboard';

export function SharedFolderLink() {
  const { copied, copy, isCopied } = useClipboard();
  
  const folderLink = "GoogleDrive.com";

  const goToLink = () => {
    window.open(`https://${folderLink}`, '_blank');
  };

  return (
    <Card className="max-w-sm h-fit">
      <CardHeader className="pb-2">
        <CardTitle className="text-base">Shared Folder Link</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 pt-0">
        <p className="text-xs text-muted-foreground pt-5">
          All documents are compiled into 1 shared folder link.
        </p>
        
        <div className="flex items-center gap-2">
          <div className="flex-1 border-b border-dashed border-muted-foreground/40 pb-1">
            <span className="text-sm text-primary">{folderLink}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copy(folderLink, 'folderLink')}
            className="h-6 w-6 p-0"
          >
            {isCopied('folderLink') ? (
              <Check className="size-3 text-green-600" />
            ) : (
              <Copy className="size-3" />
            )}
          </Button>
        </div>
        
        <div className="pt-5">
        <Button 
          variant="outline" 
          size="sm"
          onClick={goToLink}
          className="w-full text-xs "
        >
          <ExternalLink className="size-3 mr-1" />
          Go to Link
        </Button>
        </div>
      </CardContent>
    </Card>
  );
}
