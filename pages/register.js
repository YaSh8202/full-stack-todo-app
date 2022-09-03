import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../components/Auth";
import { auth, setError } from "../store/authSlice";
import cookieCutter from "cookie-cutter";
import Head from "next/head";

const Register = () => {
  const dispatch = useDispatch();
  const onRegister = async (formData) => {
    axios
      .post("/api/auth/register", formData)
      .then((res) => {
        dispatch(auth(res.data));
        localStorage.setItem("user", JSON.stringify(res.data));
        cookieCutter.set("oursitejwt", res.data.token, {
          maxAge: 60 * 60 * 24 * 7,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch(setError(err.response?.data?.error));
      });
  };

  return (
    <>
      <Head>
        <title>Register</title>
      </Head>
      <Auth onSubmit={onRegister} isSignup={true} />
    </>
  );
};

export default Register;
