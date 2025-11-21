"use client";
import { mockApplicationLogs } from "./application-log-table/core/data/mock-application-logs";
import { ApplicationLogTable } from "./application-log-table";

const ApplicationLogsContent = () => {
  return (
    <div className="w-full">
      <div>
        <p className="text-xl font-semibold text-grey-900">Application Logs</p>
        <p className="text-sm text-grey-700">View all application logs</p>
      </div>
      <div className="mt-6">
        <ApplicationLogTable data={mockApplicationLogs} />
      </div>
    </div>
  );
};

export default ApplicationLogsContent;
