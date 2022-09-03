import "../styles/globals.css";
import { wrapper } from "../store/store";
import Header from "../components/Header";
import Nav from "../components/Nav";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="flex flex-col w-full h-screen bg-veryLightGray dark:bg-veryDarkBlue overflow-hidden  ">
      <Header isDarkMode={isDarkMode} />
      <div className="absolute  top-[7%] max-w-xl left-[50%] translate-x-[-50%]  px-5 flex flex-col w-full ">
        <Nav isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
