import { fetchAdaUsdPrice } from "@/lib/oracle/client";
import { OracleProofClient } from "./client";

export const dynamic = "force-dynamic";

export default async function OracleProofPage() {
  const oracle = await fetchAdaUsdPrice();

  const initialData = {
    price: oracle.price.price,
    source: oracle.price.source,
    timestamp: oracle.price.timestamp.toISOString(),
    status: oracle.status,
    fallbackReason: oracle.fallbackReason ?? null,
  };

  return <OracleProofClient initialData={initialData} />;
}
