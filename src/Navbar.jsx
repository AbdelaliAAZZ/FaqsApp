import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import PropTypes from 'prop-types';
import DarkModeToggle from './DarkModeToggle';

function Navbar({ darkMode, toggleTheme, onContactClick }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  
  // Track scroll direction to show/hide navbar and change transparency
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    // Hide navbar when scrolling down past threshold
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    // Add background and shadow when scrolled
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  // Navbar animation variants
  const navVariants = {
    visible: { 
      y: 0,
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 20,
        duration: 0.5 
      }
    },
    hidden: { 
      y: "-100%",
      transition: { 
        type: "spring", 
        stiffness: 100,
        damping: 20,
        duration: 0.5 
      }
    }
  };

  // Logo animation variants
  const logoVariants = {
    initial: { opacity: 0, x: -20, scale: 0.9 },
    animate: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    },
    hover: {
      scale: 1.05,
      transition: { 
        duration: 0.3,
        yoyo: Infinity,
        repeatDelay: 0.8
      }
    }
  };

  // Active link detection
  const [activeLink, setActiveLink] = useState('faqs');
  
  useEffect(() => {
    // Get current path from URL to determine active link
    const path = window.location.pathname;
    if (path.includes('faqs')) {
      setActiveLink('faqs');
    } else if (path.includes('support')) {
      setActiveLink('support');
    } else if (path.includes('contact')) {
      setActiveLink('contact');
    } else {
      setActiveLink('home');
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <motion.nav 
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? darkMode 
            ? 'bg-[#121212]/95 border-b border-gray-800 shadow-lg' 
            : 'bg-white/95 border-b border-gray-200 shadow-lg'
          : 'bg-transparent border-transparent'
      }`}
      variants={navVariants}
      initial="visible"
      animate={hidden ? "hidden" : "visible"}
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Brand */}
          <motion.div 
            className="flex items-center space-x-2"
            variants={logoVariants}
            initial="initial"
            animate="animate"
            whileHover="hover"
          >
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
            >
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
                className="text-primary"
              >
                <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"></polygon>
                <line x1="12" y1="22" x2="12" y2="15.5"></line>
                <polyline points="22 8.5 12 15.5 2 8.5"></polyline>
              </svg>
            </motion.div>
            <h1 className="text-xl font-bold font-['Playfair_Display'] logo-gradient">AtlasDev</h1>
          </motion.div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#" 
              className={`nav-link ${activeLink === 'home' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink('home');
              }}
            >
              Home
            </a>
            <a 
              href="#" 
              className={`nav-link ${activeLink === 'faqs' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink('faqs');
              }}
            >
              FAQs
            </a>
            <a 
              href="#" 
              className={`nav-link ${activeLink === 'support' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink('support');
              }}
            >
              Support
            </a>
            <a 
              href="#" 
              className={`nav-link ${activeLink === 'contact' ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveLink('contact');
                onContactClick();
              }}
            >
              Contact
            </a>
          </div>
          
          {/* Theme Toggle Button and Mobile Menu */}
          <div className="flex items-center gap-4 z-30">
            <DarkModeToggle darkMode={darkMode} toggleDarkMode={toggleTheme} />
            
            {/* Professional Mobile Menu Button with Advanced Animation */}
            <motion.button 
              className={`md:hidden p-3 rounded-full shadow-xl ${
                darkMode 
                  ? 'bg-gray-900 text-white hover:bg-gray-800' 
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              } focus:outline-none transition-transform relative`}
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{
                  rotate: mobileMenuOpen ? 90 : 0,
                  transition: { 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20 
                  }
                }}
                className="relative w-6 h-6 flex flex-col justify-center items-center"
              >
                {/* Hamburger Lines with Unique Animation */}
                <motion.span
                  className="absolute top-0 w-6 h-0.5 bg-current"
                  initial={false}
                  animate={{
                    y: mobileMenuOpen ? 12 : 0,
                    rotate: mobileMenuOpen ? 45 : 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }
                  }}
                />
                <motion.span
                  className="absolute top-1/2 w-6 h-0.5 bg-current transform -translate-y-1/2"
                  initial={false}
                  animate={{
                    opacity: mobileMenuOpen ? 0 : 1,
                    transition: { 
                      type: "spring", 
                      stiffness: 300 
                    }
                  }}
                />
                <motion.span
                  className="absolute bottom-0 w-6 h-0.5 bg-current"
                  initial={false}
                  animate={{
                    y: mobileMenuOpen ? -12 : 0,
                    rotate: mobileMenuOpen ? -45 : 0,
                    transition: { 
                      type: "spring", 
                      stiffness: 300, 
                      damping: 20 
                    }
                  }}
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
        
        {/* Mobile Menu - Full Screen */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={`md:hidden fixed inset-0 pt-20 z-20 ${
                darkMode ? 'bg-[#121212]' : 'bg-white'
              }`}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="flex flex-col items-start space-y-4 w-full px-6"
                initial="closed"
                animate="open"
                exit="closed"
                variants={{
                  open: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  },
                  closed: {
                    transition: {
                      staggerChildren: 0.05,
                      staggerDirection: -1
                    }
                  }
                }}
              >
                {['home', 'faqs', 'support', 'contact'].map((item) => (
                  <motion.a
                    key={item}
                    href="#"
                    className={`text-lg w-full py-3 ${
                      activeLink === item
                        ? 'text-primary font-semibold'
                        : darkMode
                          ? 'text-gray-300 hover:text-white'
                          : 'text-gray-700 hover:text-black'
                    } transition-colors`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveLink(item);
                      if (item === 'contact') {
                        onContactClick();
                      }
                      setMobileMenuOpen(false);
                    }}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -20 }
                    }}
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}

Navbar.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  onContactClick: PropTypes.func.isRequired,
};

export default Navbar; 