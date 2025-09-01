import { NextResponse } from "next/server";
import { dummyContentSummaries } from "@/app/stubData/dummy-content-summaries";

export async function GET() {
  return NextResponse.json(dummyContentSummaries);
}
