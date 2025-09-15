import React from "react";
import { Outlet } from "react-router-dom";
import { Bounce, ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import { getUserAccount, isLoggedIn } from "./utils/helper";
import { setCartCount } from "./redux/appSlice";
import { useEffect } from "react";
const App = () => {
  const dispatch = useDispatch();
  const user = getUserAccount();

  const fetchUserCart = async () => {
    try {
      const res = await axios.get(`/carts?user_id=${user?.id}`);
      const data = res?.data;
      if (data?.success) {
        dispatch(setCartCount(data?.data?.length));
      }
    } catch (e) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (isLoggedIn()) {
      fetchUserCart();
    }
  }, []);
  return (
    <>
      <ScrollToTop />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
        transition={Bounce}
      />
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default App;
