import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetError } from "../store/authSlice";
import isAuthenticated from "../utils/isAuthenticated";
import LoadingSpinner from "./LoadingSpinner";

const Auth = ({ isSignup, onSubmit }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.auth.token);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const error = useSelector((state) => state.auth.error);
  useEffect(() => {
    setLoading(true);
    if (isAuthenticated()) {
      router.push("/");
    }
    setLoading(false);
  }, [router, token]);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  if (loading) {
    return (
      <div className=" h-full mt-[18rem]  flex items-center justify-center">
        <div className="h-10 w-10 md:h-16 md:w-16 ">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ name, email, password, confirmPassword });
      }}
      className=" h-full flex flex-col mt-6"
    >
      <div className=" container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div className="bg-white dark:bg-veryDarkDesaturatedBlue px-6 py-8 rounded shadow-md text-black w-full pb-4">
          <h1 className="mb-8 dark:text-veryLightGray text-3xl text-center text-veryDarkBlue ">
            {`${isSignup ? "Sign up" : "Sign in"}`}
          </h1>

          {isSignup && (
            <input
              value={name}
              type="text"
              className="block border dark:bg-transparent dark:text-lightGrayishBlue outline-none dark: border-veryDarkGrayishBlue w-full p-3 rounded mb-4"
              name="fullname"
              placeholder="Full Name"
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            value={email}
            type="text"
            className="block border dark:bg-transparent dark:text-lightGrayishBlue outline-none dark: border-veryDarkGrayishBlue w-full p-3 rounded mb-4"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            value={password}
            type="password"
            className="block border dark:bg-transparent dark:text-lightGrayishBlue outline-none dark: border-veryDarkGrayishBlue w-full p-3 rounded mb-4"
            name="password"
            placeholder="Password"
            autoComplete="on"
            onChange={(e) => setPassword(e.target.value)}
          />
          {isSignup && (
            <input
              value={confirmPassword}
              type="password"
              className="block border dark:bg-transparent dark:text-lightGrayishBlue outline-none dark: border-veryDarkGrayishBlue w-full p-3 rounded mb-4"
              name="confirm_password"
              placeholder="Confirm Password"
              autoComplete="on"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          )}

          <button
            type="submit"
            className="w-full text-center rounded bg-green text-veryLightGray  font-bold py-2 bg-gradient-to-r from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]  focus:outline-none my-1"
          >
            {`${isSignup ? "Create Account" : "Continue"}`}
          </button>
          <div className=" font-sm mt-1 pt-1 text-red-500">{error}</div>
        </div>
        <div className="text-veryDarkBlue dark:text-lightGrayishBlue mt-6">
          {`${
            isSignup ? "Already have an account? " : "Don't have an account? "
          }`}
          <Link
            className="no-underline border-b border-blue text-blue"
            href={isSignup ? "/signin" : "/register"}
          >
            {`${isSignup ? "Log in" : "Sign up"}`}
          </Link>
          .
        </div>
      </div>
    </form>
  );
};

export default Auth;
