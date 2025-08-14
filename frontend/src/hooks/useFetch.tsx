import { useState, useEffect } from "react";

const STORE_API = process.env.NEXT_PUBLIC_STORE_API;

export function useFetch<T>(
  endpoint: string,
  options?: RequestInit
): { data: T | null; error: Error | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  console.log(endpoint);
  console.log(STORE_API);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${STORE_API}${endpoint}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, options]);

  return { data, error, loading };
}
