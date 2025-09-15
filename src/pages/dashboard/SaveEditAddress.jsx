import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { saveEditAddressSchema } from "../../validationSchema";
import { toast } from "react-toastify";
import axios from "axios";
import { getUserAccount } from "../../utils/helper";
import { useSelector } from "react-redux";
import { setSelectedAddress } from "../../redux/appSlice";
import { useDispatch } from "react-redux";

const SaveEditAddress = () => {
  const navigate = useNavigate();
  const { selectedAddress } = useSelector((state) => state.appSlice);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(saveEditAddressSchema),
  });
  const user = getUserAccount();

  useEffect(() => {
    if (selectedAddress?.id) {
      reset({
        id: selectedAddress?.id,
        user_id: selectedAddress?.user_id,
        street: selectedAddress?.street,
        address_type: selectedAddress?.address_type,
        address: selectedAddress?.address,
        landmark: selectedAddress?.landmark,
        city: selectedAddress?.city,
        state: selectedAddress?.state,
        zipcode: selectedAddress?.zipcode,
      });
    }
  }, []);

  const handleSaveAddress = async (formData) => {
    setLoading(true);
    if (!selectedAddress?.id) {
      formData = {
        ...formData,
        id: null,
        user_id: user?.id,
      };
    }
    try {
      const url = selectedAddress?.id
        ? axios.put(`/address/${selectedAddress?.id}`, formData)
        : axios.post( "/address/add", formData);
      const res = await url;
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        if (selectedAddress?.id) {
          dispatch(setSelectedAddress({}));
        }
        navigate("/dashboard/address");
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
    let baseClass = "form-control rounded-pill bg-light border-0 py-3 px-4 ";
    if (errors[name]) {
      baseClass += "error";
    }
    return baseClass;
  };

  return (
    <div className="table-responsive">
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="text-primary mb-0">
            {selectedAddress?.id ? "Edit Address" : "Save Address"}
          </h3>
        </div>
        <hr />
        <form onSubmit={handleSubmit(handleSaveAddress)}>
          <div className="row g-3">
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Enter Address Type"
                {...register("address_type")}
                className={inputClass("address_type")}
              />
              {errors.address_type && (
                <p className="text-danger">{errors.address_type.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Enter Street Name"
                {...register("street")}
                className={inputClass("street")}
              />
              {errors.street && (
                <p className="text-danger">{errors.street.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Enter Address"
                {...register("address")}
                className={inputClass("address")}
              />
              {errors.address && (
                <p className="text-danger">{errors.address.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Enter Landmark"
                {...register("landmark")}
                className={inputClass("landmark")}
              />
              {errors.landmark && (
                <p className="text-danger">{errors.landmark.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Enter City Name"
                {...register("city")}
                className={inputClass("city")}
              />
              {errors.city && (
                <p className="text-danger">{errors.city.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="text"
                placeholder="Enter State Name"
                {...register("state")}
                className={inputClass("state")}
              />
              {errors.state && (
                <p className="text-danger">{errors.state.message}</p>
              )}
            </div>
            <div className="col-md-6">
              <input
                type="number"
                placeholder="Enter ZipCode"
                {...register("zipcode")}
                className={inputClass("zipcode")}
              />
              {errors.zipcode && (
                <p className="text-danger">{errors.zipcode.message}</p>
              )}
            </div>
          </div>
          <div className="d-flex justify-content-end mt-4 gap-3">
            <button
              type="button"
              className="btn btn-secondary text-white border-0 border-secondary rounded-pill px-5 py-2 fw-bold"
              onClick={() => navigate("/dashboard/address")}
            >
              <i className="fa fa-arrow-left me-2"></i>Back
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary rounded-pill text-white border-0 border-secondary px-5 py-2 fw-bold"
            >
              <i className="fa fa-save me-2"></i>
              {selectedAddress?.id ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaveEditAddress;
