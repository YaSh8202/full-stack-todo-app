import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
  s,
});

export const { auth } = authSlice.actions;

export default authSlice.reducer;
