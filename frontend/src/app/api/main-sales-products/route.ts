import { NextResponse } from "next/server";
import { dummyOnSaleProducts } from "@/app/stubData/dummy-on-sale-products";

export async function GET() {
  return NextResponse.json(dummyOnSaleProducts);
}
