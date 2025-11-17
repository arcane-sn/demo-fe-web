"use client";

import React, { useState } from "react";
import PermissionListTable from "./component/permission-list-table";
import { permissionListMock } from "./component/permission-list-table/core/hooks";
import { WarningBanner } from "@/components/common/warning-banner";
import ModalExport from "@/app/(protected)/components/modal/export/modal-export";

export default function PermissionPage() {
  const [showExportModal, setShowExportModal] = useState(false);

  return (
    <div className="container mx-auto pb-6 pl-6 pr-6">
      {/* Header Section */}
      <div className="flex flex-col gap-5 mb-8">
        <div className="flex flex-col gap-2">
          <h1 className="text-b-20-20-600 text-[#071437]">Permissions List</h1>
          <p className="text-B-14-14-400 text-[#4B5675]">
            View and all registered permissions
          </p>
        </div>

        {/* Warning Banner */}
        <WarningBanner
          title="Add or Delete Permissions"
          description="To add or delete permissions, please contact the developer team"
        />
      </div>

      {/* Table Section */}
      <div className="pt-6">
        <PermissionListTable
          data={permissionListMock}
          onOpenExport={() => setShowExportModal(true)}
        />
      </div>

      {/* Export Modal */}
      <ModalExport
        open={showExportModal}
        onClose={() => setShowExportModal(false)}
      />
    </div>
  );
}
