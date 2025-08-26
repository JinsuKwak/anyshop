"use client";

import { useRef, useEffect } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, AppDispatch, type RootState } from "./store";
import { setSignedIn } from "./slices/userSlice";
import { jwtDecode } from "jwt-decode";
import { User } from "@/types/User";

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
  preloadedState,
}: {
  children: React.ReactNode;
  preloadedState?: Partial<RootState>;
}) {
  const storeRef = useRef(makeStore(preloadedState));

  useEffect(() => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken && storeRef.current) {
      reauthenticate(storeRef.current.dispatch, refreshToken);
    }
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
