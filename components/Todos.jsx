import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllTodos } from "../store/todoSlice";

const Todos = () => {
  const allTodos = useSelector((state) => state.todos.todos);
  const dispatch = useDispatch();
  const categories = ["All", "Active", "Completed"];
  const [category, setCategory] = useState("All");
  const [todos, setTodos] = useState(allTodos);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await axios.get("/api/todos");
        dispatch(setAllTodos(data.todos));
      } catch (err) {
        console.log(err);
      }
    };
    fetchTodos();
  }, []);

  useEffect(() => {
    if (category === "All") {
      setTodos(allTodos);
    } else if (category === "Completed") {
      setTodos(allTodos.filter((todo) => todo.done));
    } else {
      setTodos(allTodos.filter((todo) => !todo.done));
    }
  }, [category, allTodos]);

  const clearCompleted = async () => {
    try {
      const { data } = await axios.get("/api/todos/clear-completed");
      dispatch(setAllTodos(data.todos));
    } catch (err) {
      console.log(err);
    }
  };

  if (allTodos.length === 0) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-veryDarkGrayishBlue dark:text-white text-2xl font-bold mt-4">
          No todos here
        </h1>
      </div>
    );
  }

  return (
    <div className=" w-full   mt-5 rounded  font-medium ">
      <div className="max-h-[21rem] md:max-h-[30rem] scrollbar-hide overflow-auto rounded-t ">
        {todos
          ? todos.map((todo) => <Todo key={todo._id} todo={todo} />)
          : null}
      </div>
      <div className="flex text-sm rounded  flex-row items-center h-12 md:h-14 px-4  bg-white dark:bg-veryDarkDesaturatedBlue justify-between ">
        <div className="text-gray-400 font-medium ">{`${
          allTodos.filter((todo) => todo.done).length
        } items left`}</div>
        <div className=" items-center gap-3 hidden sm:flex child-hover:text-veryDarkGrayishBlue ">
          {categories.map((cat) => (
            <button
              onClick={() => setCategory(cat)}
              key={cat}
              className={`${
                category === cat ? "text-brightBlue" : "text-darkGrayishBlue"
              }  font-medium`}
            >
              {cat}
            </button>
          ))}
        </div>
        <button
          onClick={clearCompleted}
          className="text-darkGrayishBlue hover:text-veryDarkGrayishBlue"
        >
          Clear Completed
        </button>
      </div>
      <div className="justify-center text-sm rounded mt-7 h-12 bg-white dark:bg-veryDarkDesaturatedBlue  items-center gap-4 flex sm:hidden child-hover:text-veryDarkGrayishBlue ">
        {categories.map((cat) => (
          <button
            onClick={() => setCategory(cat)}
            key={cat}
            className={`${
              category === cat ? "text-brightBlue" : "text-darkGrayishBlue"
            }  font-medium`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Todos;
