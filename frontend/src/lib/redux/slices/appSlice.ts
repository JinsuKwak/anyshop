import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type CardSize = "sm" | "md" | "lg";

export type ThemeName =
  | "default"
  | "blue"
  | "green"
  | "amber"
  | "rose"
  | "purple"
  | "orange"
  | "teal"
  | "mono"
  | "scaled"
  | "red"
  | "yellow"
  | "violet";

/** App options (settings that may come from the server) */
export interface AppOptions {
  theme?: ThemeName;
  showMadeBy: boolean;
  showSKU: boolean;
  showOnDiscount: boolean;
  isRedMark: boolean;
  isRedTag: boolean;
  showSoldOut: boolean;
  cardSize: CardSize;
}

/** Global app state */
export interface AppState {
  options: AppOptions;
  serverTime: string | null;
}

/** Default client state (used when no SSR preloadedState is available) */
export const initialState: AppState = {
  options: {
    showMadeBy: true,
    showSKU: false,
    showOnDiscount: true,
    isRedMark: true,
    isRedTag: true,
    showSoldOut: true,
    cardSize: "lg",
    theme: "default",
  },
  serverTime: null,
};

/** Payload structure for server settings (used for SSR injection or CSR synchronization) */
export type ServerSettingsPayload = {
  options: AppOptions;
  serverTime?: string | null;
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    /** Replace only options */
    setOptions(state, action: PayloadAction<AppOptions>) {
      state.options = action.payload;
    },
    /** Replace only server time */
    setServerTime(state, action: PayloadAction<string | null>) {
      state.serverTime = action.payload;
    },
    /** Inject server settings at once (replacement or supplement for SSR preloadedState) */
    hydrateFromServer(state, action: PayloadAction<ServerSettingsPayload>) {
      state.options = action.payload.options;
      state.serverTime = action.payload.serverTime ?? state.serverTime ?? null;
    },
  },
});

export const { setOptions, setServerTime, hydrateFromServer } =
  appSlice.actions;

export default appSlice.reducer;
