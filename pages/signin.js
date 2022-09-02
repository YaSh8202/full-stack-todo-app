import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Auth from "../components/Auth";
import { auth } from "../store/authSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const onSignin = async (formData) => {
    const { data } = await axios.post("/api/auth/signin", formData);
    dispatch(auth(data));
    localStorage.setItem("token", data.token);
  };
  return <Auth onSubmit={onSignin} isSignup={false} />;
};

export default Signin;
