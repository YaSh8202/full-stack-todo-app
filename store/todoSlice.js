import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
};

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    setAllTodos: (state, action) => {
      state.todos = action.payload;
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    },
    updateTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo
      );
    },
    toggleTodo: (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo._id === action.payload ? { ...todo, done: !todo.done } : todo
      );
    },
  },
});

export const { addTodo, setAllTodos, deleteTodo, updateTodo, toggleTodo } =
  todoSlice.actions;

export default todoSlice.reducer;
