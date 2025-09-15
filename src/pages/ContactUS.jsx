import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { contactSchema } from "../validationSchema";
import { toast } from "react-toastify";
import axios from "axios";

const ContactUS = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactSchema),
  });

  const sendQuery = async (formData) => {
    setLoading(true);
    try {
      const res = await axios.post(`/contact`, formData);
      const data = res?.data;
      if(data?.success){
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
        style={{ backgroundImage: "url('/image/banner2.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Contact Us</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Contact Us</li>
        </ol>
      </div>
      {/* <!-- Contact Start --> */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="text-center mx-auto"
                  style={{ maxWidth: "700px" }}
                >
                  <h1 className="text-primary">Get in touch</h1>
                </div>
              </div>
              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe
                    className="rounded w-100"
                    style={{ height: "400px" }}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.63401324312!2d77.2090216!3d28.6139391!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b8e5a2d1e1%3A0x2b8e6e8e8e8e8e8e!2sNew%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sin!4v1694259649153!5m2!1sen!2sin"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div className="col-lg-7">
                <form onSubmit={handleSubmit(sendQuery)}>
                  <input
                    type="text"
                    className={inputClass("name")}
                    placeholder="Your Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name.message}</p>
                  )}
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
                    type="number"
                    className={inputClass("phone")}
                    placeholder="Enter Your Number"
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="text-danger">{errors.phone.message}</p>
                  )}
                  <textarea
                    className={inputClass("message")}
                    rows="5"
                    cols="10"
                    {...register("message")}
                    placeholder="Your Message"
                  ></textarea>
                  {errors.message && (
                    <p className="text-danger">{errors.message.message}</p>
                  )}
                  <button
                    className="w-100 btn btn-primary text-white  py-3"
                    type="submit"
                    disabled={loading}
                  >
                    Submit
                  </button>
                </form>
              </div>
              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">123 Street, New Delhi</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">Eyewear@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x text-primary me-4"></i>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">+91 99005566</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact End --> */}
      {/* <!-- Single Page Header End -->  */}
    </>
  );
};

export default ContactUS;
