/* eslint-disable @typescript-eslint/no-explicit-any */
import { clerkClient } from "@clerk/nextjs/server";
import prisma from "@/config/prisma";

export type CreateUserInput = {
  name: string;
  email: string;
  password?: string;
  clerkId?: string | null;
};

export async function createUserLogic({
  name,
  email,
  password,
  clerkId,
}: CreateUserInput) {
  try {
    let finalClerkId = clerkId;

    // 1. Create user in Clerk if clerkId is missing
    if (!finalClerkId) {
      const client = await clerkClient();

      const newClerkUser = await client.users.createUser({
        firstName: name,
        emailAddress: [email],
        password,
      });

      finalClerkId = newClerkUser.id;
    }

    // 2. Check if user exists in Prisma
    const existingUser = await prisma.user.findFirst({
      where: { clerkId: finalClerkId },
    });

    if (existingUser) {
      return {
        success: true,
        created: false,
        clerkId: finalClerkId,
        message: "User already exists",
      };
    }

    // 3. Create new user in Prisma
    await prisma.user.create({
      data: {
        clerkId: finalClerkId,
        name,
        email,
        confirmed: false,
      },
    });

    return "User created successfully";
  } catch (err: any) {
    console.error("CreateUser Error:", err);
    throw new Error("Failed to create user");
  }
}
