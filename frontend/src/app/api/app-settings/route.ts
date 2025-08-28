import { NextResponse } from "next/server";

export async function GET() {
  const serverTimeZone =
    process.env.SERVER_TIMEZONE?.trim() || "America/Edmonton";

  const now = new Date();
  const appSettings = {
    options: {
      theme: "deafult",
      showMadeBy: true,
      showSKU: false,
      showOnDiscount: true,
      isRedMark: false,
      isRedTag: true,
      showSoldOut: true,
      cardSize: "lg" as const,
      serverTimeZone, // <- IANA TZ
    },
    serverTime: now.toISOString(),
    version: 1,
    updatedAt: now.toISOString(),
  };

  return NextResponse.json(appSettings, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
