import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PayInTransaction } from "../../../core/_models";
import { usePayinStore } from "../../../hooks/usePayinStore";
import {
  getCommonColumns,
  getVAColumns,
  getQRISColumns,
  getDefaultColumns,
  getEndingColumns,
} from "../columnDynamic";

/**
 * Hook that returns dynamic columns based on selected payment method
 * 
 * @returns ColumnDef array for the pay-in transaction table
 * 
 * Column structure:
 * - VA: Common + VA specific + Ending
 * - QRIS: Common + QRIS specific + Ending
 * - Default: Common + Default (Activity, Payment Method, Rates, Fees, etc.)
 */
export function useColumnPayInDynamic(): ColumnDef<PayInTransaction>[] {
  const selectedPaymentMethod = usePayinStore(
    (state) => state.selectedPaymentMethod
  );

  return useMemo(() => {
    const commonColumns = getCommonColumns();

    if (selectedPaymentMethod === "va") {
      // VA columns: Common + VA specific + Ending
      return [...commonColumns, ...getVAColumns(), ...getEndingColumns()];
    } else if (selectedPaymentMethod === "qr_code") {
      // QRIS columns: Common + QRIS specific + Ending
      return [...commonColumns, ...getQRISColumns(), ...getEndingColumns()];
    } else {
      // Default: Common + Default columns (Activity, Payment Method, MDR, Rates, etc.)
      return [...commonColumns, ...getDefaultColumns()];
    }
  }, [selectedPaymentMethod]);
}
