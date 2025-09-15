import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setVerifyOTP } from "../../redux/appSlice";
import { useForm } from "react-hook-form";
import { verifyOTPSchema } from "../../validationSchema";
import { yupResolver } from "@hookform/resolvers/yup";

const VerifyOTP = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyOTPSchema),
  });
  const appState = useSelector((state) => state.appSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/sendotp`, {
        email: appState.verifyOTPEmail,
      });
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async ({ otp }) => {
    setLoading(true);
    try {
      const res = await axios.post(`/verifyotp`, {
        email: appState.verifyOTPEmail,
        otp: +otp,
      });
      const data = res?.data;
      if (data?.success) {
        dispatch(setVerifyOTP({ isVerify: false, email: "" }));
        toast.success(data?.message);
        navigate("/login");
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

  useEffect(() => {
    if (!appState.isVerifyOTP) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner2.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Verify OTP</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Verify OTP</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}
      {/* <!-- Verify OTP Start --> */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Verify OTP</h1>
                </div>
              </div>
              <div className="col-lg-3"></div>
              <div className="col-lg-6">
                <form onSubmit={handleSubmit(handleVerifyOTP)}>
                  <label className="text- py-3" htmlFor="Shipping-2">
                    Enter the OTP already sent to your email
                  </label>
                  <input
                    type="number"
                    className={inputClass("otp")}
                    placeholder="Enter OTP"
                    {...register("otp")}
                  />
                  {errors.otp && (
                    <p className="text-danger">{errors.otp.message}</p>
                  )}
                  <button
                    disabled={loading}
                    className="w-100 btn btn-primary border-0 border-secondary py-3 px-4   text-white"
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
                <div className="row py-5">
                  <div className="col-lg-6 text-start">
                    <button
                      disabled={loading}
                      onClick={handleResendOTP}
                      className="btn btn-secondary border border-secondary rounded-pill  text-white"
                    >
                      <i className="fa fa-paper-plane me-2 text-white"></i>
                      Resend
                    </button>
                  </div>
                  <div className="col-lg-6 text-end">
                    <Link
                      to="/login"
                      className="btn btn-secondary border border-secondary rounded-pill  text-white"
                    >
                      <i className="fa fa-user me-2 text-white"></i>
                      Already Verified ? Login
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-3"></div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Verify OTP  End --> */}
    </>
  );
};

export default VerifyOTP;
