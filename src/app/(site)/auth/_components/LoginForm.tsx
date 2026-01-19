"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Eye, EyeOff, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { authClient } from "@/lib/auth-client";
import { loginUserSchema, loginUserSchemaType } from "@/lib/zodValidation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<loginUserSchemaType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = (values: loginUserSchemaType) => {
    setError(undefined);

    startTransition(async () => {
      const { error } = await authClient.signIn.email({
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error.message ?? "Invalid credentials");
        form.reset();
        return;
      }

      router.push("/");
      router.refresh();
    });
  };

  return (
    <main className="flex items-center justify-center mx-auto max-w-5xl py-22 dark:bg-neutral-950 ">
      <div className="w-full max-w-md bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-700 rounded-2xl shadow-lg p-8 space-y-7">
        {/* Error Message */}
        {error && (
          <Alert variant="destructive" className="text-sm rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {/* Title / Subtitle */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold tracking-tight text-gray-700">
            Hi, welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            onKeyUp={() => setError(undefined)}
            className="space-y-5"
          >
            {/* Email */}
            <FormField
              control={form.control}
              disabled={isPending}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      {...field}
                      className="rounded-lg h-11 focus:ring-2 "
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              disabled={isPending}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">
                    Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="pr-12 rounded-lg h-11 focus:ring-2 "
                      />
                    </FormControl>

                    {/* Toggle Password */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[var(--brand-blue)] transition"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Forgot password */}
                  <div className="flex justify-end mt-1">
                    <Link
                      href="/auth/forgot-password"
                      className="text-gray-500 hover:underline text-xs font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            {error && <p className="text-red-500">{error}</p>}

            <Button disabled={isPending} type="submit">
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
