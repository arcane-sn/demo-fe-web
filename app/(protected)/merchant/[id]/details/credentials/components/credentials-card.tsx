'use client';

import { Eye, Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CredentialInfo } from './types';
import { useClipboard } from '../../core/hooks/use-clipboard';

interface CredentialsCardProps {
  data: CredentialInfo;
}

export function CredentialsCard({ data }: CredentialsCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  return (
    <Card id="credentials">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold">
          <Eye className="size-5" />
          Credentials
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        {/* Credential ID */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Credential ID
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {data.credentialId}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(data.credentialId, 'credentialId')}
              className="h-8 px-2"
            >
              {isCopied('credentialId') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Client Secret */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Client Secret
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {data.clientSecret}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(data.clientSecret, 'clientSecret')}
              className="h-8 px-2"
            >
              {isCopied('clientSecret') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Public Key */}
        <div className="flex items-center px-6 py-4 border-b border-border">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Public Key
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {data.publicKey}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copy(data.publicKey, 'publicKey')}
              className="h-8 px-2"
            >
              {isCopied('publicKey') ? (
                <Check className="size-3 text-green-600" />
              ) : (
                <Copy className="size-3" />
              )}
            </Button>
          </div>
        </div>

        {/* Credential Status */}
        <div className="flex items-center px-6 py-4">
          <label className="w-48 text-sm font-medium text-muted-foreground">
            Credential Status
          </label>
          <div className="flex items-center gap-2">
            <Badge 
              variant={data.status === 'active' ? 'success' : 'secondary'}
              className="flex items-center gap-1"
            >
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              {data.status === 'active' ? 'Active' : 'Inactive'}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
