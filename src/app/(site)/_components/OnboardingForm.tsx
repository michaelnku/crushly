"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { createDatingProfileAction } from "@/actions/onboarding";
import { OnboardingSchemaType, onboardingSchema } from "@/lib/zodValidation";

export default function OnboardingForm() {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<OnboardingSchemaType>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      displayName: "",
      gender: "MALE",
      interestedIn: "EVERYONE",
      lookingFor: "ANYTHING",
      age: 18,
      bio: "",
      location: "",
    },
  });

  const handleSubmit = (values: OnboardingSchemaType) => {
    setError(undefined);

    startTransition(async () => {
      const res = await createDatingProfileAction(values);

      if (res?.error) {
        setError(res.error);
        return;
      }

      router.push("/discover");
      router.refresh();
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-crushly px-4">
      <div className="w-full max-w-lg bg-crushly-soft border border-crushly rounded-2xl shadow-xl p-8 space-y-7">
        {/* Error */}
        {error && (
          <Alert className="border border-[var(--crushly-error)] bg-[rgba(255,107,129,0.08)] text-[var(--crushly-error)]">
            <AlertCircle className="w-4 h-4" />
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-crushly-primary">
            Complete your profile 💘
          </h1>
          <p className="text-sm text-crushly-muted">
            Tell us a bit about yourself
          </p>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-5"
          >
            {/* Display Name */}
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-crushly-secondary">
                    Display name
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="
                        h-11 rounded-lg bg-transparent
                        border border-crushly
                        text-crushly-primary
                        placeholder:text-crushly-muted
                        focus:ring-2 focus:ring-[var(--crushly-accent)]
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
                  <FormLabel className="text-crushly-secondary">Age</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      className="
                        h-11 rounded-lg bg-transparent
                        border border-crushly
                        text-crushly-primary
                        focus:ring-2 focus:ring-[var(--crushly-accent)]
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
                  <FormLabel className="text-crushly-secondary">
                    Bio (optional)
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      rows={4}
                      className="
                        rounded-lg bg-transparent
                        border border-crushly
                        text-crushly-primary
                        placeholder:text-crushly-muted
                        focus:ring-2 focus:ring-[var(--crushly-accent)]
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
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Saving profile…
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
