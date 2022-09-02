import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Auth from "../components/Auth";
import { auth } from "../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const onRegister = async (formData) => {
    const { data } = await axios.post("/api/auth/register", formData);
    dispatch(auth(data));
    localStorage.setItem("token", data.token);
  };
  return <Auth onSubmit={onRegister} isSignup={true} />;
};

export default Register;
