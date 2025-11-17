import { ChannelFilterState } from './types';

export const initialValues: ChannelFilterState = {
  dateFilter: {
    type: 'registeredDate',
    dateRange: undefined,
  },
  merchantName: [],
  paymentMethod: [],
  channel: [],
  provider: [],
};