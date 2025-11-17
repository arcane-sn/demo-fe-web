import React from 'react';
import { Wallet, QrCode, CreditCard, Building, Banknote } from 'lucide-react';
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
      icon={<Wallet size={20} className="text-xl text-gray-600" />}
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
      icon={<QrCode size={20} className="text-xl text-gray-600" />}
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
      icon={<Building size={20} className="text-xl text-gray-600" />}
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
      icon={<CreditCard size={20} className="text-xl text-gray-600" />}
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
      icon={<Banknote size={20} className="text-xl text-gray-600" />}
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
