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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import {
  onboardingPreferencesSchema,
  OnboardingPreferencesSchemaType,
} from "@/lib/zodValidation";
import { saveOnboardingPreferences } from "@/actions/onboarding";

export default function OnboardingPreferencesPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<OnboardingPreferencesSchemaType>({
    resolver: zodResolver(onboardingPreferencesSchema),
    defaultValues: {
      gender: "MALE",
      interestedIn: "EVERYONE",
      lookingFor: "ANYTHING",
    },
  });

  const onSubmit = (values: OnboardingPreferencesSchemaType) => {
    startTransition(async () => {
      const res = await saveOnboardingPreferences(values);
      if (!res?.error) {
        router.push("/onboarding/location");
      }
    });
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-crushly px-4">
      <div className="w-full max-w-lg space-y-6 rounded-2xl border border-crushly bg-crushly-soft p-8 shadow-xl">
        {/* Progress */}
        <OnboardingProgress step={2} totalSteps={4} />

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-crushly-primary">
            Your preferences 💫
          </h1>
          <p className="text-sm text-crushly-muted">
            Help us personalize your matches
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Gender */}
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your gender</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Male</SelectItem>
                        <SelectItem value="FEMALE">Female</SelectItem>
                        <SelectItem value="NON_BINARY">Non-binary</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Interested In */}
            <FormField
              control={form.control}
              name="interestedIn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Interested in</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MALE">Men</SelectItem>
                        <SelectItem value="FEMALE">Women</SelectItem>
                        <SelectItem value="EVERYONE">Everyone</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Looking For */}
            <FormField
              control={form.control}
              name="lookingFor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Looking for</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="DATE">Date</SelectItem>
                        <SelectItem value="RELATIONSHIP">
                          Relationship
                        </SelectItem>
                        <SelectItem value="CHAT">Chat</SelectItem>
                        <SelectItem value="FUN">Fun</SelectItem>
                        <SelectItem value="FRIENDS">Friends</SelectItem>
                        <SelectItem value="ANYTHING">Anything</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending} className="w-full">
              {isPending ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
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
