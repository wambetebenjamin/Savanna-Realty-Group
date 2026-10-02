/**
 * Vercel KV (Upstash REST) helper with an in-memory / JSON fallback.
 *
 * On Vercel, set KV_REST_API_URL and KV_REST_API_TOKEN (created automatically
 * when you attach a Vercel KV store to the project). When the variables are
 * absent, for example in local development or this preview sandbox, reads fall
 * back to the bundled JSON data and writes are kept in memory and logged so
 * nothing ever crashes in the API routes.
 */

interface KvResult<T> {
  value: T | null;
  source: "vercel-kv" | "fallback";
}

const memoryStore = new Map<string, string>();
const hasKv = Boolean(
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
);

async function kvRequest<T>(command: (string | number)[]): Promise<T | null> {
  if (!hasKv) return null;
  try {
    const res = await fetch(process.env.KV_REST_API_URL as string, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(command),
      cache: "no-store",
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { result?: T };
    return json.result ?? null;
  } catch {
    return null;
  }
}

export async function kvGet<T>(key: string): Promise<KvResult<T>> {
  if (hasKv) {
    const value = await kvRequest<T>(["GET", key]);
    if (value !== null) return { value, source: "vercel-kv" };
  }
  return { value: null, source: "fallback" };
}

export async function kvSet(key: string, value: unknown): Promise<boolean> {
  if (hasKv) {
    const ok = await kvRequest<string>(["SET", key, JSON.stringify(value)]);
    return ok !== null;
  }
  memoryStore.set(key, JSON.stringify(value));
  console.log(`[kv:fallback] SET ${key}`);
  return true;
}

export async function kvListPush<T>(key: string, item: T): Promise<boolean> {
  if (hasKv) {
    const ok = await kvRequest<number>([
      "RPUSH",
      key,
      JSON.stringify(item),
    ]);
    return ok !== null;
  }
  const existing = memoryStore.get(key);
  const list: unknown[] = existing ? JSON.parse(existing) : [];
  list.push(item);
  memoryStore.set(key, JSON.stringify(list));
  console.log(`[kv:fallback] RPUSH ${key} -> ${JSON.stringify(item)}`);
  return true;
}

export async function kvListGet<T>(key: string): Promise<KvResult<T[]>> {
  if (hasKv) {
    const raw = await kvRequest<string[]>(["LRANGE", key, 0, -1]);
    if (raw) {
      return { value: raw.map((r) => JSON.parse(r) as T), source: "vercel-kv" };
    }
  }
  const local = memoryStore.get(key);
  return {
    value: local ? (JSON.parse(local) as T[]) : null,
    source: "fallback",
  };
}

export const kvConfigured = hasKv;
