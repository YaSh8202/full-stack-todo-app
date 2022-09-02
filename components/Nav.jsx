import Image from "next/image";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

function Nav() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
    }
    localStorage.setItem("theme", isDarkMode ? "light" : "dark");
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    const root = document.documentElement;
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      root.classList.add(theme);
      setIsDarkMode(true);
    }
  }, []);
  return (
    <div className="flex flex-row justify-between items-center w-full text-white">
      <h2 className="text-3xl md:text-4xl tracking-[0.7rem] font-bold">TODO</h2>
      <button onClick={toggleDarkMode} className="h-5 w-5 md:h-6 md:w-6">
        <Image
          src={`${isDarkMode ? "/icon-sun.svg" : "/icon-moon.svg"}`}
          height={30}
          width={30}
          alt="darkModeToggler"
          layout="responsive"
        />
      </button>
    </div>
  );
}

export default Nav;
