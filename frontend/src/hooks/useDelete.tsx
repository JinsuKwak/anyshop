// hooks/useDelete.ts
import { useState, useCallback } from "react";
import { useStore } from "react-redux";
import type { AppStore } from "@/lib/redux/store";
import { createFetchWrapper } from "@/utils/fetchWrapper";

export function useDelete(endpoint: string) {
  const [status, setStatus] = useState<number | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const store = useStore() as AppStore;
  const fetchWrapper = createFetchWrapper(store);

  const remove = useCallback(
    async (id: string | number) => {
      try {
        const url = endpoint.endsWith("/")
          ? `${endpoint}${id}`
          : `${endpoint}/${id}`;

        const res = await fetchWrapper(url, {
          method: "DELETE",
        });

        setStatus(res.status);
        setError(null);
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        setStatus(null);
      }
    },
    [endpoint, fetchWrapper]
  );

  return { remove, status, error };
}
