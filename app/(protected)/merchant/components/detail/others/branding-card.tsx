'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye, Image as ImageIcon } from 'lucide-react';
import { KeenIcon } from '@/components/keenicons';
import { BrandColors, CompanyLogo } from './types';

interface BrandingCardProps {
  data: {
    companyLogo?: CompanyLogo;
    brandColors: BrandColors;
  };
  onEdit?: () => void;
  onPreview?: () => void;
}

export function BrandingCard({ data, onEdit, onPreview }: BrandingCardProps) {
  const [showPreview, setShowPreview] = useState(false);

  const handlePreview = () => {
    if (onPreview) {
      onPreview();
    } else {
      setShowPreview(true);
    }
  };

  return (
    <>
      <Card id="branding">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Branding</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={onEdit}
            className="text-gray-600 border-gray-300 hover:bg-gray-50"
          >
            Edit Section
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Company Logo Section */}
          <div className="flex flex-wrap items-start justify-between gap-8">
            <div className="flex flex-col flex-1 min-w-0">
              <div className="text-sm font-medium mb-1">Company Logo</div>
              <span className="text-sm text-gray-500">
                Add company logo to personalize merchant profile and make it recognizable.
              </span>
            </div>
            
            <div className="flex flex-wrap sm:flex-nowrap gap-5 lg:gap-7.5 max-w-96 w-full flex-shrink-0 mb-5">
              {data.companyLogo ? (
                // Uploaded state - show logo
                <div className="flex flex-col items-center w-full space-y-4">
                  <div className="w-32 h-32 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                    <img 
                      src={data.companyLogo.dataURL || data.companyLogo.url} 
                      alt="Company Logo" 
                      className="max-w-full max-h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              ) : (
                // Empty state - show upload area
                <div className="flex bg-center w-full p-5 lg:p-7 bg-no-repeat bg-[length:550px] border border-input rounded-xl border-dashed branding-bg cursor-pointer transition-colors">
                  <div className="flex flex-col place-items-center place-content-center text-center rounded-xl w-full">
                    <div className="flex items-center mb-2.5">
                      <div className="relative size-11 shrink-0">
                        <svg
                          className="w-full h-full stroke-orange-200 fill-white dark:stroke-orange-950 dark:fill-orange-950/30"
                          width="44"
                          height="48"
                          viewBox="0 0 44 48"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 
                            18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 
                            39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                            fill=""
                          />
                          <path
                            d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 
                            18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 
                            39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                            stroke=""
                            strokeOpacity="0.2"
                          />
                        </svg>
                        <div className="absolute leading-none left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                          <ImageIcon className="text-xl ps-px text-orange-400" />
                        </div>
                      </div>
                    </div>
                    <div className="text-xs font-medium hover:text-primary-active mb-px">
                      Click or Drag & Drop
                    </div>
                    <span className="text-xs text-gray-500 text-nowrap">
                      SVG, PNG, JPG (max. 800×400)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Brand Colors Section */}
          <div className="space-y-4 border-t pt-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-sm font-medium mb-1">Brand Colors</h3>
                <p className="text-xs text-gray-500 pr-20">
                  Set your brand's signature palette. These colors will be used across your merchant dashboard and materials.
                </p>
              </div>
              <Button 
                type="button"
                className="flex items-center gap-2 text-blue-500 bg-white border border-blue-500 hover:bg-blue-50" 
                onClick={handlePreview}
                size="sm"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">Preview</span>
              </Button>
            </div>

            <div className="space-y-5 pl-10 ml-10 border-l border-gray-200">
              {/* Primary Color */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium">Primary Color</div>
                  <p className="text-xs text-gray-500">Main color that represents your brand</p>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                    style={{ color: data.brandColors.primary }}
                  >
                    <i 
                      className="ki-filled ki-mouse-square text-base transition-colors duration-200"
                      style={{ color: 'inherit' }}
                    />
                  </div>
                  <Badge variant="outline" className="font-mono text-sm uppercase text-gray-600">
                    {data.brandColors.primary}
                  </Badge>
                </div>
              </div>

              {/* Secondary Color */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium">Secondary Color</div>
                  <p className="text-xs text-gray-500">Supporting color for balance and variety</p>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                    style={{ color: data.brandColors.secondary }}
                  >
                    <i 
                      className="ki-filled ki-mouse-square text-base transition-colors duration-200"
                      style={{ color: 'inherit' }}
                    />
                  </div>
                  <Badge variant="outline" className="font-mono text-sm uppercase text-gray-600">
                    {data.brandColors.secondary}
                  </Badge>
                </div>
              </div>

              {/* Accent Color */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium">Accent Color</div>
                  <p className="text-xs text-gray-500">Highlight color for emphasis</p>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                    style={{ color: data.brandColors.accent }}
                  >
                    <i 
                      className="ki-filled ki-mouse-square text-base transition-colors duration-200"
                      style={{ color: 'inherit' }}
                    />
                  </div>
                  <Badge variant="outline" className="font-mono text-sm uppercase text-gray-600">
                    {data.brandColors.accent}
                  </Badge>
                </div>
              </div>

              {/* Background Color */}
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="text-sm font-medium">Background Color</div>
                  <p className="text-xs text-gray-500">Base color for layouts and surfaces</p>
                </div>
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center"
                    style={{ color: data.brandColors.background }}
                  >
                    <i 
                      className="ki-filled ki-mouse-square text-base transition-colors duration-200"
                      style={{ color: 'inherit' }}
                    />
                  </div>
                  <Badge variant="outline" className="font-mono text-sm uppercase text-gray-600">
                    {data.brandColors.background}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <style jsx>{`
        .branding-bg {
          background-image: url('/media/images/2600x1200/bg-5.png');
        }
        .dark .branding-bg {
          background-image: url('/media/images/2600x1200/bg-5-dark.png');
        }
      `}</style>
    </>
  );
}
