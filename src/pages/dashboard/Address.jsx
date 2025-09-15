import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NoData from "../../components/NoData";
import PageLoader from "../../components/PageLoader";
import Loader from "../../components/Loader";
import { getUserAccount } from "../../utils/helper";
import { setSelectedAddress } from "../../redux/appSlice";
import { useDispatch } from "react-redux";

const Address = () => {
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const user = getUserAccount();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserAddress = async (loading = false) => {
    setContentLoader(loading);
    try {
      const res = await axios.get(`/address?user_id=${user?.id}`);
      const data = res?.data;
      if (data?.success) {
        setAddressData(data?.data);
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
    fetchUserAddress();
  }, []);

  const deleteAddress = async (id) => {
    if (confirm("Are you sure delete this address?")) {
      setContentLoader(true);
      try {
        const res = await axios.delete(`/address/${id}`);
        const data = res?.data;
        if (data?.success) {
          toast.success(data?.message);
          fetchUserAddress(true);
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

  return (
    <>
      <div className="table-responsive">
        <div className="d-flex justify-content-end mb-3">
          <Link
            onClick={() => {
              dispatch(setSelectedAddress({}));
              navigate("/dashboard/save-edit-address");
            }}
            className="btn btn-primary rounded-pill px-4 py-2 fw-bold text-white"
          >
            <i className="fa fa-plus me-2"></i>Add Address
          </Link>
        </div>
        {contentLoader ? (
          <Loader />
        ) : (
          <>
            {addressData?.length ? (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Type</th>
                    <th scope="col">Full Address</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {addressData?.map((ads) => (
                    <tr key={ads?.id}>
                      <td>
                        <p className="mb-0 mt-4">{ads?.address_type}</p>
                      </td>
                      <td>
                        <p className="mb-0 mt-4">
                          {ads?.address}, {ads?.street}, {ads?.landmark},{" "}
                          {ads?.city}, {ads?.state}, {ads?.country},{" "}
                          {ads?.zipcode}
                        </p>
                      </td>
                      <td className="text-center align-middle">
                        <Link
                          onClick={() => {
                            dispatch(setSelectedAddress(ads));
                            navigate("/dashboard/save-edit-address");
                          }}
                          className="btn btn-outline-primary btn-sm rounded-circle me-2"
                          title="Edit"
                        >
                          <i className="fa fa-edit"></i>
                        </Link>
                        <Link
                          onClick={() => deleteAddress(ads?.id)}
                          className="btn btn-outline-danger btn-sm rounded-circle"
                          title="Delete"
                        >
                          <i className="fa fa-trash"></i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <NoData />
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Address;
