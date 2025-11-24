'use client';

import { useForm, UseFormReturn, FieldValues, Path, DefaultValues } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCallback } from 'react';
import { toast } from 'sonner';

export interface FormBaseConfig<T extends FieldValues> {
  schema: z.ZodType<T>;
  defaultValues: DefaultValues<T>;
  onSubmit?: (data: T) => Promise<void> | void;
  onError?: (error: Error) => void;
}

export interface FormBaseReturn<T extends FieldValues> {
  form: UseFormReturn<T>;
  handleSubmit: (data: T) => Promise<void>;
  isSubmitting: boolean;
  reset: () => void;
  setValue: (name: Path<T>, value: any) => void;
  watch: UseFormReturn<T>['watch'];
}

export function useFormBase<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onError,
}: FormBaseConfig<T>): FormBaseReturn<T> {
  const form = useForm<T>({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
    mode: 'onChange',
  });

  const handleSubmit = useCallback(async (data: T) => {
    try {
      if (onSubmit) {
        await onSubmit(data);
        toast.success('Data saved successfully');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      toast.error(`Failed to save data: ${errorMessage}`);
      
      if (onError) {
        onError(error instanceof Error ? error : new Error(errorMessage));
      }
    }
  }, [onSubmit, onError]);

  const reset = useCallback(() => {
    form.reset(defaultValues);
  }, [form, defaultValues]);

  const setValue = useCallback((name: Path<T>, value: any) => {
    form.setValue(name, value);
  }, [form]);

  return {
    form,
    handleSubmit,
    isSubmitting: form.formState.isSubmitting,
    reset,
    setValue,
    watch: form.watch,
  };
}

/**
 * Hook for form validation with custom validation rules
 */
export function useFormValidation<T extends FieldValues>(
  form: UseFormReturn<T>,
  customRules?: Record<string, (value: any) => string | undefined>
) {
  const validateField = useCallback((name: Path<T>, value: any) => {
    const rule = customRules?.[name as string];
    if (rule) {
      return rule(value);
    }
    return undefined;
  }, [customRules]);

  const validateForm = useCallback(async () => {
    const isValid = await form.trigger();
    return isValid;
  }, [form]);

  return {
    validateField,
    validateForm,
    errors: form.formState.errors,
    isValid: form.formState.isValid,
  };
}

/**
 * Hook for form field dependencies
 */
export function useFormDependencies<T extends FieldValues>(
  form: UseFormReturn<T>,
  dependencies: Record<string, (value: any, formValues: T) => void>
) {
  const watchedValues = form.watch();

  Object.entries(dependencies).forEach(([fieldName, callback]) => {
    const fieldValue = watchedValues[fieldName as keyof T];
    if (fieldValue !== undefined) {
      callback(fieldValue, watchedValues);
    }
  });

  return watchedValues;
}

