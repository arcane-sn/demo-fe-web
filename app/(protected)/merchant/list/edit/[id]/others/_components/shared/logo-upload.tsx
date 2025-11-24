'use client';

import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { ImageInput, ImageInputFile } from '@/components/image-input';
import { OTHERS_CONSTANTS } from '../../_lib/constants';
import type { LogoUploadProps } from '../../_lib/types';

export function LogoUpload({ value, onChange, onClear }: LogoUploadProps) {
  return (
    <div className="flex flex-wrap sm:flex-nowrap gap-5 lg:gap-7.5 max-w-96 w-full flex-shrink-0 mb-5">
      <ImageInput
        value={value}
        onChange={onChange}
        acceptType={[...OTHERS_CONSTANTS.LOGO_ACCEPT_TYPES]}
        multiple={false}
        maxNumber={OTHERS_CONSTANTS.LOGO_MAX_NUMBER}
      >
        {({ onImageUpload, isDragging, dragProps, fileList }) => (
          <>
            {fileList.length > 0 ? (
              // Uploaded state - show logo with change option
              <div className="flex flex-col items-center w-full space-y-4">
                <div className="w-32 h-32 flex items-center justify-center">
                  <img 
                    src={fileList[0].dataURL} 
                    alt="Company Logo" 
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
                <div className="flex items-center gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onImageUpload}
                    className="text-sm px-3 py-2 border-blue-500 text-blue-500 hover:bg-blue-50"
                  >
                    Change Logo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClear}
                    className="text-sm px-3 py-2 border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Clear
                  </Button>
                  <span className="text-xs text-gray-500">
                    SVG, PNG, JPG (max. {OTHERS_CONSTANTS.LOGO_MAX_SIZE})
                  </span>
                </div>
              </div>
            ) : (
              // Empty state - show upload area
              <div 
                className={`flex bg-center w-full p-5 lg:p-7 bg-no-repeat bg-[length:550px] border border-input rounded-xl border-dashed branding-bg cursor-pointer transition-colors ${
                  isDragging ? 'border-orange-500' : ''
                }`}
                onClick={onImageUpload}
                {...dragProps}
              >
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
                          d="M16 2.4641C19.7128 0.320509 24.2872 0.320508 28 2.4641L37.6506 8.0359C41.3634 10.1795 43.6506 14.141 43.6506 18.4282V29.5718C43.6506 33.859 41.3634 37.8205 37.6506 39.9641L28 45.5359C24.2872 47.6795 19.7128 47.6795 16 45.5359L6.34937 39.9641C2.63655 37.8205 0.349365 33.859 0.349365 29.5718V18.4282C0.349365 14.141 2.63655 10.1795 6.34937 8.0359L16 2.4641Z"
                          fill=""
                        />
                        <path
                          d="M16.25 2.89711C19.8081 0.842838 24.1919 0.842837 27.75 2.89711L37.4006 8.46891C40.9587 10.5232 43.1506 14.3196 43.1506 18.4282V29.5718C43.1506 33.6804 40.9587 37.4768 37.4006 39.5311L27.75 45.1029C24.1919 47.1572 19.8081 47.1572 16.25 45.1029L6.59937 39.5311C3.04125 37.4768 0.849365 33.6803 0.849365 29.5718V18.4282C0.849365 14.3196 3.04125 10.5232 6.59937 8.46891L16.25 2.89711Z"
                          stroke=""
                          strokeOpacity="0.2"
                        />
                      </svg>
                      <div className="absolute leading-none left-2/4 top-2/4 -translate-y-2/4 -translate-x-2/4">
                        <KeenIcon icon="picture" style="outline" className="text-xl ps-px text-orange-400" />
                      </div>
                    </div>
                  </div>
                  <div className="text-mono text-xs font-medium hover:text-primary-active mb-px">
                    Click or Drag & Drop
                  </div>
                  <span className="text-xs text-secondary-foreground text-nowrap">
                    SVG, PNG, JPG (max. {OTHERS_CONSTANTS.LOGO_MAX_SIZE})
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </ImageInput>
    </div>
  );
}
