// Minimal Plutus data decoder for Charli3 oracle datums.
// Handles the subset of CBOR needed to extract price feeds:
// integers, byte strings, arrays, maps, and tagged constructors.

export type PlutusData =
  | { type: "int"; value: bigint }
  | { type: "bytes"; hex: string }
  | { type: "constr"; index: number; fields: PlutusData[] }
  | { type: "list"; items: PlutusData[] }
  | { type: "map"; entries: [PlutusData, PlutusData][] };

interface DecodeResult {
  data: PlutusData;
  offset: number;
}

export function decodePlutusHex(hex: string): PlutusData | null {
  try {
    const buf = hexToBytes(hex);
    const result = decodeItem(buf, 0);
    return result.data;
  } catch {
    return null;
  }
}

// Try common Charli3 datum layouts to extract a price and timestamp.
// Returns null if the structure doesn't match any known format.
export function extractPriceFromDatum(
  data: PlutusData,
): { price: number; timestamp: number } | null {
  // Format A: Constr(0, [price_int, timestamp_int, ...])
  if (data.type === "constr" && data.fields.length >= 2) {
    const priceField = data.fields[0];
    const tsField = data.fields[1];
    if (priceField.type === "int" && tsField.type === "int") {
      const raw = Number(priceField.value);
      const ts = Number(tsField.value);
      const parsed = tryParsePrice(raw, ts);
      if (parsed) return parsed;
    }
  }

  // Format B: Constr(0, [Constr(0, [price_int, timestamp_int, ...]), ...])
  if (data.type === "constr" && data.fields.length >= 1) {
    const inner = data.fields[0];
    if (inner.type === "constr" && inner.fields.length >= 2) {
      const priceField = inner.fields[0];
      const tsField = inner.fields[1];
      if (priceField.type === "int" && tsField.type === "int") {
        const raw = Number(priceField.value);
        const ts = Number(tsField.value);
        const parsed = tryParsePrice(raw, ts);
        if (parsed) return parsed;
      }
    }
  }

  // Format C: Constr with a map containing price data
  if (data.type === "constr") {
    for (const field of data.fields) {
      if (field.type === "map") {
        const ints = field.entries
          .map(([, v]) => v)
          .filter((v): v is { type: "int"; value: bigint } => v.type === "int")
          .map((v) => Number(v.value));
        if (ints.length >= 2) {
          const parsed = tryParsePrice(ints[0], ints[1]);
          if (parsed) return parsed;
        }
      }
    }
  }

  // Format D: Charli3 ODV — Constr(_, [Constr(_, [Map{Int(0): price, Int(1): timestamp}])])
  if (data.type === "constr") {
    for (const field of data.fields) {
      if (field.type === "constr") {
        for (const inner of field.fields) {
          if (inner.type === "map") {
            const priceEntry = inner.entries.find(
              ([k]) => k.type === "int" && k.value === BigInt(0),
            );
            const tsEntry = inner.entries.find(
              ([k]) => k.type === "int" && k.value === BigInt(1),
            );
            if (
              priceEntry && priceEntry[1].type === "int" &&
              tsEntry && tsEntry[1].type === "int"
            ) {
              const raw = Number(priceEntry[1].value);
              const ts = Number(tsEntry[1].value);
              const parsed = tryParsePrice(raw, ts);
              if (parsed) return parsed;
            }
          }
        }
      }
    }
  }

  // Format E: walk all integers and try to find a plausible pair
  const ints = collectIntegers(data);
  for (let i = 0; i < ints.length - 1; i++) {
    const parsed = tryParsePrice(ints[i], ints[i + 1]);
    if (parsed) return parsed;
  }

  return null;
}

function tryParsePrice(
  rawPrice: number,
  rawTimestamp: number,
): { price: number; timestamp: number } | null {
  // Try common scaling factors (10^6, 10^8, 10^4, 10^2, none)
  const scales = [1e6, 1e8, 1e4, 1e2, 1];
  const nowMs = Date.now();

  for (const scale of scales) {
    const price = rawPrice / scale;
    // ADA/USD should be in a reasonable range
    if (price < 0.001 || price > 500) continue;

    // Timestamp could be seconds or milliseconds
    let tsMs = rawTimestamp;
    if (rawTimestamp < 2e10) tsMs = rawTimestamp * 1000; // seconds -> ms

    // Should be within the last year and not in the future
    if (tsMs > nowMs - 365 * 24 * 3600 * 1000 && tsMs < nowMs + 3600 * 1000) {
      return { price, timestamp: tsMs };
    }
  }
  return null;
}

function collectIntegers(data: PlutusData): number[] {
  const result: number[] = [];
  function walk(d: PlutusData) {
    if (d.type === "int") result.push(Number(d.value));
    else if (d.type === "constr") d.fields.forEach(walk);
    else if (d.type === "list") d.items.forEach(walk);
    else if (d.type === "map") d.entries.forEach(([k, v]) => { walk(k); walk(v); });
  }
  walk(data);
  return result;
}

// --- CBOR decoding ---

function hexToBytes(hex: string): Uint8Array {
  const clean = hex.replace(/\s/g, "");
  const bytes = new Uint8Array(clean.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(clean.substring(i * 2, i * 2 + 2), 16);
  }
  return bytes;
}

function decodeItem(buf: Uint8Array, pos: number): DecodeResult {
  const initial = buf[pos];
  const major = initial >> 5;
  const info = initial & 0x1f;

  switch (major) {
    case 0: return decodeUint(buf, pos);
    case 1: return decodeNegint(buf, pos);
    case 2: return decodeBytes(buf, pos);
    case 3: return decodeBytes(buf, pos); // text string, treat as bytes
    case 4: return decodeArray(buf, pos);
    case 5: return decodeMap(buf, pos);
    case 6: return decodeTagged(buf, pos);
    case 7:
      if (info === 20) return { data: { type: "int", value: BigInt(0) }, offset: pos + 1 }; // false
      if (info === 21) return { data: { type: "int", value: BigInt(1) }, offset: pos + 1 }; // true
      if (info === 22) return { data: { type: "bytes", hex: "" }, offset: pos + 1 }; // null
      return { data: { type: "bytes", hex: "" }, offset: pos + 1 };
    default:
      throw new Error(`unknown major type ${major} at ${pos}`);
  }
}

function readArgument(buf: Uint8Array, pos: number): { value: number; offset: number } {
  const info = buf[pos] & 0x1f;
  pos++;
  if (info < 24) return { value: info, offset: pos };
  if (info === 24) return { value: buf[pos], offset: pos + 1 };
  if (info === 25) return { value: (buf[pos] << 8) | buf[pos + 1], offset: pos + 2 };
  if (info === 26) {
    const v = (buf[pos] << 24) | (buf[pos + 1] << 16) | (buf[pos + 2] << 8) | buf[pos + 3];
    return { value: v >>> 0, offset: pos + 4 };
  }
  if (info === 27) {
    let v = BigInt(0);
    for (let i = 0; i < 8; i++) v = (v << BigInt(8)) | BigInt(buf[pos + i]);
    return { value: Number(v), offset: pos + 8 };
  }
  throw new Error(`unsupported argument info ${info}`);
}

function decodeUint(buf: Uint8Array, pos: number): DecodeResult {
  const arg = readArgument(buf, pos);
  return { data: { type: "int", value: BigInt(arg.value) }, offset: arg.offset };
}

function decodeNegint(buf: Uint8Array, pos: number): DecodeResult {
  const arg = readArgument(buf, pos);
  return { data: { type: "int", value: BigInt(-1) - BigInt(arg.value) }, offset: arg.offset };
}

function decodeBytes(buf: Uint8Array, pos: number): DecodeResult {
  const info = buf[pos] & 0x1f;
  if (info === 31) {
    // Indefinite length
    pos++;
    let hex = "";
    while (buf[pos] !== 0xff) {
      const chunk = decodeBytes(buf, pos);
      if (chunk.data.type === "bytes") hex += chunk.data.hex;
      pos = chunk.offset;
    }
    return { data: { type: "bytes", hex }, offset: pos + 1 };
  }
  const arg = readArgument(buf, pos);
  const bytes = buf.slice(arg.offset, arg.offset + arg.value);
  const hex = Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
  return { data: { type: "bytes", hex }, offset: arg.offset + arg.value };
}

function decodeArray(buf: Uint8Array, pos: number): DecodeResult {
  const info = buf[pos] & 0x1f;
  if (info === 31) {
    // Indefinite length array
    pos++;
    const items: PlutusData[] = [];
    while (buf[pos] !== 0xff) {
      const r = decodeItem(buf, pos);
      items.push(r.data);
      pos = r.offset;
    }
    return { data: { type: "list", items }, offset: pos + 1 };
  }
  const arg = readArgument(buf, pos);
  const items: PlutusData[] = [];
  let offset = arg.offset;
  for (let i = 0; i < arg.value; i++) {
    const r = decodeItem(buf, offset);
    items.push(r.data);
    offset = r.offset;
  }
  return { data: { type: "list", items }, offset };
}

function decodeMap(buf: Uint8Array, pos: number): DecodeResult {
  const info = buf[pos] & 0x1f;
  if (info === 31) {
    pos++;
    const entries: [PlutusData, PlutusData][] = [];
    while (buf[pos] !== 0xff) {
      const k = decodeItem(buf, pos);
      const v = decodeItem(buf, k.offset);
      entries.push([k.data, v.data]);
      pos = v.offset;
    }
    return { data: { type: "map", entries }, offset: pos + 1 };
  }
  const arg = readArgument(buf, pos);
  const entries: [PlutusData, PlutusData][] = [];
  let offset = arg.offset;
  for (let i = 0; i < arg.value; i++) {
    const k = decodeItem(buf, offset);
    const v = decodeItem(buf, k.offset);
    entries.push([k.data, v.data]);
    offset = v.offset;
  }
  return { data: { type: "map", entries }, offset };
}

function decodeTagged(buf: Uint8Array, pos: number): DecodeResult {
  const arg = readArgument(buf, pos);
  const tag = arg.value;

  // Plutus constructors: tags 121-127 map to Constr 0-6
  if (tag >= 121 && tag <= 127) {
    const inner = decodeItem(buf, arg.offset);
    const fields = inner.data.type === "list" ? inner.data.items : [inner.data];
    return { data: { type: "constr", index: tag - 121, fields }, offset: inner.offset };
  }

  // Plutus constructors 7+: tag 1280 + n
  if (tag >= 1280) {
    const inner = decodeItem(buf, arg.offset);
    const fields = inner.data.type === "list" ? inner.data.items : [inner.data];
    return { data: { type: "constr", index: tag - 1280 + 7, fields }, offset: inner.offset };
  }

  // Other tags: just decode the inner value
  return decodeItem(buf, arg.offset);
}
