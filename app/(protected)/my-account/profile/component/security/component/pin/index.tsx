import React from "react";
import { InputPassword } from "@/components/ui/input-password";
import { useFormik } from "formik";
import PinSectionCard from "./component/pin-section-card";
import PinFooter from "./component/footer";
import DialogSetupPin from "../dialog-setup-pin";
import DialogResetPin from "../dialog-reset-pin";

const Pin: React.FC = () => {
  const isAccountPinEnabled = true;

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    onSubmit: (values) => {
      console.log("PIN setup form submitted:", values);
    },
  });

  const handleConfirmSetup = (pin: string) => {
    console.log("PIN setup completed:", pin);
    // Handle PIN setup logic here
  };

  const handleConfirmReset = (currentPin: string) => {
    console.log("PIN reset - current PIN:", currentPin);
    // Handle PIN reset logic here
  };

  return (
    <div className="bg-white shadow-sm border border-[#F1F1F4] rounded-xl">
      {/* Header */}
      <div className="h-14 px-8 py-5 border-b border-[#F1F1F4] flex items-center gap-2.5">
        <div className="text-[#071437] text-b-16-16-600">6-Digit PIN</div>
      </div>

      {/* Content */}
      <div className="pt-8 pb-5 px-8 flex flex-col gap-5">
        {/* PIN Status Card */}
        <PinSectionCard isAccountPinEnabled={isAccountPinEnabled} />
      </div>

      {/* Password Input */}
      <div className="px-8 py-2.5 flex items-center gap-2.5">
        <div className="w-55 flex items-center gap-2.5">
          <div className="text-[#252F4A] text-b-13-14-400">Password</div>
        </div>
        <div className="flex-1">
          <InputPassword
            id="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter password"
          />
        </div>
      </div>

      {/* Helper Text */}
      <div className="px-8 flex items-center gap-2.5">
        <div className="w-55"></div>
        <div className="flex-1 flex items-center gap-7.5">
          <div className="flex-1 text-[#252F4A] text-b-13-20-400">
            Enter your password to setup PIN
          </div>
        </div>
      </div>

      {/* Footer */}
      <PinFooter
        isAccountPinEnabled={isAccountPinEnabled}
        onSubmit={() => formik.handleSubmit()}
      />

      {/* Setup PIN Dialog */}
      <DialogSetupPin
        trigger={<div />}
        onConfirmSetup={handleConfirmSetup}
        isFromReset={isAccountPinEnabled}
      />

      {/* Reset PIN Dialog */}
      <DialogResetPin trigger={<div />} onConfirmReset={handleConfirmReset} />
    </div>
  );
};

export default Pin;
