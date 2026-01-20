"use server";

import prisma from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { OnboardingSchemaType, onboardingSchema } from "@/lib/zodValidation";

export async function createDatingProfile(values: OnboardingSchemaType) {
  const parsed = onboardingSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Invalid profile data" };
  }

  const user = await CurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const existingProfile = await prisma.datingProfile.findUnique({
    where: { userId: user.id },
  });

  if (existingProfile) {
    return { success: false, error: "Profile already exists" };
  }

  const {
    displayName,

    bio,
    age,
    location,

    photos,
  } = parsed.data;

  await prisma.datingProfile.create({
    data: {
      userId: user.id,
      displayName,

      bio,
      age,
      location,

      photos: {
        createMany: {
          data: photos.map((i) => ({
            Url: i.url,
            Key: i.key,
          })),
        },
      },
    },
  });

  return { success: true };
}
