import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Accordion from "./Accordion";
import Pagination from "./Pagination";
import { motion } from "framer-motion";
import CustomAlert from "./CustomAlert";

function Accordions({ faqs, searchQuery }) {
  const [expandedIds, setExpandedIds] = useState([]);
  const [filteredFaqs, setFilteredFaqs] = useState(faqs);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [alert, setAlert] = useState({ show: false, message: "", type: "" });
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Calculate current items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFaqs = filteredFaqs.slice(indexOfFirstItem, indexOfLastItem);

  // Filter FAQs based on search query and category
  useEffect(() => {
    let filtered = faqs;
    
    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(faq => 
        faq.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        faq.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (activeCategory !== "all") {
      filtered = filtered.filter(faq => faq.category === activeCategory);
    }
    
    setFilteredFaqs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [faqs, searchQuery, activeCategory]);

  // Extract unique categories
  useEffect(() => {
    const uniqueCategories = [...new Set(faqs.map(faq => faq.category))].filter(Boolean);
    setCategories(uniqueCategories);
  }, [faqs]);

  // Open all FAQs function
  const openAllFaqs = () => {
    const allIds = currentFaqs.map((faq, index) => indexOfFirstItem + index + 1);
    setExpandedIds(allIds);
    setAlert({
      show: true,
      message: "All FAQs expanded",
      type: "success"
    });
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Close all FAQs
  const closeAllFaqs = () => {
    setExpandedIds([]);
    setAlert({
      show: true,
      message: "All FAQs collapsed",
      type: "info"
    });
    
    // Hide alert after 3 seconds
    setTimeout(() => {
      setAlert({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Toggle a single FAQ
  const toggleFaq = (id) => {
    setExpandedIds(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="accordions-container">
      {alert.show && <CustomAlert message={alert.message} type={alert.type} />}
      
      {categories.length > 0 && (
        <div className="category-filters">
          <button 
            className={activeCategory === "all" ? "category-btn active" : "category-btn"}
            onClick={() => setActiveCategory("all")}
          >
            All
          </button>
          {categories.map(category => (
            <button 
              key={category}
              className={activeCategory === category ? "category-btn active" : "category-btn"}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      
      <div className="accordion-controls">
        <button className="control-btn" onClick={openAllFaqs}>Expand All</button>
        <button className="control-btn" onClick={closeAllFaqs}>Collapse All</button>
      </div>
      
      {filteredFaqs.length === 0 ? (
        <div className="no-results">
          <p>No FAQs match your search criteria.</p>
        </div>
      ) : (
        <>
          <motion.div 
            className="accordion"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            key={currentPage} // Re-animate when page changes
          >
            {currentFaqs.map((todo, index) => (
              <Accordion 
                key={indexOfFirstItem + index} 
                todo={{...todo, id: indexOfFirstItem + index + 1}} 
                isOpen={expandedIds.includes(indexOfFirstItem + index + 1)}
                toggleOpen={toggleFaq}
                index={index}
              />
            ))}
          </motion.div>
          
          <Pagination 
            totalItems={filteredFaqs.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          
          <div className="faq-counter">
            Showing {Math.min(indexOfFirstItem + 1, filteredFaqs.length)}-
            {Math.min(indexOfLastItem, filteredFaqs.length)} of {filteredFaqs.length} FAQs
          </div>
        </>
      )}
    </div>
  );
}

Accordions.propTypes = {
  faqs: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired
  })).isRequired,
  searchQuery: PropTypes.string
};

export default Accordions;
