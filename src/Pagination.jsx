import { motion } from 'framer-motion';
import { useEffect } from 'react';

function Pagination({ currentPage, totalPages, setCurrentPage }) {
  const pageNumbers = [];
  
  // Fix: Create array for all page numbers
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  
  // Fix: Ensure current page is within bounds
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(1, totalPages));
    }
  }, [currentPage, totalPages, setCurrentPage]);
  
  // Logic to show limited page numbers with ellipsis
  let pagesToShow = [];
  
  if (totalPages <= 5) {
    pagesToShow = pageNumbers;
  } else {
    if (currentPage <= 3) {
      pagesToShow = [1, 2, 3, 4, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pagesToShow = [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    } else {
      pagesToShow = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
    }
  }
  
  return (
    <motion.div 
      className="pagination"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <motion.button 
        className="page-btn prev"
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
        whileHover={currentPage !== 1 ? { scale: 1.05, x: -3 } : {}}
        whileTap={currentPage !== 1 ? { scale: 0.95 } : {}}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="16" 
          height="16" 
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Prev
      </motion.button>
      
      {pagesToShow.map((page, index) => (
        page === '...' ? (
          <span key={`ellipsis-${index}`} className="ellipsis">...</span>
        ) : (
          <motion.button
            key={page}
            className={`page-btn ${currentPage === page ? 'active' : ''}`}
            onClick={() => setCurrentPage(page)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {page}
          </motion.button>
        )
      ))}
      
      <motion.button 
        className="page-btn next"
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
        whileHover={currentPage !== totalPages ? { scale: 1.05, x: 3 } : {}}
        whileTap={currentPage !== totalPages ? { scale: 0.95 } : {}}
      >
        Next
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="16" 
          height="16" 
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </motion.button>
    </motion.div>
  );
}

export default Pagination; 