import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import CreateTodo from "../components/CreateTodo";
import LoadingSpinner from "../components/LoadingSpinner";
import Todos from "../components/Todos";
import { auth } from "../store/authSlice";
import isAuthenticated from "../utils/isAuthenticated";

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    if (!isAuthenticated()) {
      router.push("/register");
    } else {
      setLoading(false);
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch(auth(user));
    }
  }, [router, dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="overflow-hidden  ">
      <Head>
        <title>Todo App</title>
        <meta
          name="description"
          content="Full Stack Todo App created using Nextjs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <CreateTodo />
      <Todos />
    </div>
  );
}
