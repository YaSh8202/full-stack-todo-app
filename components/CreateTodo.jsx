import React from "react";

const CreateTodo = () => {
  return (
    <label
      htmlFor="newTodo"
      className="rounded mt-8 px-4 py-4 bg-white dark:bg-veryDarkDesaturatedBlue flex flex-row items-center   "
    >
      <div className="h-5 w-5 md:h-6 md:w-6 border rounded-full mr-2 border-veryLightGrayishBlue dark:border-[hsl(260,10%,94%)] "></div>
      <input
        id="newTodo"
        className=" bg-transparent text-sm pl-2 placeholder:text-sm my-auto placeholder:text-darkGrayishBlue text-veryDarkBlue outline-none lg:text-lg w-full"
        placeholder="Create a new todo..."
      />
    </label>
  );
};

export default CreateTodo;
