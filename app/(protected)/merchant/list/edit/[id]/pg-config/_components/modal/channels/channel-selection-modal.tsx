"use client";

import React, { useState, useMemo } from 'react';
import { KeenIcon } from '@/components/keenicons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ReusableTable } from '@/components/table';
import { ChannelData } from '../../../_lib/types';
import { getTableColumns } from '../../table/table-columns';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from '@/components/ui/dialog';

interface ChannelSelectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  channels: ChannelData[];
  selectedChannels: ChannelData[];
  onSave: (selectedChannels: ChannelData[]) => void;
  title?: string;
}

export function ChannelSelectionModal({
  open,
  onOpenChange,
  channels,
  selectedChannels,
  onSave,
  title = "Select e-Wallet Channels"
}: ChannelSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [localSelectedChannels, setLocalSelectedChannels] = useState<ChannelData[]>(selectedChannels || []);

  const filteredChannels = useMemo(() => {
    if (!channels) return [];
    if (!searchQuery) return channels;
    return channels.filter(channel => 
      channel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      channel.provider.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [channels, searchQuery]);

  const handleEditChannel = (channelId: string) => {
    // TODO: Implement edit functionality for modal
    // This could open another modal or navigate to edit page
  };

  const modalColumns = getTableColumns({
    showActions: true,
    showEditAction: false,  // ✅ No edit action in modal (used in create merchant)
    onEditChannel: handleEditChannel,
    showDeleteAction: false,  // ✅ No delete action in modal
  });

  const handleSave = () => {
    onSave(localSelectedChannels);
    onOpenChange(false);
  };

  const handleCancel = () => {
    setLocalSelectedChannels(selectedChannels || []);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-6xl"
        close={false}
      >
        <DialogHeader>
            <DialogTitle className="text-lg  font-semibold">{title}</DialogTitle>
        </DialogHeader>
        <DialogBody className="flex-1 overflow-hidden p-0">
          <ReusableTable
            config={{
              data: filteredChannels,
              columns: modalColumns,
              enableSorting: true,
              enablePagination: true,
              enableRowSelection: true,
              showSearchBar: true,
              searchBarPlaceholder: "Search channel",
            }}
            onSelectionChange={(selectedRows) => {
              setLocalSelectedChannels(selectedRows);
            }}
            headerConfig={{
              customHeader: (
                <div className="space-y-3 flex items-center justify-between">      
                  <div className="relative">
                    <KeenIcon icon="magnifier" style="outline" className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search channel"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        Selected channel: {localSelectedChannels?.length || 0}
                      </span>
                    </div>
                  </div>
                </div>
              ),
            }}
            footerConfig={{
              showPagination: true,
              showSelectedCount: false,
            }}
          />
        </DialogBody>

        <DialogFooter className="flex-shrink-0 ">
          <div className="flex justify-end gap-3 w-full">
            <Button
              variant="outline"
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Save Changes
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
