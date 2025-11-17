"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import Image from "next/image";

// Hexagonal error icon component
const HexagonErrorIcon = () => {
  return (
    <Image
      src="/assets/icon/Union.png"
      alt="Error"
      width={20}
      height={20}
      className="flex-shrink-0"
    />
  );
};

export interface FloatingLabelInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "value" | "onChange"
  > {
  label: string;
  value?: string | number;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export interface FloatingLabelNumericProps
  extends Omit<NumericFormatProps, "value" | "onChange"> {
  label: string;
  value?: string | number;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export interface FloatingLabelTextareaProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  error?: boolean;
  errorMessage?: string;
  labelClassName?: string;
  containerClassName?: string;
}

const FloatingLabelWrapper = ({
  label,
  children,
  error = false,
  errorMessage,
  labelClassName,
  containerClassName,
}: {
  label: string;
  children: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  labelClassName?: string;
  containerClassName?: string;
}) => {
  return (
    <div className={cn("flex-1 relative", containerClassName)}>
      {children}
      <div className="z-10 px-[3px] left-[7px] top-[-5.50px] absolute flex justify-start items-center">
        <div className="relative flex items-center">
          <div className="absolute inset-y-0 left-0 right-0 h-px top-[5.50px] bg-white -mx-[3px]" />
          <div
            className={cn(
              "relative z-12 px-[3px] bg-white justify-start text-xs font-normal leading-3 whitespace-nowrap",
              error ? "text-red-500" : "text-slate-500",
              labelClassName
            )}
          >
            {label}
          </div>
        </div>
      </div>
      {error && errorMessage && (
        <div className="mt-1 text-xs font-normal text-red-500 leading-3">
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelInputProps
>(
  (
    {
      label,
      value,
      onChange,
      error = false,
      errorMessage,
      className,
      labelClassName,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <FloatingLabelWrapper
        label={label}
        error={error}
        errorMessage={errorMessage}
        labelClassName={labelClassName}
        containerClassName={containerClassName}
      >
        <div className="relative">
          <input
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
              "w-full px-3 py-3 pr-10 bg-neutral-50 rounded-md outline-1 outline-offset-[-1px] text-slate-800 text-xs font-normal leading-none focus:bg-white",
              error
                ? "outline-red-500 focus:outline-red-500"
                : "outline-zinc-200 focus:outline-blue-500",
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <HexagonErrorIcon />
            </div>
          )}
        </div>
      </FloatingLabelWrapper>
    );
  }
);

FloatingLabelInput.displayName = "FloatingLabelInput";

export const FloatingLabelNumeric = React.forwardRef<
  HTMLInputElement,
  FloatingLabelNumericProps
>(
  (
    {
      label,
      value,
      onChange,
      error = false,
      errorMessage,
      className,
      labelClassName,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <FloatingLabelWrapper
        label={label}
        error={error}
        errorMessage={errorMessage}
        labelClassName={labelClassName}
        containerClassName={containerClassName}
      >
        <div className="relative">
          <NumericFormat
            {...props}
            getInputRef={ref}
            value={value}
            onChange={(e) => {
              const value = e.target.value.replace(/[^\d]/g, "");
              onChange?.(value);
            }}
            className={cn(
              "w-full px-3 py-3 pr-10 bg-neutral-50 rounded-md outline-1 outline-offset-[-1px] text-slate-800 text-xs font-normal leading-none focus:bg-white",
              error
                ? "outline-red-500 focus:outline-red-500"
                : "outline-zinc-200 focus:outline-blue-500",
              className
            )}
          />
          {error && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-center">
              <HexagonErrorIcon />
            </div>
          )}
        </div>
      </FloatingLabelWrapper>
    );
  }
);

FloatingLabelNumeric.displayName = "FloatingLabelNumeric";

export const FloatingLabelTextarea = React.forwardRef<
  HTMLTextAreaElement,
  FloatingLabelTextareaProps
>(
  (
    {
      label,
      value,
      onChange,
      error = false,
      errorMessage,
      className,
      labelClassName,
      containerClassName,
      ...props
    },
    ref
  ) => {
    return (
      <FloatingLabelWrapper
        label={label}
        error={error}
        errorMessage={errorMessage}
        labelClassName={labelClassName}
        containerClassName={containerClassName}
      >
        <div className="relative">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            className={cn(
              "w-full px-3 py-3 pr-10 bg-neutral-50 rounded-md outline-1 outline-offset-[-1px] text-slate-800 text-xs font-normal leading-none focus:bg-white resize-none",
              error
                ? "outline-red-500 focus:outline-red-500"
                : "outline-zinc-200 focus:outline-blue-500",
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute right-3 top-3 flex items-center justify-center">
              <HexagonErrorIcon />
            </div>
          )}
        </div>
      </FloatingLabelWrapper>
    );
  }
);

FloatingLabelTextarea.displayName = "FloatingLabelTextarea";

