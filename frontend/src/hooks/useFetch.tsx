import { useState, useEffect, useMemo } from "react";

/**
 * Custom React hook to fetch data from an API endpoint.
 * @template T - The expected response data type.
 * @param {string} endpoint - The API endpoint to fetch from.
 * @param {RequestInit} [options] - Optional fetch options.
 * @returns {{ data: T | null; error: Error | null; loading: boolean }} - The fetch result, error, and loading state.
 */

const STORE_API = process.env.NEXT_PUBLIC_STORE_API;
const delay = 0.3; // seconds

export function useFetch<T>(
  endpoint: string,
  options?: RequestInit
): { data: T | null; error: Error | null; loading: boolean } {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Memoize options to prevent unnecessary re-fetches
  const memoizedOptions = useMemo(() => options, [JSON.stringify(options)]);

  useEffect(() => {
    console.log(
      `Fetching data from ${STORE_API}${endpoint} with options:`,
      memoizedOptions
    );
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${STORE_API}${endpoint}`,
          memoizedOptions
        );
        if (!response.ok) {
          throw new Error(`${response.status} /  ${response.statusText}`);
        }
        const result: T = await response.json();
        setData(result);
      } catch (err) {
        if (err instanceof Error) {
          setError(err);
        } else {
          setError(
            new Error(typeof err === "string" ? err : JSON.stringify(err))
          );
        }
      } finally {
        const timer = setTimeout(() => setLoading(false), delay * 1000);
        return () => clearTimeout(timer);
      }
    };

    fetchData();
  }, [endpoint, memoizedOptions]);

  return { data, error, loading };
}
