import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import {
  getBeneficiaryBankDetailsData,
  getBeneficiaryIdentityData,
} from "../core/_helpers";
import { PayOutDetailTransaction } from "../../core/_models";

const BeneficiaryInformationCard = ({
  transaction,
}: {
  transaction: PayOutDetailTransaction;
}) => {
  return (
    <Card className="bg-white rounded-xl shadow-[0px_3px_4px_0px_rgba(0,0,0,0.03)] border border-gray-100 flex flex-col gap-5">
      <CardHeader className="py-5 border-b border-gray-100">
        <CardTitle className="text-base font-semibold text-slate-900 leading-none">
          Beneficiary Information
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-7 flex flex-col gap-10">
        {/* Beneficiary Bank Details Section */}
        <div className="flex flex-col gap-5">
          <p className=" text-base font-semibold text-slate-900 leading-none">
            Beneficiary Bank Details
          </p>
          <div className="flex flex-col gap-4">
            {getBeneficiaryBankDetailsData(transaction).map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-2.5 min-h-4">
                  <p className="min-w-56 text-sm font-normal text-slate-500 leading-none gap-2.5">
                    {item.label}
                  </p>
                  <div className="flex items-center gap-2.5">
                    {item.badge ? (
                      <div className="px-1.5 py-1 bg-emerald-50 rounded-full border border-green-500/20 flex items-center gap-1">
                        <div className="w-1 h-1 bg-green-500 rounded-full" />
                        <p className="text-xs font-medium text-green-600 leading-3">
                          {item.badge.label}
                        </p>
                      </div>
                    ) : (
                      <p className="text-sm font-normal text-slate-800 leading-none">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
                {index <
                  getBeneficiaryBankDetailsData(transaction).length - 1 && (
                  <div className="h-px bg-gray-100 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Beneficiary Identity Section */}
        <div className="flex flex-col gap-5">
          <h4 className="text-base font-semibold text-slate-900 leading-none">
            Beneficiary Identity
          </h4>

          <div className="flex flex-col gap-4">
            {getBeneficiaryIdentityData(transaction).map((item, index) => (
              <div key={index}>
                <div className="flex items-center gap-2.5 min-h-4">
                  <p className="min-w-56 text-sm font-normal text-slate-500 leading-none">
                    {item.label}
                  </p>

                  <p className="text-sm font-normal text-slate-800 leading-none">
                    {item.value}
                  </p>
                </div>
                {index < getBeneficiaryIdentityData(transaction).length - 1 && (
                  <div className="h-px bg-gray-100 mt-4" />
                )}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BeneficiaryInformationCard;
