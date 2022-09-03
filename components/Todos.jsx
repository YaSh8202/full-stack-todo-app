import React, { useEffect } from "react";
import Todo from "./Todo";
import cookieCutter from "cookie-cutter";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setTodos } from "../store/todoSlice";

const Todos = () => {
  const todos = useSelector((state) => state.todos.todos);
  console.log(todos);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get("/api/todos");
        dispatch(setTodos(data.todos));
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodos();
  }, []);

  return (
    <div className="bg-white w-full  mt-5 rounded overflow-auto">
      {todos ? todos.map((todo) => <Todo key={todo._id} todo={todo} />) : null}
    </div>
  );
};

export default Todos;
