"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, LoaderCircleIcon } from "lucide-react";
import { KeenIcon } from "@/components/keenicons";
import { useForm } from "react-hook-form";
import { useAuth } from "@/providers/auth-provider";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSigninSchema, SigninSchemaType } from "../forms/signin-schema";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const form = useForm<SigninSchemaType>({
    resolver: zodResolver(getSigninSchema()),
    defaultValues: {
      email: "demo@kt.com",
      password: "demo123",
      rememberMe: false,
    },
  });

  // Find the onSubmit function and replace it with this:
  async function onSubmit(values: SigninSchemaType) {
    setIsProcessing(true);
    setError(null);

    try {
      // Use your custom auth instead of NextAuth
      const success = await login(values.email, values.password);

      if (success) {
        router.push("/");
      } else {
        setError("Invalid credentials. Please try again.");
      }
    } catch (err) {
      console.log(err, "err");
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred. Please try again."
      );
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="w-full flex justify-center items-center py-2 pt-5">
          <Image
            src="/assets/image/g4.png"
            alt="Logo"
            width={80}
            height={60}
            className="object-contain"
            priority
            unoptimized
          />
        </div>
        <div className=" pb-2">
          <h1 className="text-2xl font-medium tracking-tight text-center">
            Sign In
          </h1>
          <div className="mt-2 w-full self-stretch inline-flex justify-center items-center gap-1.5">
            <div className="text-center justify-start text-slate-600 text-xs font-normal font-['Inter'] leading-none">
              Need an account?
            </div>
            <div className="text-center justify-start text-blue-500 text-xs font-normal font-['Inter'] leading-none">
              Contact Us
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    placeholder="Your email"
                    {...field}
                    className={fieldState.error ? "pr-10 border-red-500 focus-visible:ring-red-500 focus-visible:ring-1 focus-visible:ring-offset-0" : ""}
                  />
                  {fieldState.error && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                    </div>
                  )}
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>Password</FormLabel>
                <Link
                  href="/reset-password"
                  className="text-sm font-normal text-primary hover:text-primary"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  placeholder="Your password"
                  type={passwordVisible ? "text" : "password"}
                  {...field}
                  className={fieldState.error ? "pr-10 border-red-500 focus-visible:ring-red-500 focus-visible:ring-1 focus-visible:ring-offset-0" : "pr-10"}
                />
                <Button
                  type="button"
                  variant="ghost"
                  mode="icon"
                  size="sm"
                  onClick={() => !fieldState.error && setPasswordVisible(!passwordVisible)}
                  className="absolute end-0 top-1/2 -translate-y-1/2 h-7 w-7 me-1.5 bg-transparent! pointer-events-auto"
                  aria-label={
                    fieldState.error
                      ? "Validation error"
                      : passwordVisible
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {fieldState.error ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <KeenIcon
                      icon={passwordVisible ? "eye-slash" : "eye"}
                      style="outline"
                      className="text-muted-foreground text-md"
                    />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center space-x-2">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <>
                <Checkbox
                  id="remember-me"
                  checked={field.value}
                  onCheckedChange={(checked) => field.onChange(!!checked)}
                />
                <label
                  htmlFor="remember-me"
                  className="text-sm leading-none text-gray-900"
                >
                  Remember me
                </label>
              </>
            )}
          />
        </div>

        <div className="flex flex-col gap-2.5">
          <Button type="submit" disabled={isProcessing}>
            {isProcessing ? (
              <LoaderCircleIcon className="size-4 animate-spin" />
            ) : null}
            Continue
          </Button>
        </div>
      </form>
    </Form>
  );
}
