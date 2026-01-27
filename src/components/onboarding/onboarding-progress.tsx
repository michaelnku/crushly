"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
  step: number;
  totalSteps: number;
}

export function OnboardingProgress({
  step,
  totalSteps,
}: OnboardingProgressProps) {
  const percentage = Math.round((step / totalSteps) * 100);

  return (
    <Field className="w-full space-y-2">
      <FieldLabel
        htmlFor="onboarding-progress"
        className="flex items-center text-xs"
      >
        <span className="text-crushly-muted">
          Step <span className="text-crushly-primary">{step}</span> of{" "}
          <span className="text-crushly-primary">{totalSteps}</span>
        </span>

        <span className="ml-auto font-semibold text-crushly-secondary">
          {percentage}%
        </span>
      </FieldLabel>

      <div className="relative">
        <Progress
          id="onboarding-progress"
          value={percentage}
          className="
            h-2 rounded-full overflow-hidden
            bg-[var(--crushly-bg-hover)]
          "
        />

        {/* Gradient overlay for Crushly feel */}
        <div
          className="
            pointer-events-none absolute inset-0
            rounded-full
            bg-crushly-gradient
            transition-all duration-500 ease-out
          "
          style={{ width: `${percentage}%` }}
        />
      </div>
    </Field>
  );
}
