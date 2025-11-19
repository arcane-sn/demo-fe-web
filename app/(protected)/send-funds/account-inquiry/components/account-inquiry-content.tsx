"use client";

import { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { AccountInquiryTable } from "./table/account-inquiry-table";
import { useAccountInquiryList } from "../hooks/useAccountInquiryList";

export function AccountInquiryContent() {
  const { data, loading, error } = useAccountInquiryList();

  const summary = useMemo(() => {
    const totalInquiry = data.length;
    const totalBeneficiary = data.filter((item) => item.accountName !== "-").length;
    const totalFee = data.reduce((sum, item) => {
      const numeric = parseInt(item.inquiryFee.replace(/[^\d]/g, ""), 10) || 0;
      return sum + numeric;
    }, 0);

    return {
      totalInquiry,
      totalBeneficiary,
      totalFee: `IDR ${totalFee.toLocaleString("id-ID")}`,
    };
  }, [data]);

  return (
    <div className="grid gap-5">
      <Card className="border border-gray-100 shadow-sm rounded-3xl">
        <CardContent className="p-0">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <SummarySection
              value={summary.totalInquiry.toLocaleString("id-ID")}
              label="Total Account Inquiry"
            />
            <SummarySection
              value={summary.totalBeneficiary.toLocaleString("id-ID")}
              label="Total Beneficiary Account"
            />
            <SummarySection
              value={summary.totalFee}
              label="Total Inquiry Fee"
            />
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-none">
        <CardContent className="p-0">
          <AccountInquiryTable data={data} loading={loading} error={error} />
        </CardContent>
      </Card>
    </div>
  );
}

interface SummarySectionProps {
  value: string;
  label: string;
}

function SummarySection({ value, label }: SummarySectionProps) {
  return (
    <div className="flex-1 px-6 py-6 text-center">
      <div className="border-r border-gray-300">
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
        <p className="text-sm text-gray-500 mt-1">{label}</p>
      </div>
    </div>
  );
}

