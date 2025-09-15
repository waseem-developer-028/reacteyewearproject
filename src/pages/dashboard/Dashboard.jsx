import React from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const activeiConClass = (path, icon='fa fa-map-marker-alt') => {
    let base = `${icon} me-2 `;
    if (path === pathname) {
      base += "text-primary";
    } else {
      base += "text-dark";
    }
    return base;
  };

  const activeNavClass = (path) => {
    let base = `form-check-label fw-bold fs-5 `;
    if (path === pathname) {
      base += "text-primary";
    } else {
      base += "text-dark";
    }
    return base;
  };

  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner3.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Dashboard</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Dashboard</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}
      <div className="container-fluid py-5">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-2">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="mb-3">
                    <h4 className="mb-4">
                      <i className="fa fa-home text-primary"></i>&nbsp;Dashboard
                    </h4>
                    <div className="d-flex flex-column gap-3">
                      <div
                        className="form-check d-flex align-items-center"
                        onClick={() => navigate("address", 'fa fa-map-marker-alt')}
                      >
                        <i
                          className={activeiConClass("/dashboard/address")}
                        ></i>
                        <label
                          className={activeNavClass("/dashboard/address")}
                          htmlFor="priceAll"
                          style={{ cursor: "pointer" }}
                        >
                          Address
                        </label>
                      </div>
                      <div
                        className="form-check d-flex align-items-center"
                        onClick={() => navigate("notification")}
                      >
                        <i className={activeiConClass("/dashboard/notification", 'fa fa-bell')}></i>
                        <label
                          className={activeNavClass("/dashboard/notification")}
                          htmlFor="priceLowHigh"
                          style={{ cursor: "pointer" }}
                        >
                          Notification
                        </label>
                      </div>
                      <div
                        className="form-check d-flex align-items-center"
                        onClick={() => navigate("order", 'fa fa-shopping-bag')}
                      >
                        <i className={activeiConClass("/dashboard/order")}></i>
                        <label
                          className={activeNavClass("/dashboard/order")}
                          htmlFor="priceHighLow"
                          style={{ cursor: "pointer" }}
                        >
                          Orders
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-10">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
