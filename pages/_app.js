import "../styles/globals.css";
import { wrapper } from "../store/store";
import Header from "../components/Header";
import Nav from "../components/Nav";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col w-full h-screen bg-veryLightGray dark:bg-veryDarkBlue ">
      <Header />
      <div className="absolute   top-[7%] max-w-xl md:left-[50%] md:translate-x-[-50%]  px-5 flex flex-col w-full ">
        <Nav />
        <Component {...pageProps} />
      </div>
    </div>
  );
}

export default wrapper.withRedux(MyApp);
