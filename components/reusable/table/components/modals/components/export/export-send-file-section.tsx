"use client";

import { Input } from "@/components/ui/input";

interface ExportSendFileSectionProps {
  email: string;
  onEmailChange: (email: string) => void;
  label?: string;
  placeholder?: string;
  description?: string;
}

export function ExportSendFileSection({
  email,
  onEmailChange,
  label = "Send File To",
  placeholder = "Enter email address",
  description = "Exported file will be sent via email",
}: ExportSendFileSectionProps) {
  return (
    <div className="flex flex-col items-start w-full">
      {/* Header */}
      <div className="flex flex-col items-start gap-2 px-8 w-full">
        <h3 className="text-b-14-14-500 text-gray-900">Send File</h3>
        {description && (
          <p className="text-b-13-20-400 text-gray-500">{description}</p>
        )}
      </div>

      {/* Email Input */}
      <div className="flex items-center gap-2.5 px-8 py-2.5 w-full">
        <div className="flex w-25 items-center gap-2.5">
          <label className="text-b-13-14-400 text-gray-800 whitespace-nowrap">
            {label}
          </label>
        </div>
        <div className="flex items-center gap-2.5 px-3 py-3.5 flex-1 ">
          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={placeholder}
            className="flex-1 bg-transparent text-b-13-14-400 text-gray-800 placeholder:text-gray-500"
          />
        </div>
      </div>
    </div>
  );
}

