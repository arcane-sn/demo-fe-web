import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import SectionItemDialCode, {
  dialCodeOptions,
} from "@/components/common/section-item-dial-code";

export interface InputPhoneNumberProps {
  /**
   * The dial code value (e.g., "+62", "+1") - optional, defaults to "+62"
   */
  dialCode?: string;
  /**
   * The phone number value (without dial code)
   */
  phoneNumber: string;
  /**
   * Callback when dial code changes
   */
  onDialCodeChange: (dialCode: string) => void;
  /**
   * Callback when phone number changes
   */
  onPhoneNumberChange: (phoneNumber: string) => void;
  /**
   * Input placeholder text
   */
  placeholder?: string;
  /**
   * Input ID for accessibility
   */
  id?: string;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the dial code component
   */
  dialCodeClassName?: string;
  /**
   * Additional CSS classes for the phone number input
   */
  phoneNumberClassName?: string;
  /**
   * Whether the input is disabled
   */
  disabled?: boolean;
  /**
   * Whether the input is required
   */
  required?: boolean;
}

const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  dialCode = "+62",
  phoneNumber,
  onDialCodeChange,
  onPhoneNumberChange,
  placeholder = "e.g. 81234567890",
  id = "phoneNumber",
  className = "",
  dialCodeClassName = "w-32",
  phoneNumberClassName = "flex-1",
  disabled = false,
  required = false,
}) => {
  const [currentDialCode, setCurrentDialCode] = useState(dialCode);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState(phoneNumber);

  // Handle phone number input with validation and formatting
  const handlePhoneNumberChange = (value: string) => {
    // Remove all non-numeric characters except +
    let cleanValue = value.replace(/[^\d+]/g, "");

    // If starts with +, handle dial code extraction
    if (cleanValue.startsWith("+")) {
      // Extract dial codes from the imported options and sort by length (longest first)
      const dialCodes = dialCodeOptions.map((option) => option.code);
      const sortedDialCodes = dialCodes.sort((a, b) => b.length - a.length);

      for (const code of sortedDialCodes) {
        if (cleanValue.startsWith(code)) {
          const phoneNumberPart = cleanValue.substring(code.length);
          // Validate phone number part (no leading 0, only digits)
          if (
            phoneNumberPart === "" ||
            (!phoneNumberPart.startsWith("0") && /^\d*$/.test(phoneNumberPart))
          ) {
            setCurrentDialCode(code);
            setCurrentPhoneNumber(phoneNumberPart);
            onDialCodeChange(code);
            onPhoneNumberChange(phoneNumberPart);
            return;
          }
        }
      }
    }

    // Regular phone number input (no +)
    // Remove leading 0 and non-numeric characters
    cleanValue = cleanValue.replace(/^0+/, "").replace(/\D/g, "");

    setCurrentPhoneNumber(cleanValue);
    onPhoneNumberChange(cleanValue);
  };

  // Handle dial code change
  const handleDialCodeChange = (newDialCode: string) => {
    setCurrentDialCode(newDialCode);
    onDialCodeChange(newDialCode);
  };

  // Update internal state when props change
  useEffect(() => {
    setCurrentDialCode(dialCode);
  }, [dialCode]);

  useEffect(() => {
    setCurrentPhoneNumber(phoneNumber);
  }, [phoneNumber]);

  return (
    <div className={`flex gap-2 flex-1 ${className}`}>
      <SectionItemDialCode
        value={currentDialCode}
        onValueChange={handleDialCodeChange}
        className={dialCodeClassName}
        disabled={disabled}
      />
      <Input
        id={id}
        value={currentPhoneNumber}
        onChange={(e) => handlePhoneNumberChange(e.target.value)}
        placeholder={placeholder}
        className={phoneNumberClassName}
        disabled={disabled}
        required={required}
        type="tel"
      />
    </div>
  );
};

export default InputPhoneNumber;
