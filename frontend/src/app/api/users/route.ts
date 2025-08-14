import { NextResponse } from "next/server";
import { dummyUsers } from "@/app/stubData/dummy-users";

export async function GET() {
  return NextResponse.json(dummyUsers);
}
