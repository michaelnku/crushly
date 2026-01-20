import z from "zod";

//for photos
export const fileSchema = z.object({
  url: z.string().url(),
  key: z.string(),
});

//register a user
export const registerUserSchema = z.object({
  email: z.string().email("Invalid email address").min(5, "Email too short"),
  password: z.string().min(8, "Password must be at least 8 characters"),
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

  gender: z.enum(["male", "female", "non-binary"]),

  location: z.string(),

  photos: z.array(fileSchema),

  interestedIn: z.enum(["male", "female", "everyone"]),

  age: z.number().min(18, "You must be at least 18").max(99),

  bio: z.string().max(300).optional(),
});

export type OnboardingSchemaType = z.infer<typeof onboardingSchema>;
