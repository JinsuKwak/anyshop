import { NextResponse } from "next/server";
import { dummyProducts } from "@/app/stubData/dummy-data";

export async function GET() {
  return NextResponse.json(dummyProducts);
}
