import { useState } from 'react';
import { ChannelFilterState } from '../types';
import { initialValues } from '../constants';

export function useFilterState() {
  const [values, setValues] = useState<ChannelFilterState>(initialValues);

  const updateValue = (key: keyof ChannelFilterState, value: any) => {
    setValues((prev: ChannelFilterState) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetValues = () => {
    setValues(initialValues);
  };

  return {
    values,
    setValues,
    updateValue,
    resetValues,
  };
}