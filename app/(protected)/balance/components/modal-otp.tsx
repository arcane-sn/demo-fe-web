"use client";

import { useState, useRef, useEffect } from "react";
import DialogContent, { Dialog, DialogTitle } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import OtpInput from "@/components/ui/otp-input";

interface ModalOtpProps {
  open?: boolean;
  onClose?: () => void;
  onVerify?: (otp: string) => void;
  email?: string;
}

const MAX_RESEND_COUNT = 3;
const RESEND_DELAY_SECONDS = 60;

const ModalOtp = ({
  open = false,
  onClose,
  onVerify,
  email = "johndoe@gmail.com",
}: ModalOtpProps) => {
  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleOnChange = (value: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input if value is entered
    if (value && index < 5) {
      setActiveOtpIndex(index + 1);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleOnKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      setActiveOtpIndex(index - 1);
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpString = otp.join("");
    if (otpString.length === 6) {
      onVerify?.(otpString);
    }
  };

  const handleResend = () => {
    if (resendCount >= MAX_RESEND_COUNT || countdown > 0) {
      return;
    }

    setResendCount((prev) => prev + 1);
    
    setOtp(new Array(6).fill(""));
    setActiveOtpIndex(0);
    
    setCountdown(RESEND_DELAY_SECONDS);
    
    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 0);
    
  };

  useEffect(() => {
    if (countdown > 0) {
      countdownIntervalRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            if (countdownIntervalRef.current) {
              clearInterval(countdownIntervalRef.current);
              countdownIntervalRef.current = null;
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    }

    return () => {
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    };
  }, [countdown]);

  useEffect(() => {
    if (inputRefs.current[activeOtpIndex]) {
      inputRefs.current[activeOtpIndex]?.focus();
    }
  }, [activeOtpIndex]);

  useEffect(() => {
    if (open) {
      setOtp(new Array(6).fill(""));
      setActiveOtpIndex(0);
      setResendCount(0);
      setCountdown(0);
      // Focus will be handled by activeOtpIndex effect
    } else {
      // Clean up when modal closes
      setResendCount(0);
      setCountdown(0);
      if (countdownIntervalRef.current) {
        clearInterval(countdownIntervalRef.current);
        countdownIntervalRef.current = null;
      }
    }
  }, [open]);

  return (
    <Dialog open={open} modal onOpenChange={onClose}>
      <DialogContent className="w-[380px] p-10" close={false}>
        <DialogTitle></DialogTitle>
        <div className="flex items-center justify-center flex-col">
          <Image
            src="/assets/icon/otp.svg"
            alt="otp-modal"
            width={50}
            height={50}
          />
          <div className="mt-5 self-stretch text-center justify-start text-slate-900 text-lg font-medium font-['Inter'] leading-none">
            User Verification
          </div>
          <div className="mt-2 self-stretch text-center justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-none">
            Enter the OTP Code we sent to
          </div>
          <div className="mt-1 self-stretch text-center justify-start text-slate-900 text-xs font-medium font-['Inter'] leading-none">
            {email}
          </div>

          {/* OTP Input */}
          <div className="mt-9">
            <OtpInput
              otp={otp}
              activeOtpIndex={activeOtpIndex}
              inputRefs={inputRefs}
              handleOnChange={handleOnChange}
              handleOnKeyDown={handleOnKeyDown}
              setActiveOtpIndex={setActiveOtpIndex}
            />
          </div>

          <div className="mt-5 self-stretch text-center justify-start">
            <span className="text-slate-600 text-xs font-normal font-['Inter'] leading-3">
              Didn't receive a code?{" "}
              {countdown > 0 && `(${countdown}s)`}
            </span>
            {resendCount < MAX_RESEND_COUNT ? (
              <button
                onClick={handleResend}
                disabled={countdown > 0}
                className={`ml-1 text-xs font-normal font-['Inter'] leading-3 ${
                  countdown > 0
                    ? "text-slate-400 cursor-not-allowed"
                    : "text-blue-500 cursor-pointer hover:text-blue-600"
                }`}
              >
                Resend
              </button>
            ) : (
              <span className="ml-1 text-slate-400 text-xs font-normal font-['Inter'] leading-3 cursor-not-allowed">
                Resend (Limit reached)
              </span>
            )}
          </div>
          <Button onClick={handleVerify} className="w-full mt-9">
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalOtp;

