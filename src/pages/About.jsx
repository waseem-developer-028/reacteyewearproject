import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import PageLoader from "../components/PageLoader";
import NoData from "../components/NoData";
import ProductCard from "../components/ProductCard";

const About = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const res = await axios.get(`/topratedproducts`);
      const data = res?.data;
      if (data?.success) {
        setProducts(data?.data);
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
    getProducts();
  }, []);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <>
      {/* <!-- Single Page Header start --> */}
      <div
        className="container-fluid page-header py-5"
        style={{ backgroundImage: "url('/image/banner1.jpg')" }}
      >
        <h1 className="text-center text-white display-6">About Us</h1>
        <ol className="breadcrumb justify-content-center mb-0">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="#">------</Link>
          </li>
          <li className="breadcrumb-item active text-white">About Us</li>
        </ol>
      </div>
      {/* <!-- Single Page Header End -->  */}
      {/* <!-- About Start --> */}
      <div className="container-fluid testimonial py-5">
        <div className="container py-5">
          <div className="col-lg-12">
            <div className="tab-content mb-5">
              <div
                className="tab-pane active"
                id="nav-about"
                role="tabpanel"
                aria-labelledby="nav-about-tab"
              >
                <p>
                  Sed porttitor lectus nibh. Vestibulum ac diam sit amet quam
                  vehicula elementum sed sit amet dui. Curabitur non nulla sit
                  amet nisl tempus convallis quis ac lectus. Mauris blandit
                  aliquet elit, eget tincidunt nibh pulvinar a. Vivamus magna
                  justo, lacinia eget consectetur sed, convallis at tellus. Sed
                  porttitor lectus nibh. Donec sollicitudin molestie malesuada.
                  Curabitur non nulla sit amet nisl tempus convallis quis ac
                  lectus. Proin eget tortor risus. Donec rutrum congue leo eget
                  malesuada. Curabitur non nulla sit amet nisl tempus convallis
                  quis ac lectus. Donec sollicitudin molestie malesuada. Nulla
                  quis lorem ut libero malesuada feugiat. Curabitur arcu erat,
                  accumsan id imperdiet et, porttitor at sem.
                </p>
                <h3>
                  The corner window forms a place within a place that is a
                  resting point within the large space.
                </h3>
                <p>
                  The study area is located at the back with a view of the vast
                  nature. Together with the other buildings, a congruent story
                  has been managed in which the whole has a reinforcing effect
                  on the components. The use of materials seeks connection to
                  the main house, the adjacent stables
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- About End --> */}
      {/* <!-- Shop Start--> */}
      <div className="container-fluid fruite">
        <div className="container py-5">
          <div className="tab-class text-center">
            <div className="row g-4">
              <div className="col-lg-12 text-center">
                <h1 className="d-inline-block border-bottom border-4 border-primary pb-2">
                  Top Rated Products
                </h1>
              </div>
            </div>
            <div className="tab-content pt-5">
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  <div className="col-lg-12">
                    <div className="row g-4">
                      {products?.length ? (
                        products?.map((product) => (
                          <ProductCard product={product} key={product?.id} />
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
      </div>
      {/* <!-- Shop End--> */}
    </>
  );
};

export default About;
