"use client";

import React, { useState, useMemo } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, Info } from "lucide-react";
import { KeenIcon } from "@/components/keenicons";
import { DetailModal, type DetailItem } from "@/components/shared/modals";
import { MerchantSelectionModal } from "../modals/merchant/merchant-selection-modal";
import { mockBalanceData } from "../../core/data/mock-balance";
import { useMerchantList } from "../../core/hooks/use-merchant-list";
import { useBalanceDetail } from "../../core/hooks/use-balance-detail";

export function BalanceOverview() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMerchantModalOpen, setIsMerchantModalOpen] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState(mockBalanceData.merchant);
  
  const { merchants, loading: merchantLoading, error: merchantError, handleSelectMerchant } = useMerchantList();
  const { balanceData } = useBalanceDetail();

  const handleMerchantSelect = (merchant: any) => {
    setSelectedMerchant(merchant.name);
    handleSelectMerchant(merchant);
    setIsMerchantModalOpen(false);
  };

  // Convert balanceData to DetailItem format
  const balanceItems: DetailItem[] = useMemo(() => {
    if (!balanceData || balanceData.length === 0) {
      return [];
    }

    // Map labels to KeenIcon names
    const iconMapByLabel: Record<string, string> = {
      'Active Balance': 'rocket',
      'Pending Balance': 'watch',
      'Total Balance': 'wallet',
      'Hold Balance': 'shield-cross',
    };

    // Map labels to descriptions
    const descriptionMap: Record<string, string> = {
      'Active Balance': 'Funds available for disbursement from all merchants',
      'Pending Balance': 'Funds not yet released. Pending balances may be awaiting approval or still processing at the bank',
      'Total Balance': 'The overall balance across all merchants',
      'Hold Balance': 'Funds currently held by the internal team and not available for disbursement',
    };

    return balanceData.map((item) => {
      // Extract numeric value from amount string (e.g., "IDR 200.000.000" -> 200000000)
      const numericValue = parseFloat(
        item.amount
          .replace('IDR', '')
          .replace(/\./g, '')
          .trim()
      ) || 0;

      // Get icon name from label
      const iconName = iconMapByLabel[item.label] || 'watch';

      return {
        label: item.label,
        value: numericValue,
        iconName,
        iconStyle: 'outline' as const,
        iconColor: item.iconColor,
        description: descriptionMap[item.label],
      };
    });
  }, [balanceData]);

  return (
    <div className="w-full">
      <Card className="bg-white border border-gray-200 shadow-sm">
        {/* Header Section */}
        <div className="flex items-center justify-between px-6 py-4">
          <div className='flex items-center gap-5'>
          <h2 className="text-lg font-semibold text-gray-900">Balance Overview</h2>
          {/* FLYPAY PG Selector */}
          <button 
              onClick={() => setIsMerchantModalOpen(true)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-400 rounded-lg hover:bg-gray-200 transition-colors"
            >
              {/* FLYPAY PG Icon */}
              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">F</span>
              </div>
              <span className="text-sm font-medium text-gray-900">{selectedMerchant}</span>
              <ChevronDown className="h-4 w-4 text-gray-500" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">

            {/* See Balance Detail Button */}
            <Button 
              variant="outline" 
              className="bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
              onClick={() => setIsModalOpen(true)}
            >
              See Balance Detail
            </Button>
          </div>
        </div>

        {/* Separator Line */}
        <div className="border-t border-gray-200"></div>

        {/* Balance Details Section */}
        <div className="px-6 py-6">
          <div className="flex items-center gap-70">
            {/* Active Balance */}
            <div className="flex items-center gap-4">
              <KeenIcon 
                icon="rocket" 
                style="outline" 
                className="text-4xl text-green-500" 
              />
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-gray-900">
                  IDR {mockBalanceData.balances.activeBalance.toLocaleString('id-ID')}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">Active Balance</span>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Pending Balance */}
            <div className="flex items-center gap-4 border-l pl-4">
              <KeenIcon 
                icon="watch" 
                style="outline" 
                className="text-4xl text-orange-500" 
              />
              <div className="flex flex-col">
                <div className="text-2xl font-bold text-gray-900">
                  IDR {mockBalanceData.balances.pendingBalance.toLocaleString('id-ID')}
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-500">Pending Balance</span>
                  <Info className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      
      <DetailModal
        open={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Balance Detail"
        items={balanceItems}
        currencyFormat={{
          currency: "IDR",
          locale: "id-ID",
          useDotSeparator: true,
        }}
      />
      
      <MerchantSelectionModal
        open={isMerchantModalOpen}
        onOpenChange={setIsMerchantModalOpen}
        onSelectMerchant={handleMerchantSelect}
        merchants={merchants}
        loading={merchantLoading}
        error={merchantError || undefined}
      />
    </div>
  );
}
