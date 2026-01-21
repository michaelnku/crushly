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
export const onboardingSchema = z.object({
  displayName: z
    .string()
    .min(2, "Name is too short")
    .max(30, "Name is too long"),

  gender: z.enum(["MALE", "FEMALE", "NON_BINARY"]),

  location: z.string(),

  photos: z.array(fileSchema),

  interestedIn: z.enum(["MALE", "FEMALE", "EVERYONE"]),
  lookingFor: z.enum([
    "DATE",
    "RELATIONSHIP",
    "CHAT",
    "FUN",
    "FRIENDS",
    "ANYTHING",
  ]),

  age: z.number().min(18, "You must be at least 18").max(99),

  bio: z.string().max(300).optional(),
});

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;
