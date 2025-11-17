import React from "react";
import { FormikProps } from "formik";

interface AccountRoleProps {
  formik: FormikProps<any>;
  setValue: (label: string, value: any) => Promise<void>;
}

const AccountRole: React.FC<AccountRoleProps> = ({ formik, setValue }) => {
  return (
    <div
      id="account-role"
      className="self-stretch bg-white shadow-[0px_3px_4px_rgba(0,0,0,0.03)] rounded-xl border border-[#F1F1F4] flex flex-col justify-start items-start gap-5"
    >
      {/* Header */}
      <div className="self-stretch h-14 px-[30px] py-5 border-b border-[#F1F1F4] flex justify-between items-center">
        <div className="text-[#071437] text-base font-semibold leading-4">
          Account Role
        </div>
        <div className="h-[22px] flex justify-start items-center gap-[10px]"></div>
        <div className="text-[#4B5675] text-[13px] font-normal leading-[14px]">
          User roles may be modified through the User Management menu
        </div>
      </div>

      {/* Content */}
      <div className="self-stretch pb-[30px] flex flex-col justify-start items-start">
        {/* Access Level */}
        <div className="self-stretch px-[30px] py-[10px] flex justify-start items-center gap-[10px]">
          <div className="w-[220px] flex justify-start items-center gap-[10px]">
            <div className="text-[#252F4A] text-[13px] font-normal leading-[14px]">
              Access Level
            </div>
          </div>
          <div className="flex justify-start items-center gap-[6px]">
            <div className="text-[#252F4A] text-sm font-normal leading-[14px]">
              Parent & Sub-Merchants
            </div>
          </div>
        </div>

        {/* Role */}
        <div className="self-stretch px-[30px] py-[10px] flex justify-start items-center gap-[10px]">
          <div className="w-[220px] flex justify-start items-center gap-[10px]">
            <div className="text-[#252F4A] text-[13px] font-normal leading-[14px]">
              Role
            </div>
          </div>
          <div className="flex justify-start items-center gap-[6px]">
            <div className="px-[6px] py-[5px] bg-[#F8F5FF] rounded border border-[rgba(114,57,234,0.20)] flex justify-center items-center">
              <div className="text-[#5014D0] text-[11px] font-medium leading-3">
                Admin
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountRole;
