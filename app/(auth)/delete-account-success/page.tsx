"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Illustration } from "@/components/common/illustration";

export default function DeleteAccountSuccessPage() {
  return (
    <div className="">
      {/* <div className="w-full max-w-md"> */}
      <div className="bg-white rounded-xl p-10 flex flex-col items-center gap-7.5">
        {/* Icon */}
        <Illustration.resetPasswordRequest />

        {/* Title and Description */}
        <div className="flex flex-col items-center gap-5">
          <div className="text-[#071437] text-b-18-18-500 text-center">
            Your Account Has Been Deleted
          </div>
          <div className="w-[294px] text-[#4B5675] text-b-13-20-400 text-center">
            We're sorry to see you go. Thank you for being part of our
            community, and we hope to welcome you back in the future.
          </div>
        </div>

        {/* Go to Login Button */}
        <div className="w-full">
          <Button asChild className="w-full">
            <Link href="/signin">Go to Login Page</Link>
          </Button>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
}
