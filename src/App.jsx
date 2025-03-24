import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Accordion } from "./Accordion";
import Pagination from "./Pagination";
import ScrollTop from "./ScrollTop";
import Navbar from "./Navbar";
import { todosData } from "./todosData";
import "./index.css";
import SearchBar from "./SearchBar";
import { Toast } from "./Toast";
import ContactSection from './ContactSection';

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAccordions, setOpenAccordions] = useState({});
  const [toast, setToast] = useState({
    show: false,
    message: '',
    type: 'info',
  });
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
    document.documentElement.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Get unique categories
  const categories = [...new Set(todosData.map((todo) => todo.category))];

  // Filter by category and search
  const filteredTodos = todosData.filter((todo) => {
    const matchesCategory =
      selectedCategory === "all" || todo.category === selectedCategory;
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTodos.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredTodos.length / itemsPerPage);

  // Reset current page when filteredTodos changes and current page is out of bounds
  useEffect(() => {
    if (currentPage > Math.max(1, totalPages)) {
      setCurrentPage(1);
    }
  }, [filteredTodos.length, currentPage, totalPages]);

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => {
      const newState = { ...prev, [id]: !prev[id] };
      // Remove toast notification for single FAQ toggles
      return newState;
    });
  };

  const expandAll = () => {
    const allExpanded = {};
    currentItems.forEach(item => {
      allExpanded[item.id] = true;
    });
    setOpenAccordions(prev => ({
      ...prev,
      ...allExpanded
    }));
    showToast("All FAQs expanded", "success");
  };

  const collapseAll = () => {
    const allCollapsed = {};
    currentItems.forEach(item => {
      allCollapsed[item.id] = false;
    });
    setOpenAccordions(prev => ({
      ...prev,
      ...allCollapsed
    }));
    showToast("All FAQs collapsed", "info");
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    showToast(`Switched to ${!darkMode ? 'dark' : 'light'} mode`, "success");
  };

  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, show: false }));
    }, 3000);
  };

  // Stop infinite animations by using useEffect for any scrolling animation logic
  useEffect(() => {
    const handleScroll = () => {
      // Your scroll handling logic here
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle contact form submission
  const handleContactSubmit = (formData) => {
    console.log('Contact form submitted:', formData);
    showToast('Message sent successfully!', 'success');
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <Navbar 
        darkMode={darkMode} 
        toggleTheme={toggleTheme} 
        onContactClick={() => {
          // Scroll to contact section
          document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }} 
      />
      
      <div className="container mx-auto px-4 py-6 md:py-10">
        <div className="search-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>

        <div className="category-filters">
          <button
            className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => setSelectedCategory("all")}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${selectedCategory === category ? "active" : ""}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        <div className="faqs-container">
          <div className="faqs-header">
            <h2>Frequently Asked Questions</h2>
            <div className="expand-collapse-controls">
              <button 
                className="expand-all-btn"
                onClick={expandAll}
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
                  className="control-icon"
                >
                  <polyline points="7 13 12 18 17 13"></polyline>
                </svg>
                Expand All
              </button>
              <button 
                className="collapse-all-btn"
                onClick={collapseAll}
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
                  className="control-icon"
                >
                  <polyline points="7 11 12 6 17 11"></polyline>
                </svg>
                Collapse All
              </button>
            </div>
          </div>
          
          <AnimatePresence>
            {currentItems.length > 0 ? (
              <div className="accordion">
                {currentItems.map((todo) => (
                  <Accordion
                    key={todo.id}
                    items={[{...todo, id: todo.id}]}
                    openFaqs={[openAccordions[todo.id] || false]}
                    setOpenFaqs={() => {
                      toggleAccordion(todo.id);
                    }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="no-results"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <p>No results found. Please try a different search term or category.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {filteredTodos.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
            />
          )}
        </div>

        <ContactSection onSubmit={handleContactSubmit} />

        <footer className="site-footer">
          <div className="footer-container">
            <div className="footer-main">
              <div className="agency-logo">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="28" 
                  height="28"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="agency-icon"
                >
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                  <line x1="12" y1="22" x2="12" y2="15.5"></line>
                  <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
                </svg>
                <h3>AtlasDev</h3>
              </div>
              <div className="footer-info">
                <div className="footer-contact">
                  <div className="contact-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span>Casablanca, Morocco</span>
                  </div>
                  <div className="contact-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span>+212 600-000-000</span>
                  </div>
                  <div className="contact-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span>contact@atlasdev.ma</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="footer-bottom">
              <p className="copyright">&copy; {new Date().getFullYear()} AtlasDev. All rights reserved.</p>
              <div className="legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
              </div>
            </div>
          </div>
        </footer>
      </div>

      <Toast toast={toast} />
      <ScrollTop />
    </div>
  );
}

export default App;
