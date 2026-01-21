"use server";

import prisma from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";
import { OnboardingSchemaType, onboardingSchema } from "@/lib/zodValidation";
import { number } from "zod";

export async function createDatingProfileAction(values: OnboardingSchemaType) {
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
    gender,
    interestedIn,
    lookingFor,

    photos,
  } = parsed.data;

  await prisma.datingProfile.create({
    data: {
      userId: user.id,
      displayName,

      bio,
      age,
      location,

      gender,
      interestedIn,
      lookingFor,

      photos: {
        createMany: {
          data: photos.map((photo, index) => ({
            photoUrl: photo.url,
            photoKey: photo.key,
            order: index,
          })),
        },
      },
    },
  });

  return { success: true };
}
