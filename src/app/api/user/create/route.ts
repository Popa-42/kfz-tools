import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, name }: { email: string; name?: string } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Invalid user data: "email" is required.' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: { email, name: name ?? "", created_at: new Date() },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ error: "Email already exists." }, { status: 409 });
    }
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal server error." }, { status: 500 });
  }
}
