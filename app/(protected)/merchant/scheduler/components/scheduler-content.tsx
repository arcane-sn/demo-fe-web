'use client';

import { MerchantTable } from "./table";
import { EditSchedulerModal } from "./modals/edit";
import { useSchedulerData, useSchedulerActions } from "./hooks";

export function SchedulerContent() {
  const { merchants, loading, error } = useSchedulerData();

  const {
    openEditScheduler,
    selectedMerchant,
    setOpenEditScheduler,
    handleEdit,
    handleSchedulerSave,
    handleSchedulerReset,
    getMockSchedulerState,
    getMockMerchantInfo,
  } = useSchedulerActions();

  const handleCreate = () => {
    console.log("Create new merchant");
  };

  return (
    <div className="space-y-6">
      <MerchantTable
        data={merchants}
        onEdit={handleEdit}
        onCreate={handleCreate}
        loading={loading}
        error={error || undefined}
      />

      {selectedMerchant && (
        <EditSchedulerModal
          open={openEditScheduler}
          onOpenChange={(open: boolean) => {
            if (!open) {
              setOpenEditScheduler(false);
            }
          }}
          merchantInfo={getMockMerchantInfo(selectedMerchant)}
          schedulerState={getMockSchedulerState()}
          onSave={handleSchedulerSave}
          onReset={handleSchedulerReset}
        />
      )}
    </div>
  );
}