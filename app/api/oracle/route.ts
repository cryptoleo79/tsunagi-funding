import { NextResponse } from "next/server";
import { fetchAdaUsdPrice } from "@/lib/oracle/client";

export const dynamic = "force-dynamic";

export async function GET() {
  const result = await fetchAdaUsdPrice();
  return NextResponse.json({
    feed: result.price.feed,
    price: result.price.price,
    timestamp: result.price.timestamp.toISOString(),
    source: result.price.source,
    status: result.status,
    fallbackReason: result.fallbackReason ?? null,
  });
}
