/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/config/prisma";

export async function POST(req: NextRequest) {
  try {
    const { name, email, clerkId } = await req.json();

    const existingUser = await prisma.user.findFirst({
      where: { email },
    });

    if (existingUser) {
      return {
        success: true,
        created: false,
        clerkId,
        message: "User already exists",
      };
    }

    // 3. Create new user in Prisma
    await prisma.user.create({
      data: {
        clerkId,
        name,
        email,
        confirmed: true,
      },
    });

    return NextResponse.json("Done");
  } catch (error: any) {
    console.error("CreateUser Error:", error);
    const message =
      error.errors?.[0]?.message || error.message || "Signup failed";
    return NextResponse.json(message, { status: 500 });
  }
}
