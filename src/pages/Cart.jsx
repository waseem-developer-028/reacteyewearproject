import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getUserAccount, showImage, showPrice } from "../utils/helper";
import axios from "axios";
import { toast } from "react-toastify";
import NoData from "../components/NoData";
import PageLoader from "../components/PageLoader";
import Loader from "../components/Loader";
import { setCartCount } from "../redux/appSlice";
import { useDispatch } from "react-redux";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [carts, setCarts] = useState([]);
  const user = getUserAccount();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchUserCart = async (loading = false) => {
    setContentLoader(loading);
    try {
      const res = await axios.get(`/carts?user_id=${user?.id}`);
      const data = res?.data;
      if (data?.success) {
        setCarts(data?.data);
        dispatch(setCartCount(data?.data?.length));
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
      setContentLoader(false);
    }
  };

  useEffect(() => {
    fetchUserCart();
  }, []);

  const updateCart = async (id, quantity, type = "plus") => {
    if (type === "plus" && quantity >= 20) {
      toast.warning("Max quanity is 20");
      return false;
    } else if (type === "plus") {
      quantity += 1;
    } else if (type === "minus" && quantity > 1) {
      quantity -= 1;
    }
    setContentLoader(true);
    try {
      const res = await axios.put(`/carts/${id}`, {
        quantity,
      });
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        await fetchUserCart(true);
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setContentLoader(false);
    }
  };

  const deleteCart = async (id) => {
    if (confirm("Are you sure delete this product?")) {
      setContentLoader(true);
      try {
        const res = await axios.delete(`/carts/${id}`);
        const data = res?.data;
        if (data?.success) {
          toast.success(data?.message);
          fetchUserCart(true);
        } else {
          toast.warning(data?.message);
        }
      } catch (e) {
        toast.error(e.message);
      } finally {
        setContentLoader(false);
      }
    }
    return false;
  };

  if (loading) {
    return <PageLoader />;
  }

  const cartTotal = carts?.reduce((prev, cur) => {
    return prev + cur?.product_id?.price * cur?.quantity;
  }, 0);

  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner2.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Cart</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Cart</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}
      {/* <!-- Cart Page Start --> */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="table-responsive">
            {carts?.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Name</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">Handle</th>
                  </tr>
                </thead>
                <tbody>
                  {carts?.map((product) => (
                    <tr key={product?.id}>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={showImage(product?.product_id?.image)}
                            className="img-fluid me-5 rounded-circle"
                            style={{ width: "80px", height: "80px" }}
                            alt=""
                          />
                        </div>
                      </th>
                      <td>
                        <p className="mb-0 mt-4">{product?.product_id?.name}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {showPrice(product?.product_id?.price)} ₹
                        </p>
                      </td>
                      <td>
                        {contentLoader ? (
                          <Loader />
                        ) : (
                          <div
                            className="input-group quantity mt-4"
                            style={{ width: "100px" }}
                          >
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-minus rounded-circle bg-light border"
                                onClick={() =>
                                  updateCart(
                                    product?.id,
                                    product?.quantity,
                                    "minus"
                                  )
                                }
                              >
                                <i className="fa fa-minus"></i>
                              </button>
                            </div>
                            <input
                              type="text"
                              className="form-control form-control-sm text-center border-0"
                              defaultValue={product?.quantity}
                            />
                            <div className="input-group-btn">
                              <button
                                className="btn btn-sm btn-plus rounded-circle bg-light border"
                                onClick={() =>
                                  updateCart(
                                    product?.id,
                                    product?.quantity,
                                    "plus"
                                  )
                                }
                              >
                                <i className="fa fa-plus"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {showPrice(
                            product?.quantity * product?.product_id?.price
                          )}{" "}
                          ₹
                        </p>
                      </td>
                      <td>
                        {contentLoader ? (
                          <Loader />
                        ) : (
                          <button
                            onClick={() => deleteCart(product?.id)}
                            className="btn btn-md rounded-circle bg-light border mt-4"
                          >
                            <i className="fa fa-times text-danger"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData imgSrc="/image/emptycart.png" />
            )}
          </div>
          <div className="mt-5">
            <button
              className="btn border-secondary rounded-pill px-4 py-3 text-primary"
              type="button"
              onClick={() => navigate("/shop")}
            >
              Continue Shopping
            </button>
          </div>
          <div className="row g-4 justify-content-end">
            <div className="col-8"></div>
            {carts?.length > 0 && (
              <div className="col-sm-8 col-md-7 col-lg-6 col-xl-4">
                <div className="bg-light rounded">
                  <div className="p-4">
                    <h1 className="display-6 mb-4">
                      Cart <span className="fw-normal">Total</span>
                    </h1>
                  </div>
                  <div className="py-4 mb-4 border-top border-bottom d-flex justify-content-between">
                    <h4 className="mb-0 ps-4 me-4">Total</h4>
                    <p className="mb-0 pe-4 fw-bold fs-5">
                      ₹{showPrice(cartTotal)}
                    </p>
                  </div>
                  <button
                    className="btn border-secondary rounded-pill px-4 py-3 text-primary text-uppercase mb-4 ms-4"
                    type="button"
                    onClick={()=>navigate('/checkout')}
                  >
                    Proceed Checkout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* <!-- Cart Page End --> */}
    </>
  );
};

export default Cart;
