import { useState, useCallback } from "react";
import { useStore } from "react-redux";
import type { AppStore } from "@/lib/redux/store";
import { createFetchWrapper } from "@/utils/fetchWrapper";

export function useCreate<T>(endpoint: string) {
  const [response, setResponse] = useState<T | null>(null);
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const store = useStore() as AppStore;
  const fetchWrapper = createFetchWrapper(store);

  const create = useCallback(
    async (payload: Partial<T>) => {
      try {
        const res = await fetchWrapper(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const json = await res.json();
        setResponse(json);
        setStatus(res.status);
        setError(null);
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        setStatus(null);
        setResponse(null);
      }
    },
    [endpoint, fetchWrapper]
  );

  return { create, response, status, error };
}
