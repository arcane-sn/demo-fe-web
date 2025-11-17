import { Dispatch, SetStateAction } from 'react';
import { ChannelFilterState } from '../types';

export function useFilterActions(setValues: Dispatch<SetStateAction<ChannelFilterState>>) {
  const handleSelectAllMerchantName = () => {
    setValues(prev => ({
      ...prev,
      merchantName: ['DigiStore', 'Other Merchant'],
    }));
  };

  const handleClearMerchantName = () => {
    setValues(prev => ({
      ...prev,
      merchantName: [],
    }));
  };

  const handleSelectAllPaymentMethod = () => {
    setValues(prev => ({
      ...prev,
      paymentMethod: ['e_wallet', 'bank_transfer', 'credit_card', 'debit_card', 'virtual_account'],
    }));
  };

  const handleClearPaymentMethod = () => {
    setValues(prev => ({
      ...prev,
      paymentMethod: [],
    }));
  };

  const handleSelectAllChannel = () => {
    setValues(prev => ({
      ...prev,
      channel: ['DANA', 'OVO', 'LinkAja', 'GoPay', 'PayPal', 'Tcash', 'Jenius', 'Cash', 'Alipay', 'Zelle'],
    }));
  };

  const handleClearChannel = () => {
    setValues(prev => ({
      ...prev,
      channel: [],
    }));
  };

  const handleSelectAllProvider = () => {
    setValues(prev => ({
      ...prev,
      provider: ['PIRO', 'Other'],
    }));
  };

  const handleClearProvider = () => {
    setValues(prev => ({
      ...prev,
      provider: [],
    }));
  };

  return {
    handleSelectAllMerchantName,
    handleClearMerchantName,
    handleSelectAllPaymentMethod,
    handleClearPaymentMethod,
    handleSelectAllChannel,
    handleClearChannel,
    handleSelectAllProvider,
    handleClearProvider,
  };
}