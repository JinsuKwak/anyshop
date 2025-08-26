import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode, JwtPayload } from "jwt-decode";
import { RootState } from "../store";
import { setSignedIn, setSignedOut, setAccessToken } from "./userSlice";
import { User } from "@/types/User";

type Decoded = Omit<User, "password_hash"> & JwtPayload;

// Sign in (save tokens + update state)
export const signInThunk = createAsyncThunk<
  void,
  { accessToken: string; refreshToken: string }
>("auth/signIn", async ({ accessToken, refreshToken }, { dispatch }) => {
  // 1) Decode token to extract user info
  const decoded = jwtDecode<Decoded>(accessToken);

  // 2) Save to storage (side effect)
  localStorage.setItem("access_token", accessToken);
  localStorage.setItem("refresh_token", refreshToken);

  // 3) Update state
  dispatch(
    setSignedIn({
      user: decoded,
      accessToken,
      refreshToken,
    })
  );
});

// Sign out (clear storage + reset state + redirect)
export const signOutThunk = createAsyncThunk<void, { redirectTo?: string }>(
  "auth/signOut",
  async ({ redirectTo = "/auth/sign-in" } = {}, { dispatch }) => {
    // 1) Clear storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");

    // 2) Reset state
    dispatch(setSignedOut());

    // 3) Redirect (using window since router hooks are not available here)
    if (typeof window !== "undefined") {
      window.location.assign(redirectTo);
    }
  }
);

// Refresh token (update access token on success, force logout on failure)
export const refreshTokenThunk = createAsyncThunk<
  void,
  void,
  { state: RootState }
>("auth/refresh", async (_, { getState, dispatch }) => {
  const state = getState();
  const refreshToken =
    state.user.refreshToken ?? localStorage.getItem("refresh_token");

  if (!refreshToken) {
    await dispatch(signOutThunk({ redirectTo: "/auth/sign-in" }));
    return;
  }
  const res = await fetch("/api/auth/refresh", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refreshToken }),
  });

  if (!res.ok) {
    await dispatch(signOutThunk({ redirectTo: "/auth/sign-in" }));
    return;
  }

  const { accessToken: newAccess } = await res.json();
  // Save refreshed access token
  localStorage.setItem("access_token", newAccess);
  dispatch(setAccessToken(newAccess));
});
