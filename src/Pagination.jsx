import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    // Always show first page
    pages.push(1);
    
    // Calculate range of pages to show around current page
    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // If we're at the start, show more pages after
    if (currentPage <= 2) {
      endPage = Math.min(totalPages - 1, 4);
    }
    
    // If we're at the end, show more pages before
    if (currentPage >= totalPages - 1) {
      startPage = Math.max(2, totalPages - 3);
    }
    
    // Add "..." before middle pages if needed
    if (startPage > 2) {
      pages.push("...");
    }
    
    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add "..." after middle pages if needed
    if (endPage < totalPages - 1) {
      pages.push("...");
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  // Handle page changes
  const handlePageChange = (page) => {
    // Don't do anything if clicking on current page or ellipsis
    if (page === currentPage || page === "...") return;
    
    // Set new page
    setCurrentPage(page);
    
    // Scroll to top of results
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Handle next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Don't show pagination if only one page
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        className="page-btn prev"
        onClick={goToPrevPage}
        disabled={currentPage === 1}
        aria-label="Previous page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      <div className="page-numbers">
        {getPageNumbers().map((page, index) => (
          <motion.button
            key={`${page}-${index}`}
            className={`page-btn ${page === currentPage ? "active" : ""} ${
              page === "..." ? "disabled" : ""
            }`}
            onClick={() => handlePageChange(page)}
            whileHover={page !== "..." ? { scale: 1.1 } : {}}
            whileTap={page !== "..." ? { scale: 0.95 } : {}}
            disabled={page === "..."}
          >
            {page}
          </motion.button>
        ))}
      </div>

      <button
        className="page-btn next"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        aria-label="Next page"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired
};

export default Pagination; 