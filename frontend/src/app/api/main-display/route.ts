import { NextResponse } from "next/server";
import { dummyMainDisplayItems } from "@/app/stubData/dummy-main-display";

export async function GET() {
  return NextResponse.json(dummyMainDisplayItems);
}
