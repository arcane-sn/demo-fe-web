import React from 'react';
import { KeenIcon } from '@/components/keenicons';
import { PaymentMethodSection } from '../table/payment-method-section';
import { ChannelData } from '../../_lib/types';
import { MOCK_CHANNELS } from '../../_lib/constants';

interface PaymentSectionProps {
  channels: ChannelData[];
  onAddChannel: () => void;
  availableChannels?: ChannelData[];
  onChannelsSelected?: (selectedChannels: ChannelData[]) => void;
  onEditChannel?: (channelData: ChannelData) => void;
  onDeleteChannel?: (channelData: ChannelData) => void;
}

export function EWalletSection({ 
  channels, 
  onAddChannel, 
  availableChannels = MOCK_CHANNELS.ewallet,
  onChannelsSelected,
  onEditChannel,
  onDeleteChannel
}: PaymentSectionProps) {
  return (
    <PaymentMethodSection
      title="e-Wallet"
      icon={
        <KeenIcon 
          icon="wallet" 
          style="outline" 
          className="text-lg text-gray-600" 
        />
      }
      channels={channels}
      onAddChannel={onAddChannel}
      addButtonText="Add Channel"
      availableChannels={availableChannels}
      onChannelsSelected={onChannelsSelected}
      onEditChannel={onEditChannel}
      onDeleteChannel={onDeleteChannel}
    />
  );
}

export function QRCodeSection({ 
  channels, 
  onAddChannel, 
  availableChannels = MOCK_CHANNELS.qr,
  onChannelsSelected,
  onEditChannel,
  onDeleteChannel
}: PaymentSectionProps) {
  return (
    <PaymentMethodSection
      title="QR Code"
      icon={
        <KeenIcon 
          icon="scan-barcode" 
          style="outline" 
          className="text-lg text-gray-600" 
        />
      }
      channels={channels}
      onAddChannel={onAddChannel}
      addButtonText="Add Channel"
      availableChannels={availableChannels}
      onChannelsSelected={onChannelsSelected}
      onEditChannel={onEditChannel}
      onDeleteChannel={onDeleteChannel}
    />
  );
}

export function VirtualAccountSection({ 
  channels, 
  onAddChannel, 
  availableChannels = MOCK_CHANNELS['virtual-account'],
  onChannelsSelected,
  onEditChannel,
  onDeleteChannel
}: PaymentSectionProps) {
  return (
    <PaymentMethodSection
      title="Virtual Account"
      icon={
        <KeenIcon 
          icon="bank" 
          style="outline" 
          className="text-lg text-gray-600" 
        />
      }
      channels={channels}
      onAddChannel={onAddChannel}
      addButtonText="Add Channel"
      availableChannels={availableChannels}
      onChannelsSelected={onChannelsSelected}
      onEditChannel={onEditChannel}
      onDeleteChannel={onDeleteChannel}
    />
  );
}

export function DebitCreditCardSection({ 
  channels, 
  onAddChannel, 
  availableChannels = MOCK_CHANNELS['credit-card'],
  onChannelsSelected,
  onEditChannel,
  onDeleteChannel
}: PaymentSectionProps) {
  return (
    <PaymentMethodSection
      title="Debit / Credit Card"
      icon={
        <KeenIcon 
          icon="two-credit-cart" 
          style="outline" 
          className="text-lg text-gray-600" 
        />
      }
      channels={channels}
      onAddChannel={onAddChannel}
      addButtonText="Add Channel"
      availableChannels={availableChannels}
      onChannelsSelected={onChannelsSelected}
      onEditChannel={onEditChannel}
      onDeleteChannel={onDeleteChannel}
    />
  );
}

export function DirectDebitSection({ 
  channels, 
  onAddChannel, 
  availableChannels = [],
  onChannelsSelected,
  onEditChannel,
  onDeleteChannel
}: PaymentSectionProps) {
  return (
    <PaymentMethodSection
      title="Direct Debit"
      icon={
        <KeenIcon 
          icon="arrow-circle-right" 
          style="outline" 
          className="text-lg text-gray-600" 
        />
      }
      channels={channels}
      onAddChannel={onAddChannel}
      addButtonText="Add Channel"
      availableChannels={availableChannels}
      onChannelsSelected={onChannelsSelected}
      onEditChannel={onEditChannel}
      onDeleteChannel={onDeleteChannel}
    />
  );
}
