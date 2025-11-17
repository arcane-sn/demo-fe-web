import * as React from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input, InputWrapper } from "./input";
import { Button } from "./button";
import { cva, type VariantProps } from "class-variance-authority";
import {
  isPasswordCombinationLetterNumberSymbol,
  isPasswordLeast8Char,
  isPasswordContainUppercase,
} from "@/app/(protected)/account/list/component/create-account-dialog/component/create-account-form/core/hooks";
import { Icons } from "../common/icons";

const inputPasswordVariants = cva("relative flex items-center", {
  variants: {
    variant: {
      sm: "",
      md: "",
      lg: "",
    },
  },
  defaultVariants: {
    variant: "md",
  },
});

export interface InputPasswordProps
  extends Omit<React.ComponentProps<"input">, "type">,
    VariantProps<typeof inputPasswordVariants> {
  showPassword?: boolean;
  onToggleVisibility?: () => void;
  showToggle?: boolean;
  showCriteria?: boolean;
}

const InputPassword = React.forwardRef<HTMLInputElement, InputPasswordProps>(
  (
    {
      className,
      variant,
      showPassword = false,
      onToggleVisibility,
      showToggle = true,
      showCriteria = false,
      ...props
    },
    ref
  ) => {
    const [isPasswordVisible, setIsPasswordVisible] =
      React.useState(showPassword);

    const handleToggleVisibility = () => {
      const newVisibility = !isPasswordVisible;
      setIsPasswordVisible(newVisibility);
      onToggleVisibility?.();
    };

    const criteriaRender = () => {
      return (
        <div className="pt-2">
          <div className="flex w-full items-center self-center">
            <div className="pr-2 ">
              {isPasswordLeast8Char(props.value as string) ? (
                <Icons.check_circle />
              ) : (
                <Icons.cross_circle />
              )}
            </div>
            <div className="pt-2">
              <p className="pb-2 text-b-14-14-400 text-[var(--color-gray-600)]">
                At least 8 characters
              </p>
            </div>
          </div>
          <div className="flex w-full items-center self-center">
            <div className="pr-2 ">
              {isPasswordContainUppercase(props.value as string) ? (
                <Icons.check_circle />
              ) : (
                <Icons.cross_circle />
              )}
            </div>
            <div className="pt-2">
              <p className="pb-2 text-b-14-14-400 text-[var(--color-gray-600)]">
                At least one uppercase letter
              </p>
            </div>
          </div>
          <div className="flex w-full items-center self-center">
            <div className="pr-2 ">
              {isPasswordCombinationLetterNumberSymbol(
                props.value as string
              ) ? (
                <Icons.check_circle />
              ) : (
                <Icons.cross_circle />
              )}
            </div>
            <div className="pt-2">
              <p className="pb-2 text-b-14-14-400 text-[var(--color-gray-600)]">
                A combination of letters, numbers, and symbols
              </p>
            </div>
          </div>
        </div>
      );
    };

    return (
      <div className="w-full">
        <div className={cn(inputPasswordVariants({ variant }), className)}>
          <InputWrapper variant={variant}>
            <Input
              ref={ref}
              type={isPasswordVisible ? "text" : "password"}
              {...props}
            />
            {showToggle && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent hover:bg-transparent p-0"
                onClick={handleToggleVisibility}
                tabIndex={-1}
              >
                {isPasswordVisible ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </Button>
            )}
          </InputWrapper>
        </div>
        {showCriteria && <div className="mt-2 w-full">{criteriaRender()}</div>}
      </div>
    );
  }
);

InputPassword.displayName = "InputPassword";

export { InputPassword, inputPasswordVariants };
