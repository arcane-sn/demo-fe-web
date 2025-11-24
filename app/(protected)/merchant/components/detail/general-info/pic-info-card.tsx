'use client';

import { Copy, Check } from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MerchantData } from '../../../types/merchant';
import { useClipboard } from '../core/hooks/use-clipboard';
import { formatPhoneNumber } from '../core/utils/formatters';

interface PicInfoCardProps {
  merchant: MerchantData;
}

export function PicInfoCard({ merchant }: PicInfoCardProps) {
  const { copied, copy, isCopied } = useClipboard();

  const picData = [
    {
      id: 'owner',
      icon: 'shop',
      name: merchant.picOwner?.fullName || 'N/A',
      position: `${merchant.picOwner?.position || 'N/A'} PIC`,
      role: 'CEO',
      email: merchant.picOwner?.email || 'N/A',
      phone: merchant.picOwner?.phoneNumber || 'N/A',
    },
    {
      id: 'business',
      icon: 'briefcase',
      name: merchant.picBusiness?.fullName || 'N/A',
      position: `${merchant.picBusiness?.position || 'N/A'} PIC`,
      role: 'Head of Business',
      email: merchant.picBusiness?.email || 'N/A',
      phone: merchant.picBusiness?.phoneNumber || 'N/A',
    },
    {
      id: 'finance',
      icon: 'calculator',
      name: merchant.picFinance?.fullName || 'N/A',
      position: `${merchant.picFinance?.position || 'N/A'} PIC`,
      role: 'Lead of Finance',
      email: merchant.picFinance?.email || 'N/A',
      phone: merchant.picFinance?.phoneNumber || 'N/A',
    },
    {
      id: 'technical',
      icon: 'setting',
      name: merchant.picTechnical?.fullName || 'N/A',
      position: `${merchant.picTechnical?.position || 'N/A'} PIC`,
      role: 'Head of Engineering Ma...',
      email: merchant.picTechnical?.email || 'N/A',
      phone: merchant.picTechnical?.phoneNumber || 'N/A',
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          PIC Info
        </CardTitle>
        <Button variant="outline" size="sm">
          Edit Section
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {picData.map((pic, index) => {
          return (
            <div key={pic.id} className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <KeenIcon icon={pic.icon} style="outline" className="text-base text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium">{pic.name}</p>
                  
                  {/* Email */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Email:</span>
                    <span className="text-xs">{pic.email}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copy(pic.email, `email-${pic.id}`)}
                      className="h-6 px-1"
                    >
                      {isCopied(`email-${pic.id}`) ? (
                        <Check className="size-2 text-green-600" />
                      ) : (
                        <Copy className="size-2" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Phone */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Phone:</span>
                    <span className="text-xs">{formatPhoneNumber(pic.phone)}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copy(pic.phone, `phone-${pic.id}`)}
                      className="h-6 px-1"
                    >
                      {isCopied(`phone-${pic.id}`) ? (
                        <Check className="size-2 text-green-600" />
                      ) : (
                        <Copy className="size-2" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Position - Moved to bottom */}
                  <p className="text-xs text-muted-foreground">({pic.position})</p>
                </div>
              </div>
              {index < picData.length - 1 && <hr className="border-border" />}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
