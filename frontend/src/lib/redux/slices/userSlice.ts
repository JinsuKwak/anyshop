import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "@/types/User";

export interface UserState {
  user: Omit<User, "password_hash"> | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
};

interface SignInPayload {
  user: Omit<User, "password_hash">;
  accessToken: string;
  refreshToken: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSignedIn(state, action: PayloadAction<SignInPayload>) {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.isAuthenticated = true;
    },
    setSignedOut(state) {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
    },
    setAccessToken(state, action: PayloadAction<string>) {
      state.accessToken = action.payload;
    },
  },
});

export const { setSignedIn, setSignedOut, setAccessToken } = userSlice.actions;
export default userSlice.reducer;
