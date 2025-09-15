import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import axios from "axios";
import moment from "moment-timezone";
import "./index.css";
import router from "./routes";
import store from "./redux/store";
import "moment-timezone";
import { getUserAccount } from "./utils/helper";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

const user = getUserAccount()
axios.interceptors.request.use((request) => {
  request.headers.authorization = user?.api_token;
  request.headers.timezone = moment.tz.guess(true);
  request.headers["Accept-Language"] = "en";
  return request;
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
