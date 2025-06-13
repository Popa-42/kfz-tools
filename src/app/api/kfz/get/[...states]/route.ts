import { NextRequest, NextResponse } from "next/server";
import { getEM } from "@/lib/orm";
import { Kfz } from "@/entities";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest, { params }: { params: { states: string[] } }) {
  const { states } = await params;
  console.log("States parameter:", JSON.stringify(states));

  try {
    const em = await getEM();

    // Query Kfz entities where the state.abbr matches any of the provided state abbreviations
    const kfzData: Kfz[] = await em.find(
      Kfz,
      {
        state: {
          abbr: { $in: states },
        },
      },
      {
        populate: ["state"],
      },
    );

    console.log(`Found ${kfzData.length} matching records:`, JSON.stringify(kfzData));

    if (kfzData.length === 0) {
      return NextResponse.json({ error: "No Kfz data found for the specified region." }, { status: 404 });
    }

    return NextResponse.json(kfzData, { status: 200 });
  } catch (error) {
    console.error("Error fetching Kfz data:", error);
    return NextResponse.json({ error: "Failed to fetch Kfz data." }, { status: 500 });
  }
}
