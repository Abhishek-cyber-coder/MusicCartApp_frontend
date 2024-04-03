import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navbarHeight: 0,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setNavbarHeight(state, action) {
      state.navbarHeight = action.payload;
    },
  },
});

export const { setNavbarHeight } = uiSlice.actions;

export default uiSlice.reducer;
