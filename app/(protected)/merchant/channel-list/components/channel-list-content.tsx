"use client";

import { ChannelTable } from './table/channel-table';
import { ChannelData } from '../../types/channel';
import { useChannelData } from './hooks/useChannelData';


export function ChannelListContent() {
  const { channels, loading, error } = useChannelData();

  const handleView = (channel: ChannelData) => {
    console.log('View channel:', channel);
  };

  const handleEdit = (channel: ChannelData) => {
    console.log('Edit channel:', channel);
  };

  const handleDelete = (channel: ChannelData) => {
    console.log('Delete channel:', channel);
  };

  const handleCreate = () => {
    console.log('Create new channel');
  };

  const handleExport = (data: ChannelData[]) => {
    console.log('Export channels:', data);
    
    // Create CSV content
    const headers = [
      'ID',
      'Parent ID', 
      'Merchant Name',
      'Client ID',
      'Payment Method',
      'Channel Name',
      'Channel Type',
      'Provider',
      'NMID',
      'MDR',
      'Provider Rate',
      'Merchant Rate',
      'Flypay Rate',
      'Reseller Rate',
      'Sales Referral ID',
      'Sales Referral Fee',
      'Merchant Referral ID',
      'Merchant Referral Fee',
      'Settlement Day',
      'Same Day Settlement',
      'Status',
      'Registered Date',
      'Registered By',
      'Updated At',
      'Updated By'
    ];

    const csvContent = [
      headers.join(','),
      ...data.map(channel => [
        channel.id,
        channel.parentId,
        channel.merchantName,
        channel.clientId,
        channel.paymentMethod.label,
        channel.channel.name,
        channel.channel.type,
        channel.provider,
        channel.nmid,
        channel.mdr,
        channel.providerRate,
        channel.merchantRate,
        channel.flypayRate,
        channel.resellerRate,
        channel.salesReferralId,
        channel.salesReferralFee,
        channel.merchantReferralId,
        channel.merchantReferralFee,
        channel.settlementDay,
        channel.sameDaySettlement,
        channel.status.label,
        channel.registeredDate.date,
        channel.registeredBy.name,
        channel.updatedAt.date,
        channel.updatedBy.name
      ].map(field => `"${field}"`).join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `channel-list-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRowClick = (channel: ChannelData) => {
    console.log('Row clicked:', channel);
  };

  const handleSelectionChange = (selectedChannels: ChannelData[]) => {
    console.log('Selection changed:', selectedChannels);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Channel Management</h1>
          <p className="text-muted-foreground">
            Manage channel across all merchants.
          </p>
        </div>
      </div>

      {/* Channel Table */}
      <ChannelTable 
        data={channels}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onExport={handleExport}
        onRowClick={handleRowClick}
        onSelectionChange={handleSelectionChange}
        loading={loading}
        error={error ?? undefined}
      />
    </div>
  );
}
