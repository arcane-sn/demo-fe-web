import { useState } from 'react';
import { SchedulerFilterState } from '../types';
import { initialValues } from '../constants';

export function useFilterState() {
  const [values, setValues] = useState<SchedulerFilterState>(initialValues);

  const updateValue = (path: string, value: any) => {
    setValues((prev: SchedulerFilterState) => {
      const newValues = { ...prev };
      const keys = path.split('.');
      let current: any = newValues;
      
      for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
      }
      
      current[keys[keys.length - 1]] = value;
      return newValues;
    });
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

