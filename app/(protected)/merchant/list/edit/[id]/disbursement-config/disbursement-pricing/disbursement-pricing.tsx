'use client';

import { useState, useCallback } from 'react';
import { mockBankData } from './_lib/mock-data';
import { BankData } from './_lib/types';
import { EditBankPricingModal } from './edit-bank-pricing';
import { Button } from '@/components/ui/button';
import { DisbursementPricingTable } from './_components/table/disbursement-pricing-table';

export function DisbursementPricingForm() {
  const [selectedBanks, setSelectedBanks] = useState<BankData[]>([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBankData, setSelectedBankData] = useState<BankData | null>(null);
  const [editMode, setEditMode] = useState<'single' | 'selected' | 'all'>('single');

  const handleEditBank = useCallback((bankData: BankData) => {
    setSelectedBankData(bankData);
    setEditMode('single');
    setIsEditModalOpen(true);
  }, []);

  const handleEditSelectedBanks = useCallback(() => {
    if (selectedBanks.length === 1) {
      // Single edit if only one bank is selected
      setSelectedBankData(selectedBanks[0]);
      setEditMode('single');
    } else {
      // Multi edit if multiple banks are selected
      setSelectedBankData(null);
      setEditMode('selected');
    }
    setIsEditModalOpen(true);
  }, [selectedBanks]);

  const handleEditAllBanks = useCallback(() => {
    setSelectedBankData(null);
    setEditMode('all');
    setIsEditModalOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsEditModalOpen(false);
    setSelectedBankData(null);
    setEditMode('single');
  }, []);

  const handleDeleteBank = useCallback((bankData: BankData) => {
    // TODO: Implement delete bank functionality
    console.log('Delete bank:', bankData);
  }, []);

  const handleSelectionChange = useCallback((selectedBanks: BankData[]) => {
    setSelectedBanks(selectedBanks);
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Disbursement Pricing</h1>
          <p className="text-sm text-muted-foreground">All banks pricing setup to this merchant</p>
        </div>  
      </div>
      <div className="flex justify-between items-center">
        <Button 
          onClick={handleEditAllBanks}
          variant="outline"
          className="border-gray-300"
        >
          Edit All Banks
        </Button>
        <div className="flex items-center gap-3">
          <Button variant="outline">
            Selected Bank: {selectedBanks.length}
          </Button>
          <Button 
            onClick={handleEditSelectedBanks}
            variant="outline"
            className="border-gray-300 flex items-center gap-2"
            disabled={selectedBanks.length === 0}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit Selected Banks
          </Button>
        </div>
      </div>
      <div className="mt-6">
        <DisbursementPricingTable
          data={mockBankData}
          onEdit={handleEditBank}
          onDelete={handleDeleteBank}
          onSelectionChange={handleSelectionChange}
        />
      </div>
      <EditBankPricingModal
        isOpen={isEditModalOpen}
        onClose={handleCloseModal}
        bankData={selectedBankData}
        editMode={editMode}
        selectedBanksCount={selectedBanks.length}
      />
    </div>
  );
}
