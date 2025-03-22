import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Accordion from "./Accordion";
import Pagination from "./Pagination";
import ScrollTop from "./ScrollTop";
import ContactForm from "./ContactForm";
import { todosData } from "./todosData";
import "./index.css";

function App() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [openAccordions, setOpenAccordions] = useState({});
  const [showContactForm, setShowContactForm] = useState(false);
  const [isThemeChanging, setIsThemeChanging] = useState(false);
  const toggleTimeoutRef = useRef(null);
  const itemsPerPage = 5;

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    document.body.classList.toggle("dark-mode", darkMode);
  }, [darkMode]);

  // Filter by category and search
  const filteredTodos = todosData.filter((todo) => {
    const matchesCategory =
      selectedCategory === "all" || todo.category === selectedCategory;
    const matchesSearch =
      todo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      todo.text.toLowerCase().includes(searchTerm.toLowerCase());
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

  // Get unique categories
  const categories = ["all", ...new Set(todosData.map((todo) => todo.category))];

  const toggleAccordion = (id) => {
    setOpenAccordions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
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
  };

  const toggleTheme = () => {
    setIsThemeChanging(true);
    
    // Clear any existing timeout
    if (toggleTimeoutRef.current) {
      clearTimeout(toggleTimeoutRef.current);
    }
    
    // Set a timeout to switch the theme after the animation
    toggleTimeoutRef.current = setTimeout(() => {
      setDarkMode(!darkMode);
      setIsThemeChanging(false);
    }, 800); // Match this with the animation duration
  };

  // Moroccan patterns for theme toggle
  const moroccoPatternsVariants = {
    light: {
      rotate: 0,
      scale: [1, 1.2, 1],
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    dark: {
      rotate: 180,
      scale: [1, 1.2, 1],
      transition: { duration: 0.8, ease: "easeInOut" }
    },
    changing: {
      rotate: [0, 180, 360],
      scale: [1, 1.5, 1],
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  return (
    <div className={`app-container ${darkMode ? 'dark-mode' : ''}`}>
      <div className="container">
        <header>
          <div className="logo-container">
            <div className="agency-logo">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                width="32" 
                height="32"
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
              <h1>AtlasDev</h1>
            </div>
            <motion.button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={isThemeChanging}
            >
              <motion.div 
                className="moroccan-pattern"
                variants={moroccoPatternsVariants}
                animate={isThemeChanging ? "changing" : darkMode ? "dark" : "light"}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  width="24" 
                  height="24"
                  className="morocco-toggle-icon"
                >
                  <path d="M12 2L14.39 8.25H21L16.3 12.46L18.56 19L12 15.19L5.44 19L7.7 12.46L3 8.25H9.61L12 2Z" />
                  <circle cx="12" cy="12" r="5" className="inner-circle" />
                  <path className="decoration-1" d="M12 7L13 9H11L12 7Z" />
                  <path className="decoration-2" d="M12 17L13 15H11L12 17Z" />
                  <path className="decoration-3" d="M7 12L9 13V11L7 12Z" />
                  <path className="decoration-4" d="M17 12L15 13V11L17 12Z" />
                </svg>
              </motion.div>
              <span className="sr-only">{darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}</span>
            </motion.button>
          </div>
          <p className="subtitle">
            Leading digital agency based in Morocco, specializing in web development, UI/UX design, and digital marketing.
            Find answers to commonly asked questions about our services below.
          </p>
        </header>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search questions..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset to first page when searching
            }}
          />
          <div className="search-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </div>

        <div className="categories">
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </motion.button>
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
                {currentItems.map((todo, index) => (
                  <Accordion
                    key={todo.id}
                    todo={todo}
                    isOpen={openAccordions[todo.id] || false}
                    toggleOpen={toggleAccordion}
                    index={index}
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
                <p>No results found. Please try a different search term.</p>
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

        <ContactForm showForm={showContactForm} setShowForm={setShowContactForm} />

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
            
            <div className="social-links">
              <motion.a 
                href="#" 
                aria-label="Instagram"
                whileTap={{ scale: 0.9 }}
                className="social-icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="Twitter"
                whileTap={{ scale: 0.9 }}
                className="social-icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                aria-label="LinkedIn"
                whileTap={{ scale: 0.9 }}
                className="social-icon"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </motion.a>
              <motion.a 
                href="#" 
                className="contact-link"
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowContactForm(true);
                }}
              >
                Contact Us
              </motion.a>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p className="copyright">&copy; {new Date().getFullYear()} AtlasDev. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>

      <ScrollTop />
    </div>
  );
}

export default App;
