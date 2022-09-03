import axios from "axios";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, toggleTodo, updateTodo } from "../store/todoSlice";

const Todo = ({ todo }) => {
  const dispatch = useDispatch();
  const todoDeleteHandler = async () => {
    try {
      await axios.delete("/api/todos/" + todo._id);
      dispatch(deleteTodo(todo._id));
    } catch (err) {
      console.log(err);
    }
  };

  const markTodo = async () => {
    try {
      dispatch(toggleTodo(todo._id));
      const { data } = await axios.put("/api/todos/" + todo._id, {
        todo: { ...todo, done: !todo.done },
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full group h-14 md:h-16 px-4 flex flex-row items-center border-b border-veryLightGrayishBlue dark:border-veryDarkGrayishBlue bg-white dark:bg-veryDarkDesaturatedBlue ">
      <button
        onClick={markTodo}
        className={`h-5 w-5 md:h-6 md:w-6 border rounded-full mr-2 border-veryLightGrayishBlue group dark:border-gray-600 hover:bg-gradient-to-r from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] ${
          todo.done
            ? "bg-gradient-to-r from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] p-1.5"
            : "bg-transparent p-[0.6px] "
        }     `}
      >
        <div className="relative w-full h-full">
          {todo.done ? (
            <Image src="/icon-check.svg" layout="fill" alt="checkIcon" />
          ) : (
            <div className="w-full h-full bg-white dark:bg-veryDarkDesaturatedBlue rounded-full group-hover:block hidden"></div>
          )}
        </div>
      </button>
      <div
        className={`flex-1  text-sm lg:text-base px-1 ${
          todo.done
            ? "line-through text-gray-300 dark:text-veryDarkGrayishBlue"
            : "text-veryDarkGrayishBlue dark:text-gray-300"
        } `}
      >
        {todo.title}
      </div>
      <button
        onClick={todoDeleteHandler}
        className="h-3 w-3 md:h-4 md:w-4  relative block lg:hidden group-hover:block "
      >
        <Image src="/icon-cross.svg" layout="fill" alt="cross" />
      </button>
    </div>
  );
};

export default Todo;
