"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wallet,
  Rocket,
  Watch,
  ShieldCloseIcon,
  Boxes,
  RefreshCcw,
  BoxesIcon,
} from "lucide-react";
import BalanceOverview from "./balance-overview";
import { mockMerchantBalances } from "../core/data/mock-merchant-balances";
import { useMerchantBalanceList } from "../core/hooks/use-merchant-balance-list";
import { MerchantBalanceTable } from "./table";
import { ModalOtp } from "../../components";
import { useState } from "react";
import ModalBalanceAdjustment from "./modal/modal.balance-adjustment";
import ModalBalanceHoldList from "./modal/modal.balance-hold-list";
import ModalBalanceHold from "./modal/modal.balance-hold";
import ModalBalanceTopup from "./modal/modal.balance-topup";
import ModalBalanceRelease from "./modal/modal.balance-release";
import ModalBalanceDetail from "./modal/modal.balance-detail";
import ModalExport from "@/app/(protected)/components/modal/export/modal-export";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function MerchantBalanceContent() {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [showBalanceAdjustmentModal, setShowBalanceAdjustmentModal] =
    useState(false);
  const [showBalanceHoldModal, setShowBalanceHoldModal] = useState(false);
  const [showBalanceTopupModal, setShowBalanceTopupModal] = useState(false);
  const [showBalanceReleaseModal, setShowBalanceReleaseModal] = useState(false);
  const [showBalanceHoldListModal, setShowBalanceHoldListModal] =
    useState(false);
  const [showBalanceDetailModal, setShowBalanceDetailModal] = useState(false);
  const [activeBalance, setActiveBalance] = useState(0);
  const [currentFlow, setCurrentFlow] = useState<string | null>(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const {
    selectedMerchants,
    loading,
    error,
    handleView,
    handleEdit,
    handleDelete,
    handleCreate,
    handleRowClick,
    handleSelectionChange,
    clearError,
  } = useMerchantBalanceList();

  const handleOtpVerify = (otp: string) => {
    console.log("OTP Verified:", otp);
    // Add your OTP verification logic here
    setShowOtpModal(false);
    setCurrentFlow(null);

    // Close all modals based on current flow
    if (currentFlow === "topup") {
      setShowBalanceTopupModal(false);
    } else if (currentFlow === "adjustment") {
      setShowBalanceAdjustmentModal(false);
    } else if (currentFlow === "release") {
      setShowBalanceReleaseModal(false);
    }
  };

  const handleOtpClose = () => {
    setShowOtpModal(false);
    setCurrentFlow(null);
  };

  // Flow handlers
  const handleTopupFlow = () => {
    setCurrentFlow("topup");
    setShowBalanceTopupModal(true);
  };

  const handleAdjustmentFlow = (row: any) => {
    setCurrentFlow("adjustment");
    setShowBalanceAdjustmentModal(true);
    setActiveBalance(row.activeBalance.amount);
  };

  const handleReleaseFlow = () => {
    setCurrentFlow("release");
    setShowBalanceHoldListModal(true);
  };

  const handleHoldFlow = () => {
    setCurrentFlow("hold");
    setShowBalanceHoldModal(true);
  };

  // Modal progression handlers
  const handleTopupSubmit = () => {
    setShowBalanceTopupModal(false);
    setShowOtpModal(true);
  };

  const handleAdjustmentSubmit = () => {
    setShowBalanceAdjustmentModal(false);
    setShowOtpModal(true);
  };

  const handleHoldListSelect = () => {
    setShowBalanceHoldListModal(false);
    setShowBalanceReleaseModal(true);
  };

  const handleReleaseSubmit = () => {
    setShowBalanceReleaseModal(false);
    setShowOtpModal(true);
  };

  return (
    <div className="grid gap-5 lg:gap-7.5">
      <div className="w-full">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="w-full flex items-center justify-between">
              <div className="size- inline-flex justify-start items-center gap-3">
                <div className="justify-start text-grey-900 text-base font-semibold font-['Inter'] leading-none">
                  Provider Balance Overview
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  className=" bg-primary-light text-primary border-primary-clarity-20"
                >
                  <RefreshCcw />
                  Refresh Balance
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowBalanceDetailModal(true)}
                >
                  See Balance Detail
                </Button>
                <Select disabled>
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        <div className="flex items-center gap-2">
                          <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                            <BoxesIcon className="size-4" />
                          </div>
                          <span className="text-gray-900 font-normal">
                            [Provider Name]
                          </span>
                        </div>
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Alto Premium">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                          <BoxesIcon className="size-4" />
                        </div>
                        <span className="text-grey-900">[Alto Premium]</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Alto Standar">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                          <BoxesIcon className="size-4" />
                        </div>
                        <span className="text-grey-900">[Alto Standar]</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Alto Basic">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                          <BoxesIcon className="size-4" />
                        </div>
                        <span className="text-grey-900">[Alto Basic]</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="Flip ">
                      <div className="flex items-center gap-2">
                        <div className="rounded-full p-1 bg-primary-light border-primary-clarity-20 text-primary">
                          <BoxesIcon className="size-4" />
                        </div>
                        <span className="text-grey-900">[Flip]</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <div className="w-full flex items-center justify-start gap-40">
                <BalanceOverview
                  icon={<Rocket className="h-7 w-7 text-success -mt-3" />}
                  value="IDR 1.195.000.000"
                  title="Total Active Balance"
                />
                <div className="h-12 w-1 border-l border-gray-200 "></div>
                <BalanceOverview
                  icon={<Watch className="h-7 w-7 text-orange -mt-3" />}
                  value="IDR 155.000.000"
                  title="Total Pending Balance"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold">
              Merchants Balance Summary
            </h1>
            <p className="text-sm text-muted-foreground">
              View summary of all merchant balance
            </p>
          </div>
        </div>

        {/* Table */}
        <MerchantBalanceTable
          data={mockMerchantBalances}
          topUpBalance={handleTopupFlow}
          balanceAdjustment={handleAdjustmentFlow}
          releaseBalance={handleReleaseFlow}
          holdBalance={handleHoldFlow}
          onRowClick={handleRowClick}
          onSelectionChange={handleSelectionChange}
          loading={loading}
          error={error}
          onOpenExport={() => setShowExportModal(true)}
        />

        <ModalOtp
          open={showOtpModal}
          onClose={handleOtpClose}
          onVerify={handleOtpVerify}
          email="admin@flypay.com"
        />
        <ModalBalanceAdjustment
          open={showBalanceAdjustmentModal}
          onClose={() => setShowBalanceAdjustmentModal(false)}
          onSubmit={handleAdjustmentSubmit}
          activeBalance={activeBalance}
        />
        <ModalBalanceHold
          open={showBalanceHoldModal}
          onClose={() => setShowBalanceHoldModal(false)}
        />
        <ModalBalanceHoldList
          open={showBalanceHoldListModal}
          onClose={() => setShowBalanceHoldListModal(false)}
          onSelect={handleHoldListSelect}
        />
        <ModalBalanceTopup
          open={showBalanceTopupModal}
          onClose={() => setShowBalanceTopupModal(false)}
          onSubmit={handleTopupSubmit}
        />
        <ModalBalanceRelease
          open={showBalanceReleaseModal}
          onClose={() => setShowBalanceReleaseModal(false)}
          onSubmit={handleReleaseSubmit}
        />
        <ModalExport
          open={showExportModal}
          onClose={() => setShowExportModal(false)}
        />
        <ModalBalanceDetail
          open={showBalanceDetailModal}
          onClose={() => setShowBalanceDetailModal(false)}
          activeBalance={200000000}
          pendingBalance={100000000}
          totalBalance={300000000}
          holdBalance={1000000}
        />
      </div>
    </div>
  );
}
