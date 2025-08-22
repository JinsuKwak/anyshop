import { NextResponse } from "next/server";
import { dummyAnnouncements } from "@/app/stubData/dummy-announcements";

export async function GET() {
  return NextResponse.json(dummyAnnouncements);
}
