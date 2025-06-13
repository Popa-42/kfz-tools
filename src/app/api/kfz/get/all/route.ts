import { NextResponse } from "next/server";
import { getEM } from "@/lib/orm";

export const dynamic = "force-static";

export async function GET() {
  try {
    const em = await getEM();
    const kfzData = await em.find("Kfz", {});

    if (kfzData.length === 0) {
      return NextResponse.json({ error: "No Kfz data found for the specified region." }, { status: 404 });
    }

    return NextResponse.json(kfzData, { status: 200 });
  } catch (error) {
    console.error("Error fetching Kfz data:", error);
    return NextResponse.json({ error: "Failed to fetch Kfz data." }, { status: 500 });
  }
}
