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
import { Button } from "@/components/ui/button";
import { Loader2, MapPin } from "lucide-react";

import {
  onboardingLocationSchema,
  OnboardingLocationSchemaType,
} from "@/lib/zodValidation";
import { saveOnboardingLocation } from "@/actions/onboarding";

export default function OnboardingLocationPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<OnboardingLocationSchemaType>({
    resolver: zodResolver(onboardingLocationSchema),
    defaultValues: {
      location: "",
    },
  });

  const onSubmit = (values: OnboardingLocationSchemaType) => {
    startTransition(async () => {
      const res = await saveOnboardingLocation(values);
      if (!res?.error) {
        router.push("/onboarding/photos");
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-crushly px-4">
      <div className="w-full max-w-lg space-y-7 rounded-2xl border border-crushly bg-crushly-soft p-8 shadow-xl">
        {/* Progress */}
        <OnboardingProgress step={3} totalSteps={4} />

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-crushly-primary">
            Where are you located? 📍
          </h1>
          <p className="text-sm text-crushly-muted">
            We’ll use this to show nearby matches
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm text-crushly-secondary">
                    Your location
                  </FormLabel>

                  <FormControl>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-crushly-muted" />

                      <Input
                        {...field}
                        placeholder="City, Country"
                        className="
                          h-11 pl-9 rounded-lg
                          bg-transparent
                          border border-crushly
                          text-crushly-primary
                          placeholder:text-crushly-muted
                          focus:ring-2
                          focus:ring-[var(--crushly-accent)]
                          focus:border-[var(--crushly-accent)]
                        "
                      />
                    </div>
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
