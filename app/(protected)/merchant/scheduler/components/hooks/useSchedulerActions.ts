import { useState } from "react";
import { MerchantData } from "../../types/merchant-data";
import { SchedulerState, MerchantInfo } from "../modals/edit/types";
import { DEFAULT_SCHEDULER_CONFIG } from "../../data/constants";

export function useSchedulerActions() {
  const [openEditScheduler, setOpenEditScheduler] = useState(false);
  const [selectedMerchant, setSelectedMerchant] = useState<MerchantData | null>(null);

  const handleEdit = (merchant: MerchantData) => {
    setSelectedMerchant(merchant);
    setOpenEditScheduler(true);
  };

  const handleSchedulerSave = (schedulerState: SchedulerState) => {
    console.log("Saving scheduler state:", schedulerState);
    setOpenEditScheduler(false);
  };

  const handleSchedulerReset = () => {
    console.log("Resetting scheduler state");
  };

  const getMockSchedulerState = (): SchedulerState => ({
    settlement: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    transactionReport: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    transactionSummary: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    balanceStatement: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
    disbursement: {
      enabled: false,
      config: DEFAULT_SCHEDULER_CONFIG,
    },
  });

  const getMockMerchantInfo = (merchant: MerchantData): MerchantInfo => ({
    clientId: merchant.clientId,
    companyName: `PT ${merchant.merchantName.toUpperCase()} TEKNOLOGI`,
    merchantName: merchant.merchantName,
  });

  return {
    openEditScheduler,
    selectedMerchant,
    setOpenEditScheduler,
    handleEdit,
    handleSchedulerSave,
    handleSchedulerReset,
    getMockSchedulerState,
    getMockMerchantInfo,
  };
}

