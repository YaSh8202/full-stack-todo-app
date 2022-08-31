import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import auth from "./authSlice";

const combinedReducer = combineReducers({
  auth,
});

export const makeStore = () => {
  return configureStore({
    reducer: combinedReducer,
  });
};

export const wrapper = createWrapper(makeStore);
