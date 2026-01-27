"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { OnboardingProgress } from "@/components/onboarding/onboarding-progress";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

import { saveOnboardingBasics } from "@/actions/onboarding";
import {
  OnboardingBasicsSchemaType,
  onboardingBasicsSchema,
} from "@/lib/zodValidation";

export default function OnboardingBasicsForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<OnboardingBasicsSchemaType>({
    resolver: zodResolver(onboardingBasicsSchema),
    defaultValues: {
      displayName: "",
      age: 18,
      bio: "",
    },
  });

  const onSubmit = (values: OnboardingBasicsSchemaType) => {
    startTransition(async () => {
      const res = await saveOnboardingBasics(values);
      if (!res?.error) {
        router.push("/onboarding/preferences");
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-crushly px-4">
      <div className="w-full max-w-lg space-y-7 rounded-2xl border border-crushly bg-crushly-soft p-8 shadow-xl">
        {/* Progress */}
        <OnboardingProgress step={1} totalSteps={4} />

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-crushly-primary">
            Let’s start with the basics 💘
          </h1>
          <p className="text-sm text-crushly-muted">
            This helps people recognize you at first glance
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Display Name */}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-crushly-secondary">
                    Display name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="What should we call you?"
                      className="
                        h-11 rounded-lg bg-transparent
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

            {/* Age */}
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-crushly-secondary">
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="
                        h-11 rounded-lg bg-transparent
                        border border-crushly
                        text-crushly-primary
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

            {/* Bio */}
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-crushly-secondary">
                    Bio{" "}
                    <span className="text-xs text-crushly-muted">
                      (optional)
                    </span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      rows={4}
                      {...field}
                      placeholder="A little about you…"
                      className="
                        rounded-lg bg-transparent
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

            {/* Submit */}
            <Button
              type="submit"
              disabled={isPending}
              className="
                w-full h-11 rounded-lg font-semibold text-white
                bg-crushly-gradient
                hover:opacity-90 transition
                disabled:opacity-70
              "
            >
              {isPending ? (
                <span className="inline-flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving…
                </span>
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
