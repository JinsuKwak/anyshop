import { NextResponse } from "next/server";
import { dummyCategories } from "@/app/stubData/dummy-categories";
export async function GET() {
  return NextResponse.json(dummyCategories);
}
