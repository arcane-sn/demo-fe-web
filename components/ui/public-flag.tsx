'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';

interface PublicFlagProps {
  countryCode: string;
  size?: number;
  className?: string;
}

const countryFlagMap: Record<string, string> = {
  'id': 'indonesia',
  'sg': 'singapore', 
  'my': 'malaysia',
  'th': 'thailand',
  'us': 'united-states',
  'gb': 'united-kingdom',
  '+62': 'indonesia',
  '+1': 'united-states',
  '+44': 'united-kingdom',
  '+65': 'singapore',
  'Indonesia': 'indonesia',
  'Singapore': 'singapore',
  'Malaysia': 'malaysia',
  'Thailand': 'thailand',
  'United States': 'united-states',
  'United Kingdom': 'united-kingdom',
};

export function PublicFlag({ countryCode, size = 12, className }: PublicFlagProps) {
  const flagName = countryFlagMap[countryCode] || countryCode.toLowerCase();
  const flagPath = `/media/flags/${flagName}.svg`;
  
  return (
    <div 
      className={cn(
        'relative flex items-center justify-center rounded-full border border-gray-200 bg-white shadow-sm overflow-hidden',
        'before:absolute before:inset-0 before:rounded-full before:bg-gradient-to-br before:from-white/20 before:to-transparent before:pointer-events-none',
        className
      )}
      style={{ 
        width: size, 
        height: size
      }}
    >
      <div
        className="w-full h-full rounded-full"
        style={{
          backgroundImage: `url(${flagPath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          WebkitMask: 'radial-gradient(circle, black 0%, black 100%)',
          mask: 'radial-gradient(circle, black 0%, black 100%)',
        }}
      />
    </div>
  );
}
