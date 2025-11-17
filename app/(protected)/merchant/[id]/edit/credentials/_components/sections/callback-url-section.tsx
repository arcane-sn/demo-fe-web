'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CallbackUrlGroup } from '../shared';
import { CALLBACK_URL_GROUPS } from '../../_lib/constants';
import type { CallbackUrls } from '../../_lib/types';

interface CallbackUrlSectionProps {
  callbackUrls: CallbackUrls;
  onChange: (field: keyof CallbackUrls, value: string) => void;
}

export function CallbackUrlSection({ callbackUrls, onChange }: CallbackUrlSectionProps) {
  return (
    <Card id="callback-url">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Callback URL</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {CALLBACK_URL_GROUPS.map((group) => (
          <CallbackUrlGroup
            key={group.title}
            title={group.title}
            fields={group.fields.map(field => ({
              key: field.key,
              label: field.label,
              value: callbackUrls[field.key],
              onChange,
            }))}
          />
        ))}
      </CardContent>
    </Card>
  );
}
