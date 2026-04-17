import type { OraclePrice, OracleResult, KupoMatch, KupoDatum } from "./types";
import type { OracleConfig } from "./config";
import { decodePlutusHex, extractPriceFromDatum } from "./decode";

export async function fetchCharli3Price(config: OracleConfig): Promise<OracleResult> {
  const { kupoUrl, charli3Address, charli3PolicyId, feed } = config;

  if (!kupoUrl || !charli3Address) {
    return fallback("kupo URL or charli3 address not configured", feed);
  }

  // Query Kupo for unspent UTxOs at the oracle address
  let matches: KupoMatch[];
  try {
    // C3AS = "Charli3 Aggregate State" token, hex-encoded asset name.
    // Kupo pattern: "policyId.assetName" or just the address.
    const c3asHex = "43334153";
    const pattern = charli3PolicyId
      ? `${charli3PolicyId}.${c3asHex}`
      : charli3Address;
    const url = `${kupoUrl}/matches/${pattern}?unspent`;
    const res = await fetch(url, { next: { revalidate: 30 } });
    if (!res.ok) {
      return fallback(`kupo returned ${res.status}`, feed);
    }
    matches = await res.json();
  } catch (err) {
    const msg = err instanceof Error ? err.message : "fetch failed";
    return fallback(`kupo unreachable: ${msg}`, feed);
  }

  if (!matches || matches.length === 0) {
    return fallback("no UTxOs found at oracle address", feed);
  }

  // Pick the most recent UTxO (highest slot)
  const sorted = [...matches].sort(
    (a, b) => (b.created_at?.slot_no ?? 0) - (a.created_at?.slot_no ?? 0),
  );
  const utxo = sorted[0];

  // Get the datum
  let datumHex: string | null = null;

  if (utxo.datum_type === "inline" && utxo.datum_hash) {
    try {
      const datumUrl = `${kupoUrl}/datums/${utxo.datum_hash}`;
      const res = await fetch(datumUrl);
      if (res.ok) {
        const body: KupoDatum = await res.json();
        datumHex = body.datum;
      }
    } catch {
      // fall through to hash-based fetch
    }
  }

  if (!datumHex && utxo.datum_hash) {
    try {
      const datumUrl = `${kupoUrl}/datums/${utxo.datum_hash}`;
      const res = await fetch(datumUrl);
      if (res.ok) {
        const body: KupoDatum = await res.json();
        datumHex = body.datum;
      }
    } catch {
      return fallback("could not fetch datum from kupo", feed);
    }
  }

  if (!datumHex) {
    return fallback("no datum found on oracle UTxO", feed);
  }

  // Decode the CBOR datum
  const plutus = decodePlutusHex(datumHex);
  if (!plutus) {
    return fallback("could not decode CBOR datum", feed, datumHex);
  }

  // Extract price from known Charli3 datum formats
  const extracted = extractPriceFromDatum(plutus);
  if (!extracted) {
    return fallback("datum decoded but price format not recognized", feed, datumHex);
  }

  const price: OraclePrice = {
    feed,
    price: extracted.price,
    timestamp: new Date(extracted.timestamp),
    source: `charli3 (preprod, slot ${utxo.created_at?.slot_no ?? "?"})`,
  };

  return { price, status: "live" };
}

function fallback(
  reason: string,
  feed: string,
  rawDatum?: string,
): OracleResult {
  return {
    price: {
      feed,
      price: 0,
      timestamp: new Date(),
      source: "charli3 (unavailable)",
    },
    status: "fallback",
    fallbackReason: reason + (rawDatum ? ` [datum: ${rawDatum.substring(0, 40)}...]` : ""),
  };
}
