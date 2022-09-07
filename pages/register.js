import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../components/Auth";
import { auth, setError } from "../store/authSlice";
import cookieCutter from "cookie-cutter";
import Head from "next/head";
import LoadingSpinner from "../components/LoadingSpinner";

const Register = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const onRegister = async (formData) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/api/auth/register", formData);
      dispatch(auth(data));
      localStorage.setItem("user", JSON.stringify(data));
      cookieCutter.set("oursitejwt", data.token, {
        maxAge: 60 * 60 * 24 * 1000, // 1 day
        expires: new Date(Date.now() + 60 * 60 * 24 * 1000), // 1 day
      });
    } catch (error) {
      console.log(err);
      // dispatch(setError(err.response?.data?.error));
      dispatch(setError(err));
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

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
