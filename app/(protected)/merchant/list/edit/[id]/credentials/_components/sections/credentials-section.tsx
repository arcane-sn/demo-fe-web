'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { WarningBanner } from '@/components/common/warning-banner';
import { CredentialField } from '../shared';
import { CREDENTIALS_CONSTANTS } from '../../_lib/constants';
import type { CredentialsFormHandlers } from '../../_lib/types';

interface CredentialsSectionProps {
  credentialStatus: boolean;
  onCopy: (text: string) => void;
  onCredentialStatusChange: (isActive: boolean) => void;
}

export function CredentialsSection({ 
  credentialStatus, 
  onCopy, 
  onCredentialStatusChange 
}: CredentialsSectionProps) {
  return (
    <Card id="credentials">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Credentials</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Client ID */}
        <CredentialField
          label="Client ID"
          value={CREDENTIALS_CONSTANTS.DEFAULT_CLIENT_ID}
          onCopy={onCopy}
        />

        {/* Client Secret */}
        <CredentialField
          label="Client Secret"
          value={CREDENTIALS_CONSTANTS.DEFAULT_CLIENT_SECRET}
          onCopy={onCopy}
        />

        {/* Credential Status */}
        <div className="flex items-center gap-40">
          <Label htmlFor="credential-status" className="text-sm font-normal text-gray-700">
            Credential Status
          </Label>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Active</span>
            <Switch
              id="credential-status"
              checked={credentialStatus}
              onCheckedChange={onCredentialStatusChange}
              className="data-[state=checked]:bg-blue-600"
            />
          </div>
          <p className="text-xs text-gray-500 text-right">
            Toggle OFF to make the credential inactive
          </p>
        </div>

        {/* Warning Banner */}
        {!credentialStatus && (
          <WarningBanner
            title="Inactive Credential"
            description="Deactivating this merchant credential will prevent the merchant from making any transactions. Please review carefully before proceeding."
          />
        )}
      </CardContent>
    </Card>
  );
}
