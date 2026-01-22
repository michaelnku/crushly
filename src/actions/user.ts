"use server";

import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma";
import { CurrentUser } from "@/lib/currentUser";

import {
  changePasswordSchema,
  ChangePasswordSchemaType,
} from "@/lib/zodValidation";

//update user profile action

//password change action
export async function changePassword(values: ChangePasswordSchemaType) {
  const parsed = changePasswordSchema.safeParse(values);
  if (!parsed.success) {
    return { success: false, error: "Invalid password data" };
  }

  const user = await CurrentUser();
  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const credentialsAccount = await prisma.account.findFirst({
    where: {
      userId: user.id,
      provider: "credentials",
    },
  });

  if (!credentialsAccount?.password) {
    return {
      success: false,
      error: "Password change not available for this account",
    };
  }

  const isValid = await bcrypt.compare(
    parsed.data.currentPassword,
    credentialsAccount.password
  );

  if (!isValid) {
    return {
      success: false,
      error: "Current password is incorrect",
    };
  }

  const hashed = await bcrypt.hash(parsed.data.newPassword, 12);

  await prisma.account.update({
    where: { id: credentialsAccount.id },
    data: { password: hashed },
  });

  return { success: true };
}
