import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/userSlice";
import toggleThemeReducer from "../features/toggleThemeReducer";


export const store = configureStore({
  reducer: {
    user: userReducer,
    toggleTheme: toggleThemeReducer,
  },
});
