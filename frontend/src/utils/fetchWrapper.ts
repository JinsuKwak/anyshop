import { store } from "@/lib/redux/store";
import { refreshTokenThunk, signOutThunk } from "@/lib/redux/slices/authThunks";

export async function fetchWrapper(
  input: RequestInfo | URL,
  init?: RequestInit
) {
  const state = store.getState();
  let accessToken =
    state.user.accessToken ?? localStorage.getItem("access_token") ?? undefined;

  const headers = new Headers(init?.headers ?? undefined);
  if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);

  let response = await fetch(input, { ...init, headers });

  if (response.status === 401) {
    try {
      await store.dispatch(refreshTokenThunk()).unwrap();
      accessToken =
        store.getState().user.accessToken ??
        localStorage.getItem("access_token") ??
        undefined;

      const retryHeaders = new Headers(init?.headers ?? undefined);
      if (accessToken)
        retryHeaders.set("Authorization", `Bearer ${accessToken}`);

      response = await fetch(input, { ...init, headers: retryHeaders });
    } catch (error) {
      await store.dispatch(signOutThunk({})); // { redirectTo: "/login" }
      throw new Error(`Session expired. Please log in again. ${error}`);
    }
  }

  return response;
}
