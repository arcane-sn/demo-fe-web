import React from "react";

interface PinSectionCardProps {
  isAccountPinEnabled: boolean;
}

const PinSectionCard: React.FC<PinSectionCardProps> = ({
  isAccountPinEnabled,
}) => {
  return (
    <div className="p-4 bg-[rgba(249,249,249,0.20)] border border-[#F1F1F4] rounded-xl flex justify-between items-center">
      <div className="flex items-center gap-3.5">
        <div className="relative">
          <div className="w-12 h-12 rounded-lg flex items-center justify-center">
            <img
              src="/assets/icon/hexa_pin.svg"
              alt="PIN Lock"
              className="w-50 h-50"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-[#071437] text-b-14-14-500">6-Digit PIN</div>
          <div className="text-[#4B5675] text-b-13-14-500">
            Set a 6-digit code to help keep your account secure
          </div>
        </div>
      </div>

      {isAccountPinEnabled ? (
        // Secured state
        <div className="px-2 py-2 bg-[#EAFFF1] border border-[#17C653]/20 rounded text-[#04B440] text-b-11-12-500">
          Secured
        </div>
      ) : (
        // Unsecured state
        <div className="px-2 py-2 bg-[#FFEEF3] border border-[#F8285A]/20 rounded text-[#D81A48] text-b-11-12-500">
          Unsecured
        </div>
      )}
    </div>
  );
};

export default PinSectionCard;
