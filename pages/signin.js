import axios from "axios";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Auth from "../components/Auth";
import { auth, setError } from "../store/authSlice";

const Signin = () => {
  const dispatch = useDispatch();
  const onSignin = async (formData) => {
    axios
      .post("/api/auth/signin", formData)
      .then((res) => {
        dispatch(auth(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setError(err.response.data.error));
      });
  };

  return <Auth onSubmit={onSignin} isSignup={false} />;
};

export default Signin;
