"use client";

import ErrorMessage from "@/components/error-message";
import LoadingButton from "@/components/loading-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { forgotPasswordSchema, ForgotPasswordSchema } from "@/lib/zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handlePasswordReset } from "../actions";
import Disclaimer from "../Disclaimer";
import LogoAuth from "../logo";

const ForgotForm = () => {
  const [globalError, setGlobalError] = useState<string>("");

  const form = useForm<z.infer<ForgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<ForgotPasswordSchema>) => {
    try {
      const result = await handlePasswordReset(values);
      if (result?.message) {
        setGlobalError(result.message);
      }
    } catch (error) {
      console.log(error);
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <LogoAuth />
      {/* ForgotForm */}
      <div className={cn("flex flex-col gap-6")}>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Forgot your password?</CardTitle>
            <CardDescription>
              Enter the email with which you signed up to reset your password.
            </CardDescription>
            {globalError && <ErrorMessage error={globalError} />}
          </CardHeader>
          <CardContent>
            {/* <div className="grid gap-6">
              <SocialLogin />
            </div> */}
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className="grid gap-6">
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email address"
                              autoComplete="off"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <LoadingButton pending={form.formState.isSubmitting}>
                      Send reset link
                    </LoadingButton>
                  </div>
                  <div className="text-center text-sm">
                    Remembered your password?{" "}
                    <Link
                      href="/login"
                      className="underline underline-offset-4"
                    >
                      Log in
                    </Link>
                  </div>
                  <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <Link
                      href="/register"
                      className="underline underline-offset-4"
                    >
                      Sign up
                    </Link>
                  </div>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        <Disclaimer />
      </div>
    </div>
  );
};

export default ForgotForm;
