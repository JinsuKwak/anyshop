import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// --- STATE AND TYPES ---

interface AppOptions {
  showMadeBy: boolean;
  showSKU: boolean;
  showOnDiscount: boolean;
  isRed: boolean;
  showSoldOut: boolean;
  cardSize: CardSize;
}

export type CardSize = "sm" | "md" | "lg";

interface AppState {
  options: AppOptions;
  serverTime: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
}

export const initialState: AppState = {
  options: {
    showMadeBy: true,
    showSKU: false,
    showOnDiscount: true,
    isRed: false,
    showSoldOut: true,
    cardSize: "lg",
  },
  serverTime: null,
  loading: "idle",
  error: null,
};

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

export const fetchAppSettings = createAsyncThunk<
  { options: AppOptions; serverTime: string },
  void,
  { rejectValue: string }
>("app/fetchSettings", async (_, { rejectWithValue }) => {
  try {
    const response = await fetch("/api/app-settings");
    if (!response.ok) {
      throw new Error("Failed to fetch app settings.");
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error: unknown) {
    let message = "An unknown error occurred.";
    if (error instanceof Error) {
      message = error.message;
    }
    return rejectWithValue(message);
  }
});

// --- SLICE DEFINITION ---

const appSlice = createSlice({
  name: "app",
  initialState, // <- AppState
  reducers: {
    // Synchronous reducers can be added here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAppSettings.pending, (state) => {
        state.loading = "pending";
        state.error = null;
      })
      .addCase(fetchAppSettings.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.options = action.payload.options;
        state.serverTime = action.payload.serverTime;
      })
      .addCase(fetchAppSettings.rejected, (state, action) => {
        state.loading = "failed";
        state.error = action.payload as string;
      });
  },
});

export default appSlice.reducer;
