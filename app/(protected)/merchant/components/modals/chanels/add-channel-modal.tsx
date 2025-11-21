"use client";

import { useState } from "react";
import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "@/components/ui/dialog";

export type ChannelType =
  | "ewallet"
  | "qr"
  | "virtual-account"
  | "direct-debit"
  | "credit-card";

export interface Channel {
  id: string;
  name: string;
  setupFeeRate: string;
  provider: string;
  logo: string;
  logoColor: string;
}

interface AddChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddChannels: (selectedChannels: string[]) => void;
  channelType: ChannelType;
  availableChannels: Channel[];
}

export function AddChannelModal({
  isOpen,
  onClose,
  onAddChannels,
  channelType,
  availableChannels,
}: AddChannelModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);

  const getModalTitle = (type: ChannelType) => {
    switch (type) {
      case "ewallet":
        return "Add e-Wallet Channel";
      case "qr":
        return "Add QR Code Channel";
      case "virtual-account":
        return "Add Virtual Account Channel";
      case "direct-debit":
        return "Add Direct Debit Channel";
      case "credit-card":
        return "Add Payment Type";
      default:
        return "Add Channel";
    }
  };

  const filteredChannels = availableChannels.filter((channel) =>
    channel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChannelSelection = (channelId: string) => {
    setSelectedChannels((prev) =>
      prev.includes(channelId)
        ? prev.filter((id) => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleAddChannels = () => {
    onAddChannels(selectedChannels);
    setSelectedChannels([]);
    setSearchQuery("");
    onClose();
  };

  const handleClose = () => {
    setSelectedChannels([]);
    setSearchQuery("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {getModalTitle(channelType)}
          </DialogTitle>
        </DialogHeader>

        <DialogBody>
          {/* Search Input */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search channel"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Channel List */}
          <div className="space-y-3 max-h-80 overflow-y-auto">
            {filteredChannels.length > 0 ? (
              filteredChannels.map((channel) => {
                const isSelected = selectedChannels.includes(channel.id);
                return (
                  <div
                    key={channel.id}
                    onClick={() => handleChannelSelection(channel.id)}
                    className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${
                      isSelected ? "bg-blue-50 border-blue-300" : ""
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => handleChannelSelection(channel.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                    {/* Channel Logo - only show if logo exists */}
                    {channel.logo && (
                      <div className="w-10 h-10 rounded flex items-center justify-center overflow-hidden bg-white border">
                        {channel.logo.startsWith("/media/") ? (
                          <img
                            src={channel.logo}
                            alt={channel.name}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <div
                            className={`w-full h-full ${channel.logoColor} rounded flex items-center justify-center text-white text-xs font-bold`}
                          >
                            {channel.logo}
                          </div>
                        )}
                      </div>
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{channel.name}</p>
                      <p className="text-xs text-gray-500">
                        Setup Fee Rate: {channel.setupFeeRate}
                      </p>
                      <p className="text-xs text-gray-500">
                        Provider: {channel.provider}
                      </p>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No channels available</p>
                {searchQuery && (
                  <p className="text-xs mt-1">
                    Try adjusting your search terms
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogBody>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            onClick={handleAddChannels}
            disabled={selectedChannels.length === 0}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Add Channel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
