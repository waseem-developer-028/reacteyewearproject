import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import PageLoader from "../components/PageLoader";
import { toast } from "react-toastify";
import axios from "axios";
import NoData from "../components/NoData";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [contentLoader, setContentLoader] = useState(false);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/category");
      const data = res?.data;
      if (data?.success) {
        setCategories(data?.data);
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const getProducts = async () => {
    setContentLoader(true);
    try {
      const res = await axios.get(`/homeproducts?category=${activeCategory}`);
      const data = res?.data;
      if (data?.success) {
        setProducts(data?.data);
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
    fetchCategories();
  }, []);

  useEffect(() => {
    getProducts();
  }, [activeCategory]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {/* <!-- Hero Start --> */}
      <div className="container-fluid py-5 mb-5 hero-header">
        <div className="container py-5">
          <div className="row g-5 align-items-center">
            <div className="col-md-12 col-lg-12">
              <div
                id="carouselId"
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-inner" role="listbox">
                  <div className="carousel-item active rounded">
                    <img
                      src="/image/banner1.jpg"
                      className="img-fluid w-100 h-100 bg-secondary rounded"
                      alt="First slide"
                    />
                    <Link href="#" className="btn px-4 py-2 text-white rounded">
                      Eyewear
                    </Link>
                  </div>
                  <div className="carousel-item rounded">
                    <img
                      src="/image/banner2.jpg"
                      className="img-fluid w-100 h-100 rounded"
                      alt="Second slide"
                    />
                    <Link href="#" className="btn px-4 py-2 text-white rounded">
                      For Everyone
                    </Link>
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselId"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Hero End --> */}
      {/* <!-- Shop Start--> */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-4 text-start">
                <h1 className="d-inline-block border-bottom border-4 border-primary pb-2">
                  Featured Products
                </h1>
              </div>
              <div className="col-lg-8 text-end">
                <ul className="nav nav-pills d-inline-flex text-center mb-5">
                  <li className="nav-item">
                    <Link
                      className={`d-flex m-2 py-2 bg-light rounded-pill ${
                        activeCategory === "all" ? "active" : ""
                      }`}
                      data-bs-toggle="pill"
                      href="#tab-1"
                      onClick={() => setActiveCategory("all")}
                    >
                      <span className="text-dark" style={{ width: "130px" }}>
                        All
                      </span>
                    </Link>
                  </li>
                  {categories?.map((cat) => (
                    <li className="nav-item" key={cat?.id}>
                      <Link
                        className={`d-flex m-2 py-2 bg-light rounded-pill ${
                          activeCategory === cat?.id ? "active" : ""
                        }`}
                        data-bs-toggle="pill"
                        href="#tab-2"
                        onClick={() => setActiveCategory(cat?.id)}
                      >
                        <span className="text-dark" style={{ width: "130px" }}>
                          {cat?.name}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="tab-content">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {products?.length ? (
                        <>
                          {contentLoader ? (
                            <Loader />
                          ) : (
                            products?.map((product) => (
                              <ProductCard
                                product={product}
                                key={product?.id}
                              />
                            ))
                          )}
                        </>
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
      </div>
      {/* <!-- Shop End--> */}
    </>
  );
};

export default Home;
