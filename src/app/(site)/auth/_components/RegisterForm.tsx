"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

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
import { Alert, AlertTitle } from "@/components/ui/alert";

import {
  registerUserSchema,
  RegisterUserSchemaType,
} from "@/lib/zodValidation";
import SocialLogin from "@/components/auth/SocialLogin";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<RegisterUserSchemaType>({
    resolver: zodResolver(registerUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = (values: RegisterUserSchemaType) => {
    setError(undefined);

    startTransition(async () => {
      const { error } = await authClient.signUp.email({
        name: values.email.split("@")[0],
        email: values.email,
        password: values.password,
      });

      if (error) {
        setError(error.message ?? "Unable to create account");
        return;
      }

      router.push("/onboarding");
      router.refresh();
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-crushly px-4">
      <div className="w-full max-w-md bg-crushly-soft border border-crushly rounded-2xl shadow-xl p-8 space-y-7">
        {/* Error */}
        {error && (
          <Alert className="border border-[var(--crushly-error)] bg-[rgba(255,107,129,0.08)] text-[var(--crushly-error)] rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-crushly-primary">
            Join Crushly 💖
          </h1>
          <p className="text-sm text-crushly-muted">
            Create your account and start crushing
          </p>
        </div>

        {/* Form */}
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
                      {...field}
                      type="email"
                      placeholder="you@email.com"
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
                        placeholder="Create a strong password"
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
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating account...
                </span>
              ) : (
                "Create account"
              )}
            </Button>
          </form>
        </Form>

        <SocialLogin />

        {/* Footer / Legal */}
        <div className="pt-4 space-y-3 text-center">
          <p className="text-xs text-crushly-muted leading-relaxed">
            By creating an account, you agree to Crushly’s{" "}
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
            Already have an account?{" "}
            <Link
              href="/auth/login"
              className="text-[var(--crushly-love)] font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
