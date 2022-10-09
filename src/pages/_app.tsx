import { hydrate } from "@lib/redux/cart/cartSlice";
import store from "@lib/redux/store";
import "antd/dist/antd.css";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import { Provider as ReduxProvider } from "react-redux";
import StorageService from "../services/StorageService";
import "../styles/global.css";
import "../styles/vars.css";

store.subscribe(() => {
  StorageService.set("cart", JSON.stringify(store.getState().cart));
});

let cart = StorageService.get("cart");
cart = cart ? JSON.parse(cart) : { items: [] };
store.dispatch(hydrate(cart));

function MyApp({ Component, pageProps }: AppProps) {
  const [pageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    setPageLoaded(true);
  }, []);
  return (
    <ReduxProvider store={store}>
      {pageLoaded ? <Component {...pageProps} /> : null}
      {/* <ToastContainer transition={Zoom} /> */}
    </ReduxProvider>
  );
}

export default MyApp;
