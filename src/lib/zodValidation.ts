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

//update user schema
export const updateUserSchema = z.object({
  name: z
    .string({ message: "name must be a string." })
    .min(2, { message: "name must be at least 2 characters." })
    .optional(),

  profileAvatar: fileSchema.nullable().optional(),

  username: z
    .string({ message: "Username must be a string." })
    .min(2, { message: "Username must be at least 2 characters." })
    .optional(),
});

export type updateUserSchemaType = z.infer<typeof updateUserSchema>;

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
