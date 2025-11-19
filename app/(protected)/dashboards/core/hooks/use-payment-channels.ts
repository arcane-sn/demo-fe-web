import { useState } from "react";
import { PaymentChannel } from "../models";
import { DEFAULT_PAYMENT_CHANNELS } from "../constants";

export const usePaymentChannels = () => {
  const [hoveredSlice, setHoveredSlice] = useState<number | null>(null);
  const [channels] = useState<PaymentChannel[]>(DEFAULT_PAYMENT_CHANNELS);

  return {
    channels,
    hoveredSlice,
    setHoveredSlice,
  };
};

