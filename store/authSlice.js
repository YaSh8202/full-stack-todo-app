import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  token: null,
  user: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    auth: (state, action) => {
      console.log("action.payload.token", action.payload.token);
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
  },
});

export const { auth } = authSlice.actions;

export default authSlice.reducer;
