import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const dynamic = "force-static";

export async function GET() {
  try {
    const kfzData = await prisma.kfz.findMany({
      orderBy: { symbol: "asc" },
      include: {
        state: {
          select: {
            abbr: true,
            name: true,
          },
        },
        footnotes: {
          include: {
            footnoteRef: {
              select: {
                text: true,
              },
            },
          },
        },
      },
    });

    if (kfzData.length === 0) {
      return NextResponse.json({ error: "No Kfz data found for the specified region." }, { status: 404 });
    }

    return NextResponse.json(kfzData, { status: 200 });
  } catch (error) {
    console.error("Error fetching Kfz data:", error);
    return NextResponse.json({ error: "Failed to fetch Kfz data." }, { status: 500 });
  }
}
