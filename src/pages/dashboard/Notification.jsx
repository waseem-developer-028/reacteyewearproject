import React, { useEffect, useState } from "react";
import PageLoader from "../../components/PageLoader";
import { toast } from "react-toastify";
import axios from "axios";
import NoData from "../../components/NoData";
import { showNotifiDate } from "../../utils/helper";

const Notification = () => {
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 0,
    total: 0,
    lastPage: 0,
  });
  const fetchNotifications = async (page = 1) => {
    setContentLoader(true);
    try {
      const res = await axios.get(`/notifications?page=${page}`);
      const data = res?.data;
      if (data?.success) {
        setNotifications([...notifications, ...data.data.data]);
        setPagination({
          page: page,
          limit: res?.data?.data?.limit,
          total: res?.data?.data?.data?.itemCount,
          lastPage: res?.data?.data?.last_page,
        });
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
    fetchNotifications();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="container py-4">
      <h4 className="mb-4 fw-bold text-primary">
        <i className="fa fa-bell text-primary"></i> Notifications
      </h4>
      {notifications?.length ? (
        <div className="list-group">
          {notifications?.map((notifi) => (
            <div
              className="list-group-item d-flex align-items-center justify-content-between py-3 border-0 border-bottom"
              key={notifi?._id}
            >
              <div className="d-flex align-items-center">
                <img
                  src="/image/noti-placeholder.png"
                  alt="User"
                  className="rounded-circle me-3"
                  style={{ width: "48px", height: "48px" }}
                />
                <div>
                  <div className="fw-bold text-dark">{notifi?.body}</div>
                  <div className="text-secondary small fw-bold">
                    {notifi?.title}
                  </div>
                </div>
              </div>
              <div
                className="text-primary small fw-bold"
                style={{ minWidth: "120px" }}
              >
                {showNotifiDate(notifi?.createdAt)}
              </div>
            </div>
          ))}
          {pagination?.page < pagination?.lastPage && (
            <button
              className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-white mt-5 fs-5"
              disabled={contentLoader}
              onClick={() => {
                fetchNotifications(pagination?.page + 1);
              }}
            >
              <i className="fa fa-spinner me-2 text-white"></i>Load More
            </button>
          )}
        </div>
      ) : (
        <NoData />
      )}
    </div>
  );
};

export default Notification;
