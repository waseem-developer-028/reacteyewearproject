import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { isLoggedIn, getUserAccount } from "../utils/helper";
import Loader from "./Loader";
import { useSelector } from "react-redux";

const Header = () => {
  const [isShowNav, setIsShowNav] = useState(false);
  const [isShowDropdown, setIsShowDropdown] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const user = getUserAccount()
  const appState = useSelector((state) => state.appSlice);

  const handleLogout = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`/logout`);
      const data = res?.data;
      if (data?.success) {
        localStorage.removeItem("user");
        toast.success(data?.message);
        navigate("/");
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid fixed-top">
      <div className="container topbar bg-primary d-none d-lg-block">
        <div className="d-flex justify-content-between">
          <div className="top-info ps-2">
            <small className="me-3">
              <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
              <NavLink to="#" className="text-white">
                123 Street, New Delhi
              </NavLink>
            </small>
            <small className="me-3">
              <i className="fas fa-envelope me-2 text-secondary"></i>
              <NavLink to="#" className="text-white">
                Eyewear@gmail.com
              </NavLink>
            </small>
          </div>
        </div>
      </div>
      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <NavLink to="index.html" className="navbar-brand">
            <img
              src="/image/weblogo.png"
              alt="Eyewear Logo"
              style={{
                height: "40px",
                marginRight: "10px",
                verticalAlign: "middle",
              }}
            />
            <h1 className="text-primary display-6 d-inline-block align-middle">
              Eyewear
            </h1>
          </NavLink>
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            onClick={() => setIsShowNav(!isShowNav)}
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div
            className={`collapse navbar-collapse bg-white ${
              isShowNav ? "show" : ""
            }`}
            id="navbarCollapse"
          >
            <div className="navbar-nav mx-auto">
              <NavLink to="/" className="nav-item nav-link">
                Home
              </NavLink>
              <NavLink to="/aboutus" className="nav-item nav-link">
                About US
              </NavLink>
              <NavLink to="/contactus" className="nav-item nav-link">
                Contact US
              </NavLink>
              <NavLink to="/shop" className="nav-item nav-link">
                Shop
              </NavLink>
              {!isLoggedIn() ? (
                <>
                  <NavLink to="/login" className="nav-item nav-link">
                    Sign In
                  </NavLink>
                  <NavLink to="/signup" className="nav-item nav-link">
                    Sign Up
                  </NavLink>
                </>
              ) : (
                <NavLink to="#" className="nav-item nav-link text-info">
                  Hi {user?.name}
                </NavLink>
              )}
            </div>
            {isLoggedIn() && (
              <div className="d-flex m-3 me-0">
                <NavLink to="/cart" className="position-relative me-4 my-auto">
                  <i className="fa fa-shopping-bag fa-2x"></i>
                  <span
                    className="position-absolute bg-secondary rounded-circle d-flex align-items-center justify-content-center text-dark px-1"
                    style={{
                      top: "-5px",
                      left: "15px",
                      height: "20px",
                      minWidth: "20px",
                    }}
                  >
                    {appState?.cartCount}
                  </span>
                </NavLink>
                <div className="nav-item dropdown">
                  <Link
                    to="#"
                    className="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    onClick={() => setIsShowDropdown(!isShowDropdown)}
                  >
                    {" "}
                    <i className="fas fa-user fa-2x"></i>
                  </Link>
                  <div
                    className={`dropdown-menu m-0 bg-secondary rounded-0 ${
                      isShowDropdown ? "show" : ""
                    }`}
                  >
                    <Link to="/dashboard" className="dropdown-item">
                      Dashboard
                    </Link>
                    <Link to="#" className="dropdown-item">
                      &nbsp;
                    </Link>
                    <Link onClick={handleLogout} className="dropdown-item">
                      {loading ? <Loader /> : " Logout"}
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
