import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import auth from "./authSlice";
import todos from "./todoSlice";

const combinedReducer = combineReducers({
  auth,
  todos,
});

export const makeStore = () => {
  return configureStore({
    reducer: combinedReducer,
  });
};

export const wrapper = createWrapper(makeStore);
