import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { showImage, showPrice } from "../../utils/helper";
import Loader from "../../components/Loader";
import PageLoader from "../../components/PageLoader";
import NoData from "../../components/NoData";
import ProductCard from "../../components/ProductCard";
import PaginationCmp from "../../components/PaginationCmp";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [contentLoader, setContentLoader] = useState(false);
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 0,
    total: 0,
    lastPage: 1,
  });
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [filter, setFilter] = useState("");

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
    }
  };

  const fetchLatestProducts = async () => {
    try {
      const res = await axios.get("/latestproducts");
      const data = res?.data;
      if (data?.success) {
        setLatestProducts(data?.data);
      } else {
        toast.warning(data?.message);
      }
    } catch (e) {
      toast.error(e.message);
    }
  };

  const fetchProducts = async (page = 1, reset = false) => {
    let filterData = {
      price: selectedPrice,
      categories: selectedCategories,
      rating: selectedRatings,
    };
    if (reset) {
      filterData = {
        price: null,
        categories: [],
        rating: [],
      };
    }
    setContentLoader(true);
    try {
      const res = await axios.post(`/products?page=${page}`, filterData);
      const data = res?.data;
      if (data?.success) {
        setProducts(data?.data?.docs);
        setPagination({
          page: data?.data?.page,
          limit: data?.data?.limit,
          total: data?.data?.total,
          lastPage: data?.data?.lastPage,
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
    fetchCategories();
    fetchLatestProducts();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (
      selectedCategories.length ||
      selectedRatings.length ||
      selectedPrice !== null
    ) {
      setFilter(true);
    }
  }, [selectedCategories, selectedRatings, selectedPrice]);

  const handleFilteredProducts = async () => {
    setProducts([]);
    setPagination({});
    await fetchProducts();
    setFilter(false);
  };

  const clearAllFilters = async () => {
    setProducts([]);
    setPagination({});
    setSelectedPrice(null);
    setSelectedCategories([]);
    setSelectedRatings([]);
    setFilter("");
    await fetchProducts(1, true);
  };

  const handleSelectedCategories = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategories((prev) => [...prev, value]);
    } else {
      setSelectedCategories((prev) => prev?.filter((item) => item !== value));
    }
  };

  const handleSelectedRatings = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedRatings((prev) => [...prev, value]);
    } else {
      setSelectedRatings((prev) => prev?.filter((item) => item !== value));
    }
  };

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner3.jpg')" }}
      >
        <h1 className="text-center text-white display-6">Shop</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">Shop</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}
      <div className="container-fluid fruite py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-12">
              <div className="row g-4">
                <div className="col-lg-3">
                  <div className="row g-4">
                    <div className="col-lg-12">
                      <div className="mb-3">
                        {filter && (
                          <button
                            className="btn border btn-primary  px-3 text-white"
                            onClick={handleFilteredProducts}
                          >
                            Apply filter
                          </button>
                        )}
                        {filter === false && (
                          <button
                            className="btn border btn-secondary  px-3 text-white"
                            onClick={clearAllFilters}
                          >
                            Clear filter
                          </button>
                        )}
                      </div>
                      <div className="mb-3">
                        <h4>Categories</h4>
                        <ul className="list-unstyled fruite-categorie">
                          {categories?.length > 0 &&
                            categories?.map((cat) => (
                              <li key={cat?.id}>
                                <div className="d-flex gap-3 align-items-center fruite-name">
                                  <input
                                    type="checkbox"
                                    className="form-check-input border-primary"
                                    id="cat1"
                                    value={cat?.id}
                                    defaultChecked={selectedCategories?.includes(
                                      cat?.id
                                    )}
                                    onChange={handleSelectedCategories}
                                  />
                                  <label
                                    htmlFor="cat1"
                                    className="form-check-label text-primary fw-bold"
                                    style={{ cursor: "pointer" }}
                                  >
                                    {cat?.name}
                                  </label>
                                </div>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4 className="mb-2">Price</h4>
                        <div className="d-flex flex-column gap-3">
                          <div className="form-check">
                            <input
                              className="form-check-input border-primary"
                              type="radio"
                              name="priceSort"
                              id="priceAll"
                              defaultChecked={selectedPrice === null && filter !== ""}
                              onClick={() => setSelectedPrice(null)}
                            />
                            <label
                              className="form-check-label text-primary fw-bold cursor-po"
                              htmlFor="priceAll"
                              style={{ cursor: "pointer" }}
                            >
                              ALL
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input border-primary"
                              type="radio"
                              name="priceSort"
                              id="priceLowHigh"
                              defaultChecked={selectedPrice === "ASC"}
                              onClick={() => setSelectedPrice("ASC")}
                            />
                            <label
                              className="form-check-label text-primary fw-bold"
                              htmlFor="priceLowHigh"
                              style={{ cursor: "pointer" }}
                            >
                              LOW TO HIGH
                            </label>
                          </div>
                          <div className="form-check">
                            <input
                              className="form-check-input border-primary"
                              type="radio"
                              name="priceSort"
                              id="priceHighLow"
                              defaultChecked={selectedPrice === "DESC"}
                              onClick={() => setSelectedPrice("DESC")}
                            />
                            <label
                              className="form-check-label text-primary fw-bold"
                              htmlFor="priceHighLow"
                              style={{ cursor: "pointer" }}
                            >
                              HIGH TO LOW
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="mb-3">
                        <h4 className="mb-3">Customer Reviews</h4>
                        <ul className="list-unstyled">
                          <li className="d-flex align-items-center mb-2">
                            <input
                              type="checkbox"
                              className="form-check-input border-primary me-2"
                              id="star5"
                              value="5"
                              defaultChecked={selectedRatings?.includes("5")}
                              onChange={handleSelectedRatings}
                            />
                            <label
                              htmlFor="star5"
                              className="d-flex align-items-center"
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                              </span>
                              <span className="ms-2 text-secondary fw-bold">
                                5.0
                              </span>
                            </label>
                          </li>
                          <li className="d-flex align-items-center mb-2">
                            <input
                              type="checkbox"
                              className="form-check-input border-primary me-2"
                              id="star4"
                              value="4"
                              defaultChecked={selectedRatings?.includes("4")}
                              onChange={handleSelectedRatings}
                            />
                            <label
                              htmlFor="star4"
                              className="d-flex align-items-center"
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                              </span>
                              <span className="ms-2 text-secondary fw-bold">
                                4.0
                              </span>
                            </label>
                          </li>
                          <li className="d-flex align-items-center mb-2">
                            <input
                              type="checkbox"
                              className="form-check-input border-primary me-2"
                              id="star3"
                              value="3"
                              defaultChecked={selectedRatings?.includes("3")}
                              onChange={handleSelectedRatings}
                            />
                            <label
                              htmlFor="star3"
                              className="d-flex align-items-center"
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                              </span>
                              <span className="ms-2 text-secondary fw-bold">
                                3.0
                              </span>
                            </label>
                          </li>
                          <li className="d-flex align-items-center mb-2">
                            <input
                              type="checkbox"
                              className="form-check-input border-primary me-2"
                              id="star2"
                              value="2"
                              defaultChecked={selectedRatings?.includes("2")}
                              onChange={handleSelectedRatings}
                            />
                            <label
                              htmlFor="star2"
                              className="d-flex align-items-center"
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <i className="fa fa-star text-primary"></i>
                                <i className="fa fa-star text-primary"></i>
                              </span>
                              <span className="ms-2 text-secondary fw-bold">
                                2.0
                              </span>
                            </label>
                          </li>
                          <li className="d-flex align-items-center mb-2">
                            <input
                              type="checkbox"
                              className="form-check-input border-primary me-2"
                              id="star1"
                              value="1"
                              defaultChecked={selectedRatings?.includes("1")}
                              onChange={handleSelectedRatings}
                            />
                            <label
                              htmlFor="star1"
                              className="d-flex align-items-center"
                              style={{ cursor: "pointer" }}
                            >
                              <span>
                                <i className="fa fa-star text-primary"></i>
                              </span>
                              <span className="ms-2 text-secondary fw-bold">
                                1.0
                              </span>
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <h4 className="mb-3">Latest products</h4>
                      {latestProducts?.length > 1 &&
                        latestProducts?.map((ltPrd) => (
                          <div
                            className="d-flex align-items-center justify-content-start"
                            key={ltPrd?.id}
                          >
                            <div
                              className="rounded me-4"
                              style={{ width: "100px", height: "100px" }}
                            >
                              <img
                                src={showImage(ltPrd?.image)}
                                className="img-fluid rounded"
                                alt=""
                              />
                            </div>
                            <div>
                              <h6 className="mb-2">{ltPrd?.name}</h6>

                              <div className="d-flex mb-2">
                                <h5 className="fw-bold me-2">
                                  {showPrice(ltPrd?.price)} ₹
                                </h5>
                                <h5 className="text-danger text-decoration-line-through">
                                  {showPrice(ltPrd?.price + 100)} ₹
                                </h5>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
                <div className="col-lg-9">
                  <div className="row g-4 justify-content-center">
                    {products?.length ? (
                      <>
                        {contentLoader ? (
                          <Loader />
                        ) : (
                          products?.map((product) => (
                            <ProductCard
                              product={product}
                              classNames="col-md-6 col-lg-4 col-xl-4"
                              key={product?.id}
                            />
                          ))
                        )}
                      </>
                    ) : (
                      <>
                        {contentLoader ? (
                          <Loader />
                        ) : (
                          <NoData imgSrc="/image/noproduct.png" />
                        )}
                      </>
                    )}
                    {!loading && !contentLoader && (
                      <PaginationCmp
                        pagination={pagination}
                        setPagination={setPagination}
                        fetchData={fetchProducts}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
