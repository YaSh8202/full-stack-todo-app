import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

function Nav() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const token = useSelector((state) => state.auth.token);

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

  const signoutHandler = () => {
    localStorage.removeItem("user");
    dispatch(logout);
    router.push("/signin");
  };

  return (
    <div className="flex flex-row justify-between items-center w-full text-white">
      <h2 className="text-3xl md:text-4xl tracking-[0.7rem] font-bold">TODO</h2>
      <div className="flex flex-row items-center gap-3">
        <button
          title="Toggle Theme"
          onClick={toggleDarkMode}
          className="h-5 w-5 md:h-6 md:w-6 group "
        >
          <Image
            src={`${isDarkMode ? "/icon-sun.svg" : "/icon-moon.svg"}`}
            height={30}
            width={30}
            alt="darkModeToggler"
            layout="responsive"
            className=" group-hover:animate-spin"
          />
        </button>
        {token && (
          <button
            title="Logout"
            onClick={signoutHandler}
            className="h-5 w-5 md:h-6 md:w-6"
          >
            <Image
              src={`/logout.svg`}
              height={30}
              width={30}
              alt="darkModeToggler"
              layout="responsive"
            />
          </button>
        )}
      </div>
    </div>
  );
}

export default Nav;
