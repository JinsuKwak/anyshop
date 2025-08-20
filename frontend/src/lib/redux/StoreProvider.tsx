"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, AppDispatch } from "./store";
import { setSignedIn } from "./slices/userSlice";
import { fetchAppSettings } from "./slices/appSlice";
import { jwtDecode } from "jwt-decode";
import { User } from "@/Types/User";

// Helper function to manage re-authentication
const reauthenticate = async (dispatch: AppDispatch, refreshToken: string) => {
  try {
    const res = await fetch("/api/auth/refresh", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) throw new Error("Failed to refresh token");

    const { accessToken } = await res.json();
    const user = jwtDecode<Omit<User, "password_hash">>(accessToken);

    dispatch(setSignedIn({ user, accessToken, refreshToken }));
  } catch (error) {
    console.error("Automatic re-authentication failed:", error);
    // If refresh fails, the token is invalid, so we clear it.
    localStorage.removeItem("refresh_token");
  }
};

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
    // Dispatch fetch app settings on initial load
    storeRef.current.dispatch(fetchAppSettings());
    if (storeRef.current) {
      const state = storeRef.current.getState();
      console.log("App options:", state.app.options);
      console.log("Server time:", state.app.serverTime);
    }
  }

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken && storeRef.current) {
      reauthenticate(storeRef.current.dispatch, refreshToken);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
