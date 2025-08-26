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

// --- ASYNC THUNKS ---
// createAsyncThunk( TypePrefix, payloadCreator )
// TypePrefix -> "app/fetchSettings/pending", "app/fetchSettings/fulfilled", "app/fetchSettings/rejected"
// payloadCreator -> success = data fulfilled, failed -> rejected win payload

// createAsyncThunk<
//   Returned,         // ✅ fulfilled 액션의 payload 타입 (성공 시)
//   ThunkArg,         // ✅ dispatch 때 넘기는 인자 타입
//   ThunkApiConfig    // ✅ thunkAPI 설정 (state, dispatch, rejectValue 등)
// >(typePrefix, payloadCreator)

// createAsyncThunk<Returned, ThunkArg, ThunkApiConfig>(
//   typePrefix: string,
//   payloadCreator: (arg: ThunkArg, thunkAPI: ThunkAPI) => Promise<Returned> | Returned,
//   options?
// )

// createAsyncThunk가 제공하는 도우미 객체. 주요 속성:
// 	•	dispatch: 다른 액션/썽크 디스패치 가능
// 	•	getState: 현재 루트 상태 얻기 (타입은 ThunkApiConfig로 지정)
// 	•	rejectWithValue(value): 실패 시 커스텀 payload로 rejected 액션 보내기
// → ThunkApiConfig의 rejectValue에 타입을 지정해야 타입 안전
// 	•	fulfillWithValue(value, meta?): 성공 시 커스텀 payload/meta로 fulfilled 보내기(선택)
// 	•	requestId: 이 thunk 호출의 고유 ID (중복 요청 제어 등에 유용)
// 	•	signal: AbortSignal. 외부/내부 취소 신호 체크 가능
