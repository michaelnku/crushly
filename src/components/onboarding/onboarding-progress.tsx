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
    <Field className="w-full">
      <FieldLabel htmlFor="onboarding-progress">
        <span className="text-xs text-crushly-muted">
          Step {step} of {totalSteps}
        </span>

        <span className="ml-auto text-xs font-medium">{percentage}%</span>
      </FieldLabel>

      <Progress id="onboarding-progress" value={percentage} className="h-2" />
    </Field>
  );
}
