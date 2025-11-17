import { DateRange } from "react-day-picker";

export interface ChannelFilterState {
  dateFilter: {
    type: string;
    dateRange?: DateRange;
  };
  merchantName: string[];
  paymentMethod: string[];
  channel: string[];
  provider: string[];
}

export interface ChannelFilterModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply?: (values: ChannelFilterState) => void;
  onReset?: () => void;
}