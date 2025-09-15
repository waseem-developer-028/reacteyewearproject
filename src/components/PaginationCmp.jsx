import React from "react";
import { Link } from "react-router-dom";

const PaginationCmp = ({ pagination, setPagination, fetchData }) => {
  const pages = Array.from({ length: pagination?.lastPage }, (_, i) => i + 1);

  const backToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  const handlePrevious = () => {
    const newPagination = {
      ...pagination,
    };

    if (newPagination?.page > 1) {
      newPagination.page = newPagination?.page - 1;
      setPagination(newPagination);
      fetchData(newPagination?.page);
      backToTop();
    }
  };

  const handleNext = () => {
    const newPagination = {
      ...pagination,
    };

    if (newPagination?.page < newPagination?.lastPage) {
      newPagination.page = newPagination?.page + 1;
      setPagination(newPagination);
      fetchData(newPagination?.page);
      backToTop();
    }
  };

  const handlePage = (page) => {
    const newPagination = {
      ...pagination,
    };

    newPagination.page = page;
    setPagination(newPagination);
    fetchData(newPagination?.page);
    backToTop();
  };

  return (
    pagination?.lastPage > 1 && (
      <div className="col-12">
        <div className="pagination d-flex justify-content-center mt-5">
          {pagination?.page > 1 && (
            <Link onClick={handlePrevious} className="rounded">
              &laquo;
            </Link>
          )}

          {pages?.map((page) => (
            <Link
              key={page}
              onClick={() => handlePage(page)}
              className={`${pagination?.page === page ? "active" : ""} rounded`}
            >
              {page}
            </Link>
          ))}
          {pagination?.page < pagination?.lastPage && (
            <Link onClick={handleNext} className="rounded">
              &raquo;
            </Link>
          )}
        </div>
      </div>
    )
  );
};

export default PaginationCmp;
