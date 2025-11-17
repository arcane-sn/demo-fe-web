import React from 'react';
import { ChannelData } from '../../_lib/types';

interface ChannelLogoProps {
  channel: ChannelData;
}

export function ChannelLogo({ channel }: ChannelLogoProps) {
  return (
    <div className="flex items-center gap-3">
      {channel.logo ? (
        <div className="w-8 h-8 rounded flex items-center justify-center overflow-hidden bg-white border">
          {channel.logo.startsWith('/media/') ? (
            <img 
              src={channel.logo} 
              alt={channel.name}
              className="w-6 h-6 object-contain"
            />
          ) : (
            <div className={`w-full h-full ${channel.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}>
              {channel.logo}
            </div>
          )}
        </div>
      ) : null}
      <span className="font-medium text-sm">{channel.name}</span>
    </div>
  );
}
