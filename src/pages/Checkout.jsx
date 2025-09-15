import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";
import Loader from "../components/Loader";
import { getUserAccount, showImage, showPrice } from "../utils/helper";
import NoData from "../components/NoData";

const Checkout = () => {
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [checkoutInfo, setCheckoutInfo] = useState({});
  const [deliverCharge, setDeliveryCharge] = useState(0);
  const [notes, setNotes] = useState("");
  const [addressId, setAddressId] = useState("");
  const navigate = useNavigate();
  const user = getUserAccount();

  const fetchCheckoutInfo = async () => {
    try {
      const res = await axios.get(`/getcheckoutinfo?user_id=${user?.id}`);
      const data = res?.data;
      if (data?.success) {
        if (data?.data?.cart < 1) {
          toast.warning("Your is empty. Add item in cart");
          navigate("/shop");
        } else if (data?.data?.address?.length < 1) {
          toast.warning("Please add an address before checkout");
          navigate("/dashboard/address");
        }
        setCheckoutInfo(data?.data);
        const cartTotal = data?.data?.cart?.reduce((prev, cur) => {
          return prev + cur?.price * cur?.quantity;
        }, 0);
        const delivery = await axios.post("/deliverycharge", {
          total_amount: cartTotal,
        });
        setDeliveryCharge(Number(delivery?.data?.data) || 0);
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCheckoutInfo();
  }, []);

  const placeOrder = async () => {
    if (addressId.trim() === "") {
      toast.error("Please select  address");
      return false;
    }

    if (notes.trim() === "") {
      toast.error("Please enter your notes");
      return false;
    }
    setContentLoader(true);
    try {
      const checkOrder = await axios.post("checkorder", {
        user_id: user?.id,
      });
      if (checkOrder?.data?.success) {
        const res = await axios.post("/placeorder", {
          user_id: user?.id,
          payment_method: "stripe",
          web_url: import.meta.env.VITE_WEB_URL + "/dashboard/order",
          notes: notes,
          address_id: addressId,
        });
        const data = res?.data;
        if (data?.success) {
          if (data?.data?.sessionUrl) {
            window.location.href = data?.data?.sessionUrl;
          } else {
            toast.warning(data?.message);
          }
        } else {
          toast.warning(data?.message);
        }
      } else {
        toast.warning(checkOrder?.data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setContentLoader(false);
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  const subTotal = checkoutInfo.cart?.reduce((prev, cur) => {
    return prev + cur?.price * cur?.quantity;
  }, 0);

  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner4.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Checkout</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Checkout</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}

      {checkoutInfo?.cart?.length ? (
        <>
          {/* <!-- Checkout Page Start --> */}
          <div className="container-fluid py-5">
            <div className="container py-5">
              <h1 className="mb-4 text-center">Checkout</h1>
              <hr className="w-25 mx-auto mb-5 border border-secondary" />
              <form action="#">
                <div className="row g-5 justify-content-center align-items-center">
                  <div className="col-md-12 col-lg-8 col-xl-7">
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Products</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {checkoutInfo?.cart?.map((cart) => (
                            <tr key={cart?.id}>
                              <th scope="row">
                                <div className="d-flex align-items-center mt-2">
                                  <img
                                    src={showImage(cart?.image)}
                                    className="img-fluid rounded-circle"
                                    style={{ width: "90px", height: "90px" }}
                                    alt=""
                                  />
                                </div>
                              </th>
                              <td className="py-5">{cart?.name}</td>
                              <td className="py-5">
                                ₹{showPrice(cart?.price)}
                              </td>
                              <td className="py-5">{cart?.quantity}</td>
                              <td className="py-5">
                                ₹{showPrice(cart?.price * cart?.quantity)}
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <th scope="row"></th>
                            <td className="py-5"></td>
                            <td className="py-5"></td>
                            <td className="py-5">
                              <p className="mb-0 text-dark py-3">Subtotal</p>
                            </td>
                            <td className="py-5">
                              <div className="py-3 border-bottom border-top">
                                <p className="mb-0 text-dark">
                                  ₹{showPrice(subTotal)}
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row"></th>
                            <td className="py-5"></td>
                            <td className="py-5"></td>
                            <td className="py-5">
                              <p className="mb-0 text-dark py-3">Delivery Fee</p>
                            </td>
                            <td className="py-5">
                              <div className="py-3 border-bottom border-top">
                                <p className="mb-0 text-dark">
                                  ₹{showPrice(deliverCharge)}
                                </p>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <th scope="row"></th>
                            <td className="py-5">
                              <p className="mb-0 text-dark text-uppercase py-3">
                                TOTAL
                              </p>
                            </td>
                            <td className="py-5"></td>
                            <td className="py-5"></td>
                            <td className="py-5">
                              <div className="py-3 border-bottom border-top">
                                <p className="mb-0 text-dark">
                                  ₹{showPrice(subTotal + deliverCharge)}
                                </p>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <div className="mb-4">
                      <select
                        className="form-select rounded-pill bg-light border-0 py-3 px-4 mb-3"
                        style={{ fontSize: "1.2rem" }}
                        onChange={(e) => setAddressId(e.target.value)}
                      >
                        <option  value="">
                          Select Address
                        </option>
                        {checkoutInfo?.address?.map((ads) => (
                          <option value={ads?.id} key={ads?.id}>
                            {ads?.address_type}
                          </option>
                        ))}
                      </select>
                      <label className="fw-bold text-primary mb-2">
                        ADD NOTES FOR ORDERS
                      </label>
                      <textarea
                        className="form-control rounded-pill bg-light border-0 py-3 px-4"
                        rows="2"
                        placeholder="Enter note here"
                        style={{ resize: "none", fontSize: "1.1rem" }}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>

                    <div className="row g-4 text-center align-items-center justify-content-center pt-4">
                      <button
                        type="button"
                        className="btn border-secondary py-3 px-4 text-uppercase w-100 text-primary"
                        disabled={contentLoader}
                        onClick={placeOrder}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {/* <!-- Checkout Page End --> */}
        </>
      ) : (
        <NoData />
      )}
    </>
  );
};

export default Checkout;
