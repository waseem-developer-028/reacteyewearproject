import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import PageLoader from "../../components/PageLoader";
import NoData from "../../components/NoData";
import ProductCard from "../../components/ProductCard";
import {
  showImage,
  showPrice,
  isLoggedIn,
  getUserAccount,
} from "../../utils/helper";

const ShopDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [product, setProduct] = useState({});
   const user = getUserAccount();

  const fetchProductDetails = async () => {
    try {
      const res = await axios.get(
        `/productdetail?product_id=${id}&user_id=${user?.id}`
      );
      const data = res?.data;
      if (data?.success) {
        setProduct(data?.data);
      } else if (!data?.success && data?.status === 405) {
        navigate("/404");
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
    setContentLoader(true);
    try {
      const res = await axios.post("/carts", {
        user_id: user?.id,
        product_id: id,
        quantity: 1,
      });
      const data = res?.data;
      if (data?.success) {
        toast.success(data?.message);
        navigate("/cart");
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setContentLoader(false);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, []);

  if (loading) {
    return <PageLoader />;
  }
  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner4.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Product Details</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Product Details</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}
      {/* <!-- Single Product Start --> */}
      <div className="container-fluid py-5 mt-5">
        <div className="container py-5">
          <div className="row g-4 mb-5">
            <div className="col-lg-12 col-xl-12">
              <div className="row g-4">
                <div className="col-lg-6">
                  <div className="border rounded">
                    <Link href="#">
                      <img
                        src={showImage(product?.product?.image)}
                        className="img-fluid rounded"
                        alt="Image"
                      />
                    </Link>
                  </div>
                </div>
                <div className="col-lg-6">
                  <h4 className="fw-bold mb-3">{product?.product?.name}</h4>
                  <h5 className="fw-bold mb-3">
                    {showPrice(product?.product?.price)} ₹
                  </h5>
                  <div className="d-flex align-items-center gap-2 mb-3">
                    <span className="text-primary fw-bold fs-5">
                      {product?.extra?.avg_rating}
                    </span>
                    {[1, 2, 3, 4, 5]?.map((rating) => (
                      <i key={rating}
                        className={`fa fa-star ${
                          rating <= product?.extra?.avg_rating
                            ? "text-primary"
                            : ""
                        }`}
                      ></i>
                    ))}

                    <span className="ms-2 text-dark fw-bold">
                      ({product?.extra?.reviewsCount} reviews)
                    </span>
                  </div>
                  <p className="mb-4">{product?.extra?.top_information}</p>
                  {product?.extra?.isCart ? (
                    <button
                      onClick={()=>navigate('/cart')}
                      className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                      Go to cart
                    </button>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="btn border border-secondary rounded-pill px-4 py-2 mb-4 text-primary"
                      disabled={contentLoader}
                    >
                      <i className="fa fa-shopping-bag me-2 text-primary"></i>{" "}
                      Add to cart
                    </button>
                  )}
                </div>
                <div className="col-lg-12">
                  <nav>
                    <div className="nav nav-tabs mb-3">
                      <button
                        className="nav-link active border-white border-bottom-0"
                        type="button"
                        role="tab"
                        id="nav-about-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#nav-about"
                        aria-controls="nav-about"
                        aria-selected="true"
                      >
                        Description
                      </button>
                    </div>
                  </nav>
                  <div className="tab-content mb-5">
                    <div
                      className="tab-pane active"
                      id="nav-about"
                      role="tabpanel"
                      aria-labelledby="nav-about-tab"
                    >
                      <p>{product?.product?.information}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <h1 className="fw-bold mb-0 text-center d-inline-block border-bottom border-4 border-primary pb-2">
              Related products
            </h1>
          </div>
          <div className="tab-content pt-5">
            <div id="tab-1" className="tab-pane fade show p-0 active">
              <div className="row g-4">
                <div className="col-lg-12">
                  <div className="row g-4">
                    {product?.relatedProducts?.length ? (
                      product?.relatedProducts?.map((prd) => (
                        <ProductCard product={prd} key={prd?.id} blank />
                      ))
                    ) : (
                      <NoData imgSrc="/image/noproduct.png" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Single Product End --> */}
    </>
  );
};

export default ShopDetails;
