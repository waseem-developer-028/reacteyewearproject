import React from "react";
import { showImage, showPrice } from "../utils/helper";
import { Link } from "react-router-dom";

const ProductCard = ({ product, classNames = "col-md-6 col-lg-4 col-xl-3", blank=false }) => {
  const { id, name = "", image = "", information = "", price = 0 } = product;
  return (
    <div className={classNames}>
      <div className="rounded position-relative fruite-item border border-secondary">
        <div className="fruite-img">
          <img
            src={showImage(image)}
            className="img-fluid w-100 rounded-top"
            alt=""
          />
        </div>
        <div
          className="text-white bg-secondary px-3 py-1 rounded position-absolute"
          style={{ top: "10px", left: "10px" }}
        >
          Sale
        </div>
        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
          <h4>{name}</h4>
          <p>{information?.slice(0, 226)}.</p>
          <div className="d-flex justify-content-between flex-lg-wrap">
            <p className="text-dark fs-5 fw-bold mb-0">₹{showPrice(price)}</p>
            {
              blank ?
              <Link
              to={`/shop/${id}`}
              target="_blank"
              className="btn border border-secondary rounded-pill px-3 text-primary"
            >
              <i className="fa fa-shopping-bag me-2 text-primary"></i>
              Add to cart
            </Link>
              :
              <Link
              to={`/shop/${id}`}
              className="btn border border-secondary rounded-pill px-3 text-primary"
            >
              <i className="fa fa-shopping-bag me-2 text-primary"></i>
              Add to cart
            </Link>
            }
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
