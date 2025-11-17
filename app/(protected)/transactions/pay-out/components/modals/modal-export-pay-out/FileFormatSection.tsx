"use client";

import { useState } from "react";
import { FileText, FileSpreadsheet, File } from "lucide-react";

interface FileFormat {
  id: string;
  label: string;
  icon: React.ReactNode;
  selected?: boolean;
}

interface FileFormatSectionProps {
  selectedFormat: string;
  onFormatChange: (formatId: string) => void;
}

export function FileFormatSection({
  selectedFormat,
  onFormatChange,
}: FileFormatSectionProps) {
  const formats: FileFormat[] = [
    {
      id: "pdf",
      label: "PDF",
      icon: <FileText className="w-10 h-10 text-red-500" />,
      selected: true,
    },
    {
      id: "csv",
      label: "CSV",
      icon: <FileSpreadsheet className="w-10 h-10 text-green-500" />,
    },
    {
      id: "xls",
      label: "XLS",
      icon: <File className="w-10 h-10 text-green-500" />,
    },
  ];

  return (
    <div className="flex flex-col items-start gap-5 px-8 w-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-2 w-full">
        <h3 className="text-b-14-14-500 text-gray-900">Files format</h3>
        <p className="text-b-13-20-400 text-gray-500 w-full">
          Select a file format for export. The export will include all applied
          filters.
        </p>
      </div>

      {/* Format Options */}
      <div className="flex items-start gap-8 w-full">
        {formats.map((format) => (
          <div
            key={format.id}
            className={`flex flex-col h-40 items-center justify-center gap-2.5 flex-1 rounded-xl border border-dashed shadow-sm cursor-pointer transition-all ${
              selectedFormat === format.id
                ? "bg-blue-50 border-blue-500"
                : "bg-white border-gray-300 hover:border-gray-400"
            }`}
            onClick={() => onFormatChange(format.id)}
          >
            {/* Icon */}
            <div className="relative z-10">{format.icon}</div>

            {/* Label */}
            <span className="text-b-15-16-500 text-gray-900 text-center">
              {format.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
