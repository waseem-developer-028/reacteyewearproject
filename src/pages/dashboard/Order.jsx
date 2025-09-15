import React, { useEffect } from "react";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageLoader from "../../components/PageLoader";
import Loader from "../../components/Loader";
import NoData from "../../components/NoData";
import axios from "axios";
import { showImage, showPrice, getUserAccount } from "../../utils/helper";
import moment from "moment";
import PaginationCmp from "../../components/PaginationCmp";

const Order = () => {
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [orders, setOrders] = useState([]);
  const [activeOrders, setActiveOrders] = useState(1);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 0,
    total: 0,
    lastPage: 0,
  });
  const [searchParams, setSearchParams] = useSearchParams();
  const user = getUserAccount();

  useEffect(() => {
    if (searchParams.has("order_id")) {
      const newParams = new URLSearchParams();
      newParams.delete("order_id");
      setSearchParams(newParams);
      toast.success("Order Placed Sucessfully!!");
    }
  }, []);

  const fetchOrders = async (page = 1) => {
    setContentLoader(true);
    try {
      const res = await axios.get(
        `orders?page=${page}&user_id=${user?.id}&status=${activeOrders}`
      );
      if (res?.data?.success) {
        setOrders(res?.data?.data?.data);
        setPagination({
          page: res?.data?.data?.pagedata?.current_page,
          limit: res?.data?.data?.pagedata?.per_page,
          total: res?.data?.data?.pagedata?.total,
          lastPage: res?.data?.data?.pagedata?.lastPage,
        });
      } else {
        toast.warning(res?.data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setContentLoader(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [activeOrders]);

  const orderStatusFill = (status) => {
    let wid = "33%";
    switch (status) {
      case 1:
        wid = "33%";
        break;
      case 2:
        wid = "66%";
        break;
      case 3:
        wid = "100%";
        break;
      default:
        wid = "33%";
        break;
    }
    return wid;
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="table-responsive">
      <div className="d-flex justify-content-between align-items-center mb-5">
        <h3 className="text-primary mb-0">My Orders</h3>
        <div>
          <button
            className={`btn ${
              activeOrders === 1 ? "btn-primary" : "btn-secondary"
            } rounded-pill text-white border-0 border-secondary px-5 py-2 fw-bold`}
            onClick={() => setActiveOrders(1)}
          >
            Active Orders
          </button>
          <button
            className={`btn ${
              activeOrders === 3 ? "btn-primary" : "btn-secondary"
            } rounded-pill text-white border-0 border-secondary px-5 py-2 fw-bold`}
            onClick={() => setActiveOrders(3)}
          >
            Past Orders
          </button>
        </div>
      </div>
      {orders?.length ? (
        <>
          {contentLoader ? (
            <Loader />
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Products</th>
                    <th scope="col">Order ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Status</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Invoice</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.map((ord, index) => (
                    <tr key={ord?.id + "-" + index}>
                      <th scope="row">
                        <div className="d-flex align-items-center">
                          <img
                            src={showImage(ord?.product?.image)}
                            className="img-fluid me-5 rounded-circle"
                            style={{ width: "80px", height: "80px" }}
                            alt=""
                          />
                        </div>
                      </th>
                      <td>
                        <p className="mb-0 mt-4">{ord?.order_id}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">{ord?.product?.name}</p>
                      </td>
                      {/* <!-- Example for an order status column in your order table --> */}
                      <td className="text-center align-middle">
                        <div className="w-100">
                          <div
                            className="progress"
                            style={{
                              height: "6px",
                              backgroundColor: "#f2f3f5",
                            }}
                          >
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: orderStatusFill(ord?.status) }}
                            ></div>
                          </div>
                          <div className="d-flex justify-content-between align-items-center mt-2">
                            <div
                              className="text-primary text-center"
                              style={{ width: "33%" }}
                            >
                              Confirmed
                              <span
                                className="ms-1"
                                style={{ fontSize: "10px" }}
                              >
                                <i className="fa fa-circle text-primary"></i>
                              </span>
                            </div>
                            <div
                              className={`${
                                ord?.status > 1 ? "text-primary" : "text-dark"
                              } text-center`}
                              style={{ width: "33%" }}
                            >
                              Out for delivery
                              <span
                                className="ms-1"
                                style={{ fontSize: "10px" }}
                              >
                                <i
                                  className={`fa fa-circle ${
                                    ord?.status > 1
                                      ? "text-primary"
                                      : "text-dark"
                                  }`}
                                ></i>
                              </span>
                            </div>
                            <div
                              className={`${
                                ord?.status > 2 ? "text-primary" : "text-dark"
                              } text-center`}
                              style={{ width: "33%" }}
                            >
                              Delivered
                              <span
                                className="ms-1"
                                style={{ fontSize: "10px" }}
                              >
                                <i
                                  className={`fa fa-circle ${
                                    ord?.status > 2
                                      ? "text-primary"
                                      : "text-dark"
                                  }`}
                                ></i>
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {showPrice(
                            ord?.productOrders?.price *
                              ord?.productOrders?.quantity
                          )}{" "}
                          ₹
                        </p>
                      </td>
                      <td className="text-center align-middle">
                        <a
                          href={`${
                            import.meta.env.VITE_API_URL
                          }/orderinvoice?order_id=${
                            ord?.id
                          }&timezone=${moment.tz.guess(true)}&web_url=${
                            import.meta.env.VITE_WEB_URL
                          }`}
                          target="_blank"
                          className="btn btn-outline-primary btn-sm rounded-circle"
                          title="Print"
                        >
                          <i className="fa fa-print"></i>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <PaginationCmp
                pagination={pagination}
                setPagination={setPagination}
                fetchData={fetchOrders}
              />
            </>
          )}
        </>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Order;
