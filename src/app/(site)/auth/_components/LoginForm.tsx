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
import SocialLogin from "@/components/auth/SocialLogin";

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

      router.push("/discover");
      router.refresh();
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-crushly px-4">
      <div className="w-full max-w-md bg-crushly-soft border border-crushly rounded-2xl shadow-xl p-8 space-y-7">
        {/* Error Message */}
        {error && (
          <Alert className="border border-[var(--crushly-error)] bg-[rgba(255,107,129,0.08)] text-[var(--crushly-error)] rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {/* Title / Subtitle */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-crushly-primary">
            Welcome back 💕
          </h1>
          <p className="text-sm text-crushly-muted">
            Sign in to continue your crush journey
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
                  <FormLabel className="text-sm text-crushly-secondary">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@email.com"
                      {...field}
                      className="
                    h-11 rounded-lg
                    bg-transparent
                    border border-crushly
                    text-crushly-primary
                    placeholder:text-crushly-muted
                    focus:ring-2
                    focus:ring-[var(--crushly-accent)]
                    focus:border-[var(--crushly-accent)]
                  "
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
                  <FormLabel className="text-sm text-crushly-secondary">
                    Password
                  </FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input
                        {...field}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter password"
                        className="
                      h-11 pr-12 rounded-lg
                      bg-transparent
                      border border-crushly
                      text-crushly-primary
                      placeholder:text-crushly-muted
                      focus:ring-2
                      focus:ring-[var(--crushly-accent)]
                      focus:border-[var(--crushly-accent)]
                    "
                      />
                    </FormControl>

                    {/* Toggle Password */}
                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    text-crushly-muted
                    hover:text-[var(--crushly-accent)]
                    transition
                  "
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
                      className="text-xs text-crushly-muted hover:text-[var(--crushly-accent)] transition"
                    >
                      Forgot password?
                    </Link>
                  </div>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              disabled={isPending}
              type="submit"
              className="
            w-full h-11 rounded-lg font-semibold text-white
            bg-crushly-gradient
            hover:opacity-90 transition
            disabled:opacity-70
          "
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </form>
        </Form>

        <SocialLogin />

        {/* Footer / Legal */}
        <div className="pt-4 space-y-3 text-center">
          <p className="text-xs text-crushly-muted leading-relaxed">
            By signing in, you agree to Crushly’s{" "}
            <Link
              href="/terms"
              className="text-[var(--crushly-accent)] hover:underline"
            >
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link
              href="/privacy"
              className="text-[var(--crushly-accent)] hover:underline"
            >
              Privacy Policy
            </Link>
            .
          </p>

          <p className="text-sm text-crushly-muted">
            New to Crushly?{" "}
            <Link
              href="/auth/register"
              className="text-[var(--crushly-love)] font-semibold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
