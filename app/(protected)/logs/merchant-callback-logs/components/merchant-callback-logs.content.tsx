"use client";
import { mockMerchantCallbackLogs } from "./merchant-callback-log-table/core/data/mock-merchant-callback-logs";
import { MerchantCallbackLogTable } from "./merchant-callback-log-table";

const MerchantCallbackLogsContent = () => {
  return (
    <div className="w-full">
      <div>
        <p className="text-xl font-semibold text-gray-900">
          Merchant Callback Logs
        </p>
        <p className="text-sm text-gray-700">See all status & callback logs</p>
      </div>

      <div className="mt-6">
        <MerchantCallbackLogTable data={mockMerchantCallbackLogs} />
      </div>
    </div>
  );
};

export default MerchantCallbackLogsContent;
