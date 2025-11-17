import { Button } from "@/components/ui/button";
import DialogContent, {
  Dialog,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  FloatingLabelInput,
  FloatingLabelNumeric,
} from "@/components/ui/floating-label-input";
import { useAppStore } from "@/stores";
import { ChevronDown, PlusSquare, Trash } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { MerchantInfoCard } from "../../../components";

interface AdjustmentRow {
  id: string;
  amount: string;
  remark: string;
}

interface ModalBalanceAdjustmentProps {
  activeBalance?: number;
  open: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

const ModalBalanceAdjustment = ({
  activeBalance = 10000000,
  open,
  onClose,
  onSubmit,
}: ModalBalanceAdjustmentProps) => {
  const {
    setGlobalModalOpen,
    setGlobalModalTitle,
    setGlobalModalSubTitle,
    setGlobalModalMessage,
    setGlobalModalImage,
  } = useAppStore();
  const [debitRows, setDebitRows] = useState<AdjustmentRow[]>([
    { id: "1", amount: "0", remark: "" },
  ]);
  const [creditRows, setCreditRows] = useState<AdjustmentRow[]>([
    { id: "1", amount: "0", remark: "" },
  ]);
  const [isDebitExpanded, setIsDebitExpanded] = useState(true);
  const [isCreditExpanded, setIsCreditExpanded] = useState(true);
  const [errors, setErrors] = useState<{
    debit: Record<string, { amount?: string; remark?: string }>;
    credit: Record<string, { amount?: string; remark?: string }>;
  }>({
    debit: {},
    credit: {},
  });

  // Reset errors when modal opens
  useEffect(() => {
    if (open) {
      setErrors({
        debit: {},
        credit: {},
      });
    }
  }, [open]);

  // Helper functions for managing rows
  const addDebitRow = () => {
    const newId = (debitRows.length + 1).toString();
    setDebitRows([...debitRows, { id: newId, amount: "0", remark: "" }]);
  };

  const addCreditRow = () => {
    const newId = (creditRows.length + 1).toString();
    setCreditRows([...creditRows, { id: newId, amount: "0", remark: "" }]);
  };

  const deleteDebitRow = (id: string) => {
    if (debitRows.length > 1) {
      setDebitRows(debitRows.filter((row) => row.id !== id));
      // Remove error for deleted row
      const newErrors = { ...errors };
      delete newErrors.debit[id];
      setErrors(newErrors);
    }
  };

  const deleteCreditRow = (id: string) => {
    if (creditRows.length > 1) {
      setCreditRows(creditRows.filter((row) => row.id !== id));
      const newErrors = { ...errors };
      delete newErrors.credit[id];
      setErrors(newErrors);
    }
  };

  const updateDebitRow = (
    id: string,
    field: "amount" | "remark",
    value: string
  ) => {
    setDebitRows(
      debitRows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
    if (errors.debit[id]) {
      setErrors({
        ...errors,
        debit: {
          ...errors.debit,
          [id]: {
            ...errors.debit[id],
            [field]: undefined,
          },
        },
      });
    }
  };

  const updateCreditRow = (
    id: string,
    field: "amount" | "remark",
    value: string
  ) => {
    setCreditRows(
      creditRows.map((row) =>
        row.id === id ? { ...row, [field]: value } : row
      )
    );
    // Clear error when user starts typing
    if (errors.credit[id]) {
      setErrors({
        ...errors,
        credit: {
          ...errors.credit,
          [id]: {
            ...errors.credit[id],
            [field]: undefined,
          },
        },
      });
    }
  };

  // Calculate balances
  const calculateDebitBalance = () => {
    return debitRows.reduce(
      (total, row) => total + parseInt(row.amount || "0"),
      0
    );
  };

  const calculateCreditBalance = () => {
    return creditRows.reduce(
      (total, row) => total + parseInt(row.amount || "0"),
      0
    );
  };

  const calculateAdjustedBalance = () => {
    return activeBalance + calculateDebitBalance() - calculateCreditBalance();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
      .format(amount)
      .replace("IDR", "IDR ");
  };

  const validateForm = () => {
    const newErrors: typeof errors = {
      debit: {},
      credit: {},
    };
    let hasError = false;

    // Validate debit rows
    debitRows.forEach((row) => {
      const rowErrors: { amount?: string; remark?: string } = {};
      if (!row.amount || row.amount === "0" || parseInt(row.amount) <= 0) {
        rowErrors.amount = "Amount is required";
        hasError = true;
      }
      if (!row.remark || row.remark.trim() === "") {
        rowErrors.remark = "Remark is required";
        hasError = true;
      }
      if (Object.keys(rowErrors).length > 0) {
        newErrors.debit[row.id] = rowErrors;
      }
    });

    // Validate credit rows
    creditRows.forEach((row) => {
      const rowErrors: { amount?: string; remark?: string } = {};
      if (!row.amount || row.amount === "0" || parseInt(row.amount) <= 0) {
        rowErrors.amount = "Amount is required";
        hasError = true;
      }
      if (!row.remark || row.remark.trim() === "") {
        rowErrors.remark = "Remark is required";
        hasError = true;
      }
      if (Object.keys(rowErrors).length > 0) {
        newErrors.credit[row.id] = rowErrors;
      }
    });

    setErrors(newErrors);
    return !hasError;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }

    if (onSubmit) {
      onSubmit();
    } else {
      onClose();
      setGlobalModalOpen(true);
      setGlobalModalTitle("Submitted");
      setGlobalModalSubTitle("Balance Adjustment Request Submitted");
      setGlobalModalMessage(
        "Your submission will now be reviewed by our team."
      );
      setGlobalModalImage("/assets/image/submitted.svg");
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Balance Adjustment Request</DialogTitle>
        </DialogHeader>
        <div className="w-[675px]">
          <MerchantInfoCard
            merchantName="MetroMart"
            companyName="PT Metro Jaya Teknologika"
            clientId="UP12920398747"
            parentId="UP12920398747"
          />

          <div className="rounded-lg mt-10 w-full self-stretch px-7 py-2.5 bg-stone-50 inline-flex flex-col justify-start items-start gap-5">
            <div
              className="w-full inline-flex justify-between items-center cursor-pointer"
              onClick={() => setIsDebitExpanded(!isDebitExpanded)}
            >
              <div className="justify-start text-slate-900 text-base font-semibold font-['Inter'] leading-none">
                Debit Adjustment
              </div>
              <ChevronDown
                className={`text-gray-600 transition-transform duration-200 ${
                  isDebitExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {isDebitExpanded && (
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                  {debitRows.map((row) => (
                    <div
                      key={row.id}
                      className="self-stretch inline-flex justify-start items-center gap-2.5"
                    >
                      <FloatingLabelNumeric
                        label="Amount"
                        prefix="IDR "
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={0}
                        fixedDecimalScale={false}
                        value={row.amount}
                        onChange={(value) => updateDebitRow(row.id, "amount", value)}
                        placeholder="IDR 0"
                        error={!!errors.debit[row.id]?.amount}
                        errorMessage={errors.debit[row.id]?.amount}
                      />
                      <FloatingLabelInput
                        label="Remark"
                        type="text"
                        value={row.remark}
                        onChange={(value) => updateDebitRow(row.id, "remark", value)}
                        placeholder="Adjustment remark"
                        error={!!errors.debit[row.id]?.remark}
                        errorMessage={errors.debit[row.id]?.remark}
                      />
                      <div
                        data-color="Danger"
                        data-darkmode="False"
                        data-disabled={debitRows.length === 1}
                        data-hover="No"
                        data-shape="Square"
                        data-size="ExtraSmall"
                        data-type="Light"
                        className={`size- p-1.5 bg-rose-50 rounded-md outline-1 outline-offset-[-1px] outline-rose-500/20 flex justify-center items-start gap-2.5 ${
                          debitRows.length === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer hover:bg-rose-100"
                        }`}
                        onClick={() => deleteDebitRow(row.id)}
                      >
                        <Image
                          src="/assets/icon/trash.svg"
                          alt="trash"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="self-stretch py-2.5 inline-flex justify-end items-center gap-2.5">
                  <div
                    data-color="Primary"
                    data-darkmode="False"
                    data-icon="Left"
                    data-size="ExtraSmall"
                    data-state="Default"
                    data-variant="Light"
                    className="size- p-2 bg-blue-50 rounded-md outline-1 outline-offset-[-1px] outline-blue-500/20 flex justify-center items-center gap-[3px] overflow-hidden cursor-pointer hover:bg-blue-100"
                    onClick={addDebitRow}
                  >
                    <PlusSquare className="text-primary size-3" />
                    <div className="justify-start text-blue-500 text-xs font-medium font-['Inter'] leading-3">
                      Add Row
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-lg mt-10 w-full self-stretch px-7 py-2.5 bg-stone-50 inline-flex flex-col justify-start items-start gap-5">
            <div
              className="w-full inline-flex justify-between items-center cursor-pointer"
              onClick={() => setIsCreditExpanded(!isCreditExpanded)}
            >
              <div className="justify-start text-slate-900 text-base font-semibold font-['Inter'] leading-none">
                Credit Adjustment
              </div>
              <ChevronDown
                className={`text-gray-600 transition-transform duration-200 ${
                  isCreditExpanded ? "rotate-180" : "rotate-0"
                }`}
              />
            </div>
            {isCreditExpanded && (
              <div className="self-stretch flex flex-col justify-start items-start">
                <div className="self-stretch flex flex-col justify-start items-start gap-5">
                  {creditRows.map((row) => (
                    <div
                      key={row.id}
                      className="self-stretch inline-flex justify-start items-center gap-2.5"
                    >
                      <FloatingLabelNumeric
                        label="Amount"
                        prefix="IDR "
                        thousandSeparator="."
                        decimalSeparator=","
                        decimalScale={0}
                        fixedDecimalScale={false}
                        value={row.amount}
                        onChange={(value) => updateCreditRow(row.id, "amount", value)}
                        placeholder="IDR 0"
                        error={!!errors.credit[row.id]?.amount}
                        errorMessage={errors.credit[row.id]?.amount}
                      />
                      <FloatingLabelInput
                        label="Remark"
                        type="text"
                        value={row.remark}
                        onChange={(value) => updateCreditRow(row.id, "remark", value)}
                        placeholder="Adjustment remark"
                        error={!!errors.credit[row.id]?.remark}
                        errorMessage={errors.credit[row.id]?.remark}
                      />
                      <div
                        data-color="Danger"
                        data-darkmode="False"
                        data-disabled={creditRows.length === 1}
                        data-hover="No"
                        data-shape="Square"
                        data-size="ExtraSmall"
                        data-type="Light"
                        className={`size- p-1.5 bg-rose-50 rounded-md outline-1 outline-offset-[-1px] outline-rose-500/20 flex justify-center items-start gap-2.5 ${
                          creditRows.length === 1
                            ? "opacity-50 cursor-not-allowed"
                            : "cursor-pointer hover:bg-rose-100"
                        }`}
                        onClick={() => deleteCreditRow(row.id)}
                      >
                        <Image
                          src="/assets/icon/trash.svg"
                          alt="trash"
                          width={16}
                          height={16}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="self-stretch py-2.5 inline-flex justify-end items-center gap-2.5">
                  <div
                    data-color="Primary"
                    data-darkmode="False"
                    data-icon="Left"
                    data-size="ExtraSmall"
                    data-state="Default"
                    data-variant="Light"
                    className="size- p-2 bg-blue-50 rounded-md outline-1 outline-offset-[-1px] outline-blue-500/20 flex justify-center items-center gap-[3px] overflow-hidden cursor-pointer hover:bg-blue-100"
                    onClick={addCreditRow}
                  >
                    <PlusSquare className="text-primary size-3" />
                    <div className="justify-start text-blue-500 text-xs font-medium font-['Inter'] leading-3">
                      Add Row
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-full mt-10 self-stretch px-7 pb-7 inline-flex flex-col justify-center items-end gap-2.5">
            <div className="size- inline-flex justify-start items-center gap-2.5">
              <div className="w-48 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                  Active Balance
                </div>
              </div>
              <div className="w-48 text-right justify-start text-slate-800 text-sm font-normal font-['Inter'] leading-none">
                {formatCurrency(activeBalance)}
              </div>
            </div>
            <div className="size- inline-flex justify-start items-center gap-2.5">
              <div className="w-48 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                  Debit Balance
                </div>
              </div>
              <div className="w-48 text-right justify-start text-emerald-600 text-sm font-normal font-['Inter'] leading-none">
                + {formatCurrency(calculateDebitBalance())}
              </div>
            </div>
            <div className="size- inline-flex justify-start items-center gap-2.5">
              <div className="w-48 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-500 text-sm font-normal font-['Inter'] leading-none">
                  Credit Balance
                </div>
              </div>
              <div className="w-48 text-right justify-start text-rose-500 text-sm font-normal font-['Inter'] leading-none">
                - {formatCurrency(calculateCreditBalance())}
              </div>
            </div>
            <div className="self-stretch h-px bg-gray-100" />
            <div className="size- inline-flex justify-start items-center gap-2.5">
              <div className="w-48 flex justify-start items-center gap-2.5">
                <div className="justify-start text-slate-900 text-sm font-medium font-['Inter'] leading-none">
                  Active Balance Adjustment
                </div>
              </div>
              <div className="w-48 text-right justify-start text-slate-900 text-sm font-medium font-['Inter'] leading-none">
                {formatCurrency(calculateAdjustedBalance())}
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          <div className="w-full flex justify-end gap-2.5">
            <Button variant={"outline"} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>Submit Request</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalBalanceAdjustment;
