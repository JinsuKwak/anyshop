import { useState, useEffect, useMemo } from "react";
import { fetchWrapper } from "@/utils/fetchWrapper";

const STORE_API = process.env.NEXT_PUBLIC_STORE_API ?? "";

const delayMs = 300;

export function useFetch<T>(endpoint: string, options?: RequestInit) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const stableOptions = useMemo<RequestInit | undefined>(
    () => options,
    [options]
  );

  useEffect(() => {
    if (!STORE_API) {
      setError(new Error("STORE_API is not configured"));
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    let timer: number | undefined;

    const base = STORE_API.endsWith("/") ? STORE_API.slice(0, -1) : STORE_API;
    const path = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${base}${path}`;

    (async () => {
      try {
        const response = await fetchWrapper(url, {
          ...stableOptions,
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(`${response.status} / ${response.statusText}`);
        }
        const json = (await response.json()) as T;
        setData(json);
        setError(null);
      } catch (err: unknown) {
        if ((err as Error)?.name === "AbortError") return;
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        timer = window.setTimeout(() => setLoading(false), delayMs);
      }
    })();

    return () => {
      controller.abort();
      if (timer) window.clearTimeout(timer);
    };
  }, [endpoint, stableOptions]);

  return { data, error, loading };
}
