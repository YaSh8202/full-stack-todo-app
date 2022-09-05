import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Auth from "../components/Auth";
import { auth, setError } from "../store/authSlice";
import cookieCutter from "cookie-cutter";
import Head from "next/head";

const Signin = () => {
  const dispatch = useDispatch();
  const onSignin = async (formData) => {
    axios
      .post("/api/auth/signin", formData)
      .then((res) => {
        dispatch(auth(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        cookieCutter.set("oursitejwt", res.data.token, {
          maxAge: 60 * 60 * 24 * 1000, // 1 day
          expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(setError(err.response.data.error));
      });
  };

  return (
    <>
      <Head>
        <title>Signin</title>
      </Head>
      <Auth onSubmit={onSignin} isSignup={false} />;
    </>
  );
};

export default Signin;
