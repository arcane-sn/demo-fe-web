'use client';

import React from 'react';
import { usePGConfig } from '../_hooks';
import {
  EWalletSection,
  QRCodeSection,
  VirtualAccountSection,
  DebitCreditCardSection,
  DirectDebitSection,
} from './sections';

export function PGConfigContent() {
  const { channels, handleAddChannel, handleChannelsSelected, handleEditChannel, handleDeleteChannel } = usePGConfig();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
          <div id="e-wallet">
            <EWalletSection
              channels={channels.ewallet}
              onAddChannel={() => handleAddChannel('ewallet')}
              onChannelsSelected={(selectedChannels) => handleChannelsSelected('ewallet', selectedChannels)}
              onEditChannel={(channelData) => handleEditChannel('ewallet', channelData.id)}
              onDeleteChannel={(channelData) => handleDeleteChannel('ewallet', channelData.id)}
            />
          </div>
          
          <div id="qr-code">
            <QRCodeSection
              channels={channels.qris}
              onAddChannel={() => handleAddChannel('qris')}
              onChannelsSelected={(selectedChannels) => handleChannelsSelected('qris', selectedChannels)}
              onEditChannel={(channelData) => handleEditChannel('qris', channelData.id)}
              onDeleteChannel={(channelData) => handleDeleteChannel('qris', channelData.id)}
            />
          </div>
          
          <div id="virtual-account">
            <VirtualAccountSection
              channels={channels.virtualAccount}
              onAddChannel={() => handleAddChannel('virtualAccount')}
              onChannelsSelected={(selectedChannels) => handleChannelsSelected('virtualAccount', selectedChannels)}
              onEditChannel={(channelData) => handleEditChannel('virtualAccount', channelData.id)}
              onDeleteChannel={(channelData) => handleDeleteChannel('virtualAccount', channelData.id)}
            />
          </div>
          
          <div id="debit-credit-card">
            <DebitCreditCardSection
              channels={channels.debitCreditCard}
              onAddChannel={() => handleAddChannel('debitCreditCard')}
              onChannelsSelected={(selectedChannels) => handleChannelsSelected('debitCreditCard', selectedChannels)}
              onEditChannel={(channelData) => handleEditChannel('debitCreditCard', channelData.id)}
              onDeleteChannel={(channelData) => handleDeleteChannel('debitCreditCard', channelData.id)}
            />
          </div>
          
          <div id="direct-debit">
            <DirectDebitSection
              channels={channels.directDebit}
              onAddChannel={() => handleAddChannel('directDebit')}
              onChannelsSelected={(selectedChannels) => handleChannelsSelected('directDebit', selectedChannels)}
              onEditChannel={(channelData) => handleEditChannel('directDebit', channelData.id)}
              onDeleteChannel={(channelData) => handleDeleteChannel('directDebit', channelData.id)}
            />
          </div>
    </div>
  );
}
