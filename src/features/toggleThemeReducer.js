import { createSlice } from "@reduxjs/toolkit";

export const toggleThemeSlice = createSlice({
  name: "toggleTheme",
  initialState: {
    toggleTheme: false,
  },

  reducers: {
    toggler: (state,action) => {
      state.toggleTheme = action.payload.value;
    }
  },
});

export const { toggler } = toggleThemeSlice.actions;

export const selecttoggleTheme = (state) =>  state.toggleTheme.toggleTheme;

export default toggleThemeSlice.reducer;
