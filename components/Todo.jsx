import Image from "next/image";
import React from "react";

const Todo = ({ done, title }) => {
  return (
    <div className="w-full h-14 md:h-16 px-4 flex flex-row items-center border-b border-veryLightGrayishBlue dark:border-veryDarkGrayishBlue bg-white dark:bg-veryDarkDesaturatedBlue ">
      <div className="h-5 w-5 md:h-6 md:w-6 border rounded-full mr-2 border-veryLightGrayishBlue  dark:border-[hsl(260,10%,94%)] bg-gradient-to-r from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] p-1   ">
        <div className="relative w-full h-full">
          <Image src="/icon-check.svg" layout="fill" alt="checkIcon" />
        </div>
      </div>
      <div
        className={`flex-1  text-sm lg:text-base px-1 ${
          done
            ? "line-through text-lightGrayishBlue "
            : "text-veryDarkGrayishBlue"
        } `}
      >
        Complete online javascript course
      </div>
      <div className="h-3 w-3 md:h-4 md:w-4  relative ">
        <Image src="/icon-cross.svg" layout="fill" alt="cross" />
      </div>
    </div>
  );
};

export default Todo;
