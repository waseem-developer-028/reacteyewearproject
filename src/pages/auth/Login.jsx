import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validationSchema";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setVerifyOTP, setCartCount } from "../../redux/appSlice";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`/login`, formData);
      const data = res?.data;
      if(data?.success) {
           const user = JSON.stringify(data?.data)
           localStorage.setItem('user', user)
           toast.success("Logged In Successfully!");
           dispatch(setCartCount(data?.data?.cartCount));
           navigate(-1)
      }
      else if (!data?.success && data?.status === 201) {
        dispatch(setVerifyOTP({ isVerify: true, email: formData?.email }));
        toast.warning(data?.message);
        navigate("/verifyotp");
      } else {
        toast.warning(data?.message);
      }
      reset();
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass = (name) => {
    let baseClass = "w-100 form-control border-0 py-3 mb-4 ";
    if (errors[name]) {
      baseClass += "error";
    }
    return baseClass;
  };
  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner4.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Login</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Login</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}
      {/* <!-- LoginStart --> */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Login</h1>
                </div>
              </div>
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <form onSubmit={handleSubmit(handleLogin)}>
                  <input
                    type="email"
                    className={inputClass("email")}
                    placeholder="Enter Your Email"
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email.message}</p>
                  )}
                  <input
                    type="password"
                    className={inputClass("password")}
                    placeholder="Enter Your Password"
                    {...register("password")}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                  <button
                    disabled={loading}
                    className="w-100 btn btn-primary border-0 border-secondary py-3 px-4   text-white"
                    type="submit"
                  >
                    Login
                  </button>
                </form>
                <div className="row py-5">
                  <div className="col-lg-6">
                    <Link
                      to="/forgot-password"
                      className="btn btn-secondary border border-secondary rounded-pill  text-white"
                    >
                      <i className="fa fa-question me-2 text-white"></i>
                      Forgot Password
                    </Link>
                  </div>
                  <div className="col-lg-6 text-end">
                    <Link
                      to="/signup"
                      className="btn btn-secondary border border-secondary rounded-pill  text-white"
                    >
                      <i className="fa fa-user-plus me-2 text-white"></i>
                      Sign Up
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Login End --> */}
    </>
  );
};

export default Login;
