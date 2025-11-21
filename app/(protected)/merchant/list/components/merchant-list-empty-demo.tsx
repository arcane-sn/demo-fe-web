'use client';

import React from 'react';
import { MerchantTable } from './table/merchant-table';
import { Button } from '@/components/ui/button';
import { useMerchantList } from '../core/hooks/use-merchant-list';

/**
 * Demo component untuk menunjukkan empty state pada merchant table
 * Komponen ini menggunakan data kosong untuk menampilkan empty state
 */
export function MerchantListEmptyDemo() {
  const {
    selectedMerchants,
    loading,
    error,
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handleSelectionChange,
  } = useMerchantList();

  // Data kosong untuk demo empty state
  const emptyData: any[] = [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Merchants (Empty State Demo)</h1>
          <p className="text-sm text-muted-foreground">
            Demo untuk menunjukkan empty state ketika tidak ada data merchant
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedMerchants.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {selectedMerchants.length} selected
            </span>
          )}
          <Button onClick={handleCreate} disabled={loading}>
            Add Merchant
          </Button>
        </div>
      </div>

      {/* Table dengan data kosong untuk demo empty state */}
      <MerchantTable
        data={emptyData}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCreate={handleCreate}
        onSelectionChange={handleSelectionChange}
        loading={loading}
        error={error}
      />

      {/* Info box untuk menjelaskan demo */}
      <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-medium text-blue-800">Demo Empty State</h3>
            <p className="text-sm text-blue-700 mt-1">
              Halaman ini menunjukkan bagaimana tabel akan terlihat ketika tidak ada data merchant. 
              Empty state akan menampilkan ilustrasi, pesan yang informatif, dan tombol aksi untuk membuat merchant baru.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
