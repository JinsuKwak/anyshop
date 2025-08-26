import {
  initialState as appInitial,
  type AppState,
} from "@/lib/redux/slices/appSlice";

type AppSettingsResponse = Partial<AppState> & {
  // additional metadata if needed
  version?: number;
  updatedAt?: string;
};

function mergeSettings(data?: AppSettingsResponse): AppState {
  return {
    ...appInitial,
    ...data,
    options: {
      ...appInitial.options,
      ...(data?.options ?? {}),
    },
  };
}

export async function getAppSettings(): Promise<AppState> {
  const STORE_API = process.env.NEXT_PUBLIC_STORE_API ?? "";
  const url = `${STORE_API}/api/app-settings`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return mergeSettings();

    const data = (await res.json()) as AppSettingsResponse;
    return mergeSettings(data);
  } catch {
    return mergeSettings();
  }
}
