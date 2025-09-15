import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { subscribeSchema } from "../validationSchema";
import { toast } from "react-toastify";
import axios from "axios";

const Footer = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(subscribeSchema),
  });

  const subscribeNewsLetter = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`/subscribe`, formData);
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
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
  return (
    <>
      <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
        <div className="container py-5">
          <div
            className="pb-4 mb-4"
            style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}
          >
            <div className="row g-4">
              <div className="col-lg-3">
                <Link href="#">
                  <h1 className="text-primary mb-0">Eyewear</h1>
                </Link>
              </div>
              <div className="col-lg-6">
                <div className="position-relative mx-auto">
                  <form onSubmit={handleSubmit(subscribeNewsLetter)}>
                    <input
                      className={`form-control border-0 w-100 py-3 px-4 rounded-pill ${
                        errors.email ? "error" : ""
                      }`}
                      type="text"
                      placeholder="Your Email"
                      {...register("email")}
                    />
                    <button
                      type="submit"
                      className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                      style={{ top: 0, right: 0 }}
                      disabled={loading}
                    >
                      Subscribe Now
                    </button>
                  </form>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="d-flex justify-content-end pt-3">
                  <Link
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-secondary me-2 btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link
                    className="btn btn-outline-secondary btn-md-square rounded-circle"
                    href=""
                  >
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row g-5">
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Why People Like us!</h4>
                <p className="mb-4">
                  typesetting, remaining essentially unchanged. It was
                  popularised in the 1960s with the like Aldus PageMaker
                  including of Lorem Ipsum.
                </p>
                <Link
                  href=""
                  className="btn border-secondary py-2 px-4 rounded-pill text-primary"
                >
                  Read More
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="d-flex flex-column text-start footer-item">
                <Link className="btn-link" to="/">
                  Home
                </Link>
                <Link className="btn-link" to="/aboutus">
                  About Us
                </Link>
                <Link className="btn-link" to="/contactus">
                  Contact Us
                </Link>
                <Link className="btn-link" to="/shop">
                  Shop
                </Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="footer-item">
                <h4 className="text-light mb-3">Contact</h4>
                <p>Address: 123 Street, New Delhi</p>
                <p>Email: Eywear@gmail.com</p>
                <p>Phone: +91 99005566</p>
                <p>Payment Accepted</p>
                <img src="/image/payment.png" className="img-fluid" alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Footer End -->

    <!-- Copyright Start --> */}
      <div className="container-fluid copyright bg-dark py-4">
        <div className="container">
          <div className="row">
            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
              <span className="text-light">
                <Link href="#">
                  <i className="fas fa-copyright text-light me-2"></i>Eyewear
                </Link>
                , All right reserved.
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Copyright End -->

    <!-- Back to Top --> */}
      <a
        href="#"
        className="btn btn-primary border-3 border-primary rounded-circle back-to-top"
      >
        <i className="fa fa-arrow-up"></i>
      </a>
    </>
  );
};

export default Footer;
