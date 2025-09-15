import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import About from "../pages/About";
import ContactUS from "../pages/ContactUS";
import Shop from "../pages/shop/Shop";
import ShopDetails from "../pages/shop/ShopDetails";
import SignUp from "../pages/auth/SignUp";
import VerifyOTP from "../pages/auth/VerifyOTP";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import Dashboard from "../pages/dashboard/Dashboard";
import Address from "../pages/dashboard/Address";
import SaveEditAddress from "../pages/dashboard/SaveEditAddress";
import Order from "../pages/dashboard/Order";
import Notification from "../pages/dashboard/Notification";

import PageNotFound from "../pages/PageNotFound";
import Auth from "./Auth";
import NoAuth from "./NoAuth";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "aboutus",
        element: <About />,
      },
      {
        path: "contactus",
        element: <ContactUS />,
      },
      {
        path: "shop",
        element: <Shop />,
      },
      {
        path: "shop/:id",
        element: <ShopDetails />,
      },
      {
        path: "signup",
        element: <SignUp />,
        loader: Auth,
      },
      {
        path: "verifyotp",
        element: <VerifyOTP />,
        loader: Auth,
      },
      {
        path: "login",
        element: <Login />,
        loader: Auth,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
        loader: Auth,
      },
      {
        path: "cart",
        element: <Cart />,
        loader: NoAuth,
      },
      {
        path: "checkout",
        element: <Checkout />,
        loader: NoAuth,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        loader: NoAuth,
        children: [
          {
           index: true,
           Component: Address
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "save-edit-address",
            element: <SaveEditAddress />,
          },
          {
            path: "order",
            element: <Order />,
          },
          {
            path: "notification",
            element: <Notification />,
          },
        ],
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
