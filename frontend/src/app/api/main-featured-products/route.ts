import { NextResponse } from "next/server";
import { dummyFeaturedProducts } from "@/app/stubData/dummy-featured-products";

export async function GET() {
  return NextResponse.json(dummyFeaturedProducts);
}
