import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// Input variants for the input part
const inputActionInputVariants = cva(
  `
    flex flex-1 bg-background border border-input shadow-xs shadow-black/5 transition-[color,box-shadow] text-foreground placeholder:text-muted-foreground/80 
    focus-visible:ring-ring/30 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px]     
    disabled:cursor-not-allowed disabled:opacity-60 
    [&[readonly]]:bg-muted/80 [&[readonly]]:cursor-not-allowed
  `,
  {
    variants: {
      variant: {
        lg: "h-10 px-4 text-sm rounded-l-md rounded-r-none",
        md: "h-8.5 px-3 text-[0.8125rem] leading-(--text-sm--line-height) rounded-l-md rounded-r-none",
        sm: "h-7 px-2.5 text-xs rounded-l-md rounded-r-none",
      },
      error: {
        true: "border-destructive/60 ring-destructive/10 focus-visible:border-destructive focus-visible:ring-destructive/20 dark:border-destructive dark:ring-destructive/20",
        false: "",
      },
    },
    defaultVariants: {
      variant: "md",
      error: false,
    },
  }
);

// Button variants for the action button part
const inputActionButtonVariants = cva(
  `
    cursor-pointer inline-flex items-center justify-center whitespace-nowrap font-medium ring-offset-background transition-[color,box-shadow] 
    disabled:pointer-events-none disabled:opacity-60 border border-input
    focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/30
  `,
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground hover:bg-primary/90 border-primary",
        mono: "bg-zinc-950 text-white dark:bg-zinc-300 dark:text-black hover:bg-zinc-950/90 dark:hover:bg-zinc-300/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 border-destructive",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/90 border-secondary",
        outline:
          "bg-background text-accent-foreground border border-input hover:bg-accent",
        dashed:
          "text-accent-foreground border border-input border-dashed bg-background hover:bg-accent",
        ghost: "text-accent-foreground hover:bg-accent border-transparent",
        dim: "text-muted-foreground hover:text-foreground border-transparent",
      },
      size: {
        lg: "h-10 rounded-r-md px-4 text-sm gap-1.5",
        md: "h-8.5 rounded-r-md px-3 gap-1.5 text-[0.8125rem] leading-(--text-sm--line-height)",
        sm: "h-7 rounded-r-md px-2.5 gap-1.25 text-xs",
        icon: "h-8.5 rounded-r-md px-3 shrink-0",
      },
    },
    defaultVariants: {
      variant: "outline",
      size: "md",
    },
  }
);

interface InputActionProps {
  // Input props - all standard input HTML attributes
  type?: React.InputHTMLAttributes<HTMLInputElement>["type"];
  value?: React.InputHTMLAttributes<HTMLInputElement>["value"];
  defaultValue?: React.InputHTMLAttributes<HTMLInputElement>["defaultValue"];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>["onChange"];
  onBlur?: React.InputHTMLAttributes<HTMLInputElement>["onBlur"];
  onFocus?: React.InputHTMLAttributes<HTMLInputElement>["onFocus"];
  placeholder?: React.InputHTMLAttributes<HTMLInputElement>["placeholder"];
  disabled?: React.InputHTMLAttributes<HTMLInputElement>["disabled"];
  readOnly?: React.InputHTMLAttributes<HTMLInputElement>["readOnly"];
  required?: React.InputHTMLAttributes<HTMLInputElement>["required"];
  id?: React.InputHTMLAttributes<HTMLInputElement>["id"];
  name?: React.InputHTMLAttributes<HTMLInputElement>["name"];
  autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
  autoFocus?: React.InputHTMLAttributes<HTMLInputElement>["autoFocus"];
  maxLength?: React.InputHTMLAttributes<HTMLInputElement>["maxLength"];
  minLength?: React.InputHTMLAttributes<HTMLInputElement>["minLength"];
  pattern?: React.InputHTMLAttributes<HTMLInputElement>["pattern"];
  className?: React.InputHTMLAttributes<HTMLInputElement>["className"];

  // Input styling props
  inputVariant?: VariantProps<typeof inputActionInputVariants>["variant"];
  inputError?: VariantProps<typeof inputActionInputVariants>["error"];
  inputClassName?: string;

  // Button props - all standard button HTML attributes
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  buttonType?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  buttonDisabled?: React.ButtonHTMLAttributes<HTMLButtonElement>["disabled"];

  // Button styling props
  buttonVariant?: VariantProps<typeof inputActionButtonVariants>["variant"];
  buttonSize?: VariantProps<typeof inputActionButtonVariants>["size"];
  buttonClassName?: string;
  buttonText?: React.ReactNode;
  buttonChildren?: React.ReactNode;

  // Container props
  containerClassName?: string;
}

const InputAction = React.forwardRef<HTMLDivElement, InputActionProps>(
  (
    {
      // Input props
      type = "text",
      value,
      defaultValue,
      onChange,
      onBlur,
      onFocus,
      placeholder,
      disabled,
      readOnly,
      required,
      id,
      name,
      autoComplete,
      autoFocus,
      maxLength,
      minLength,
      pattern,
      className,
      inputVariant,
      inputError,
      inputClassName,

      // Button props
      onClick,
      buttonType = "button",
      buttonDisabled,
      buttonVariant,
      buttonSize,
      buttonClassName,
      buttonText,
      buttonChildren,

      // Container props
      containerClassName,
    },
    ref
  ) => {
    const isDisabled = disabled || readOnly;

    return (
      <div
        ref={ref}
        className={cn("flex items-stretch w-full", containerClassName)}
      >
        {/* Input part */}
        <input
          type={type}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          placeholder={placeholder}
          disabled={isDisabled}
          readOnly={readOnly}
          required={required}
          id={id}
          name={name}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          className={cn(
            inputActionInputVariants({
              variant: inputVariant,
              error: inputError,
            }),
            inputClassName,
            className
          )}
        />

        {/* Button part */}
        <button
          type={buttonType}
          onClick={onClick}
          disabled={buttonDisabled}
          className={cn(
            inputActionButtonVariants({
              variant: buttonVariant,
              size: buttonSize,
            }),
            buttonClassName
          )}
        >
          {buttonChildren || buttonText || "Change"}
        </button>
      </div>
    );
  }
);

InputAction.displayName = "InputAction";

export { InputAction, inputActionInputVariants, inputActionButtonVariants };
