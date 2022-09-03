import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "../store/todoSlice";

const CreateTodo = () => {
  const [todo, setTodo] = useState("");
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/create-todo", { title: todo });
    dispatch(addTodo(data.todo));
    setTodo("");
  };

  return (
    <form onSubmit={submitHandler}>
      <label
        htmlFor="newTodo"
        className="rounded mt-8 px-4 py-4 bg-white dark:bg-veryDarkDesaturatedBlue flex flex-row items-center   "
      >
        <div className="h-5 w-5 md:h-6 md:w-6 border rounded-full mr-2 border-veryLightGrayishBlue dark:border-gray-600 "></div>
        <input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          type="text"
          id="newTodo"
          className=" bg-transparent text-sm pl-2 placeholder:text-sm my-auto placeholder:text-darkGrayishBlue text-veryDarkBlue outline-none dark:text-lightGrayishBlue lg:text-lg w-full"
          placeholder="Create a new todo..."
        />
        <button type="submit"></button>
      </label>
    </form>
  );
};

export default CreateTodo;
