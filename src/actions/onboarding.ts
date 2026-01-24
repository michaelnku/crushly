"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  onboardingBasicsSchema,
  OnboardingBasicsSchemaType,
  onboardingPreferencesSchema,
  OnboardingPreferencesSchemaType,
} from "@/lib/zodValidation";

export async function saveOnboardingBasics(values: OnboardingBasicsSchemaType) {
  const user = await getCurrentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const parsed = onboardingBasicsSchema.safeParse(values);
  if (!parsed.success) {
    return { error: "Invalid data" };
  }

  await prisma.datingProfile.upsert({
    where: { userId: user.id },
    update: parsed.data,
    create: {
      userId: user.id,
      ...parsed.data,
    },
  });

  return { success: true };
}

export async function saveOnboardingPreferences(
  values: OnboardingPreferencesSchemaType
) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = onboardingPreferencesSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid data" };

  await prisma.datingProfile.update({
    where: { userId: user.id },
    data: parsed.data,
  });

  return { success: true };
}
