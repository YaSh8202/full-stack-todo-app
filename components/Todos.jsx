import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setAllTodos } from "../store/todoSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setTodos(items);
  }

  return (
    <div className=" w-full   mt-5 rounded  font-medium ">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="todos max-h-[40vh] md:max-h-[55vh] scrollbar-hide overflow-auto rounded-t "
            >
              {todos.length > 0 ? (
                todos.map((todo, index) => (
                  <Draggable
                    draggableId={todo._id}
                    index={index}
                    key={todo._id}
                  >
                    {(provided) => (
                      <li
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                      >
                        <Todo todo={todo} />
                      </li>
                    )}
                  </Draggable>
                ))
              ) : (
                <Todo todo={{ title: "No Todos here", done: false }} />
              )}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <div className="flex text-sm rounded-b  flex-row items-center h-12 md:h-14 px-4  bg-white dark:bg-veryDarkDesaturatedBlue justify-between ">
        <div className="text-gray-400 font-medium ">{`${
          allTodos.filter((todo) => !todo.done).length
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
      <p className="text-center text-sm mt-7 text-darkGrayishBlue">
        Drag and drop to reorder list
      </p>
    </div>
  );
};

export default Todos;
