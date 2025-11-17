import { usePayoutStore } from "./usePayoutStore";

const useDropdownActionPayin = () => {
  const { setModal } = usePayoutStore();
  return [
    {
      label: "Resend Callback",
      value: "resend_callback",
      onClick: () => setModal("responseVendor", true),
    },
    {
      label: "Force Update Status",
      value: "force_update_status",
      onClick: () => setModal("forceUpdateStatus", true),
    },
    // { label: "Refund", value: "refund" },
    // { label: "Chargeback", value: "chargeback" },
    // { label: "Void", value: "void" },
    // { label: "Cancel", value: "cancel" },
  ];
};

export default useDropdownActionPayin;
