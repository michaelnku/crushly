"use client";
// use shacn progress here
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
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-crushly-muted">
        <span>
          Step {step} of {totalSteps}
        </span>
        <span>{percentage}%</span>
      </div>

      <div className="h-2 w-full rounded-full bg-crushly-soft">
        <div
          className="h-full rounded-full bg-crushly-gradient transition-all"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
