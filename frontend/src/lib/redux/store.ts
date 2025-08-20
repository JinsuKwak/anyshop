import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./slices/appSlice";
import userReducer from "./slices/userSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      app: appReducer,
      user: userReducer,
    },
  });
};

export const store = makeStore();

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
