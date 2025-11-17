import React from "react";
import { Button } from "@/components/ui/button";
import { useDialogStore } from "../../../../core/hooks/use-dialog";

interface PinFooterProps {
  isAccountPinEnabled: boolean;
  onSubmit: () => void;
}

const PinFooter: React.FC<PinFooterProps> = ({
  isAccountPinEnabled,
  onSubmit,
}) => {
  const { openSetupPin, openResetPin } = useDialogStore();

  const handleSetupClick = () => {
    if (!isAccountPinEnabled) {
      // If PIN is not enabled, go directly to setup PIN
      openSetupPin();
    } else {
      // If PIN is enabled, go to reset PIN first, then setup PIN
      openResetPin();
    }
  };
  return (
    <div className="px-8 pb-8 flex flex-col gap-2.5 pt-8">
      <div className="flex justify-end">
        {isAccountPinEnabled ? (
          <Button
            variant="outline"
            onClick={handleSetupClick}
            style={{
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "13px",
              paddingBottom: "13px",
              background: "#EFF6FF",
              borderRadius: "6px",
              border: "1px solid rgba(27, 132, 255, 0.20)",
              color: "#1B84FF",
              fontSize: "13px",
              fontWeight: "500",
              lineHeight: "14px",
            }}
          >
            Reset PIN
          </Button>
        ) : (
          <Button variant="primary" onClick={handleSetupClick}>
            Setup
          </Button>
        )}
      </div>
    </div>
  );
};

export default PinFooter;
