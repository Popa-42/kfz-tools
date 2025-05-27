import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  try {
    // TODO: Implement database logic
    const kfzData: Record<string, string>[] = [];

    if (kfzData.length === 0) {
      return NextResponse.json({ error: "No Kfz data found for the specified region." }, { status: 404 });
    }

    return NextResponse.json(kfzData, { status: 200 });
  } catch (error) {
    console.error("Error fetching Kfz data:", error);
    return NextResponse.json({ error: "Failed to fetch Kfz data." }, { status: 500 });
  }
}
