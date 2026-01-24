import z from "zod";

//for photos
export const fileSchema = z.object({
  url: z.string().url(),
  key: z.string(),
});

//register a user
export const registerUserSchema = z.object({
  email: z.string().email("Invalid email address").min(5, "Email too short"),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .regex(/^(?=.*[A-Z])(?=.*\d)/, {
      message:
        "Password must contain at least one uppercase letter and one number.",
    }),
});

export type RegisterUserSchemaType = z.infer<typeof registerUserSchema>;

//login a user
export const loginUserSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
});

export type loginUserSchemaType = z.infer<typeof loginUserSchema>;

export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;

//setting up a dating profile
export const onboardingBasicsSchema = z.object({
  displayName: z.string().min(2).max(30),
  age: z.number().min(18).max(99),
  bio: z.string().max(300).optional(),
});

export type OnboardingBasicsSchemaType = z.infer<typeof onboardingBasicsSchema>;

export const onboardingPreferencesSchema = z.object({
  gender: z.enum(["MALE", "FEMALE", "NON_BINARY"]),
  interestedIn: z.enum(["MALE", "FEMALE", "EVERYONE"]),
  lookingFor: z.enum([
    "DATE",
    "RELATIONSHIP",
    "CHAT",
    "FUN",
    "FRIENDS",
    "ANYTHING",
  ]),
});

export type OnboardingPreferencesSchemaType = z.infer<
  typeof onboardingPreferencesSchema
>;

export const onboardingLocationSchema = z.object({
  location: z
    .string()
    .min(2, "Location is required")
    .max(100, "Location is too long"),
});

export type OnboardingLocationSchemaType = z.infer<
  typeof onboardingLocationSchema
>;

export const onboardingPhotosSchema = z.object({
  photos: z
    .array(
      z.object({
        url: z.string().url(),
        key: z.string(),
      })
    )
    .min(1, "Upload at least one photo"),
});

export type OnboardingPhotosSchemaType = z.infer<typeof onboardingPhotosSchema>;
