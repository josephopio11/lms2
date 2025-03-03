"use server";

import { signIn, signOut } from "@/auth";
import db from "@/lib/db";
import { signUpSchema } from "@/lib/zod";
import bcryptjs from "bcryptjs";
import { AuthError } from "next-auth";

export async function handleCredentialsSignin({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid credentials",
          };
        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
}

export async function handlePasswordReset({ email }: { email: string }) {
  console.log(email);

  return {
    message: email,
  };
}

export async function handleGithubSignin() {
  await signIn("github", { redirectTo: "/" });
}

export async function handleGoogleSignin() {
  await signIn("google", { redirectTo: "/" });
}

export async function handleSignOut() {
  await signOut();
}

export async function handleSignUp({
  name,
  email,
  password,
  confirmPassword,
}: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const parsedCredentials = signUpSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });
    if (!parsedCredentials.success) {
      return { success: false, message: "Invalid data." };
    }

    // check if the email is already taken
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return {
        success: false,
        message: "Email already exists. Login to continue.",
      };
    }

    // hash the password
    const hashedPassword = await bcryptjs.hash(password, 10);
    const userCreated = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    if (userCreated) {
      await db.userProfile.upsert({
        where: {
          userId: userCreated.id,
        },
        create: {
          userId: userCreated.id,
        },
        update: {
          userId: userCreated.id,
        },
      });
    }

    return { success: true, message: "Account created successfully." };
  } catch (error) {
    console.error("Error creating account:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}
