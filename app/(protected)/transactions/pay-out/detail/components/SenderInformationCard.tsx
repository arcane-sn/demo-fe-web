"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PayOutDetailTransaction } from "../../core/_models";
import {
  getSenderIdentityDetailsData,
  getSenderLocationData,
  getSenderBankCodeData,
} from "../core/_helpers";

interface SenderInformationCardProps {
  transaction: PayOutDetailTransaction;
}

export function SenderInformationCard({
  transaction,
}: SenderInformationCardProps) {
  return (
    <Card>
      <CardHeader className="py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Sender Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-7 flex flex-col gap-10">
        {/* Sender Identity Details Section */}
        <div className="flex flex-col gap-5">
          <h4 className="text-base font-semibold text-slate-900 leading-none">
            Sender Identity Details
          </h4>
          <div className="flex flex-col gap-4">
            {getSenderIdentityDetailsData(transaction).map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-2.5 min-h-4">
                  <div className="w-44 flex items-center gap-2.5">
                    <div className="text-sm font-normal text-slate-500 leading-none">
                      {item.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-sm font-normal text-slate-800 leading-none">
                      {item.value}
                    </div>
                  </div>
                </div>
                {index <
                  getSenderIdentityDetailsData(transaction).length - 1 && (
                  <div className="h-px bg-gray-100 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sender Location Section */}
        <div className="flex flex-col gap-5">
          <h4 className="text-base font-semibold text-slate-900 leading-none">
            Sender Location
          </h4>
          <div className="flex flex-col gap-4">
            {getSenderLocationData(transaction).map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-2.5 min-h-4">
                  <div className="w-44 flex items-center gap-2.5">
                    <div className="text-sm font-normal text-slate-500 leading-none">
                      {item.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-sm font-normal text-slate-800 leading-none">
                      {item.value}
                    </div>
                  </div>
                </div>
                {index < getSenderLocationData(transaction).length - 1 && (
                  <div className="h-px bg-gray-100 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Sender Bank Code Section */}
        <div className="flex flex-col gap-5">
          <h4 className="text-base font-semibold text-slate-900 leading-none">
            Sender Bank Code
          </h4>
          <div className="flex flex-col gap-4">
            {getSenderBankCodeData(transaction).map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-2.5 min-h-4">
                  <div className="w-44 flex items-center gap-2.5">
                    <div className="text-sm font-normal text-slate-500 leading-none">
                      {item.label}
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="text-sm font-normal text-slate-800 leading-none">
                      {item.value}
                    </div>
                  </div>
                </div>
                {index < getSenderBankCodeData(transaction).length - 1 && (
                  <div className="h-px bg-gray-100 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
