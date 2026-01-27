"use server";

import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/getCurrentUser";
import {
  onboardingBasicsSchema,
  OnboardingBasicsSchemaType,
  onboardingLocationSchema,
  OnboardingLocationSchemaType,
  onboardingPhotosSchema,
  OnboardingPhotosSchemaType,
  onboardingPreferencesSchema,
  OnboardingPreferencesSchemaType,
} from "@/lib/zodValidation";

import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const deleteFileAction = async (keyToDelete: string) => {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized access" };

  try {
    await utapi.deleteFiles([keyToDelete]);
    return { success: true };
  } catch (error) {}
};

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

export async function saveOnboardingLocation(
  values: OnboardingLocationSchemaType
) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = onboardingLocationSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid data" };

  await prisma.datingProfile.update({
    where: { userId: user.id },
    data: parsed.data,
  });

  return { success: true };
}

export async function saveOnboardingPhotos(values: OnboardingPhotosSchemaType) {
  const user = await getCurrentUser();
  if (!user) return { error: "Unauthorized" };

  const parsed = onboardingPhotosSchema.safeParse(values);
  if (!parsed.success) return { error: "Invalid data" };

  const profile = await prisma.datingProfile.findUnique({
    where: { userId: user.id },
  });

  if (!profile) return { error: "Profile not found" };

  await prisma.userPhoto.createMany({
    data: parsed.data.photos.map((photo, index) => ({
      profileId: profile.id,
      photoUrl: photo.url,
      photoKey: photo.key,
      order: index,
      isPrimary: index === 0,
    })),
  });

  await prisma.datingProfile.update({
    where: { userId: user.id },
    data: {
      isCompleted: true,
    },
  });

  return { success: true };
}
