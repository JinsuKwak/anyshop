import { NextResponse } from "next/server";
import { dummyCart } from "@/app/stubData/dummy-cart";

export async function GET() {
  return NextResponse.json(dummyCart);
}
