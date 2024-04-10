import React from "react";
import "../css/Pagination.css";


const Pagination = ({ totalCount, pageSize, currentPage, setCurrentPage }) => {
  const pages = Math.ceil(totalCount / pageSize);

  const goToNextPage = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(pages);
  };

  return (
    <div className="pagination-container">
      <button onClick={goToFirstPage} className="pagination-button">
        {"<<"}
      </button>
      <button onClick={goToPrevPage} className="pagination-button">
        {"<"}
      </button>
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i + 1}
          onClick={() => setCurrentPage(i + 1)}
          className={`pagination-button ${
            currentPage === i + 1 ? "active" : ""
          }`}
        >
          {i + 1}
        </button>
      ))}
      <button onClick={goToNextPage} className="pagination-button">
        {">"}
      </button>
      <button onClick={goToLastPage} className="pagination-button">
        {">>"}
      </button>
    </div>
  );
};

export default Pagination;