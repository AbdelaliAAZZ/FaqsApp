import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PropTypes from 'prop-types';

// Enhanced animation variants
const accordionVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.4,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.3,
      ease: [0.04, 0.62, 0.23, 0.98]
    }
  }
};

const contentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1
    }
  }
};

const linkVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  },
  hover: {
    x: 8,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

function Accordion({ todo, isOpen, toggleOpen, index }) {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <motion.div 
      className="item"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.08,
        ease: [0.04, 0.62, 0.23, 0.98] 
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div 
        className={`number ${isOpen ? 'active-number' : ''}`}
        initial={{ scale: 1 }}
        animate={isHovering || isOpen ? 
          { scale: 1.1, backgroundColor: isOpen ? "var(--primary-color)" : "var(--number-hover-bg)" } : 
          { scale: 1 }
        }
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <span>{todo.id}</span>
      </motion.div>
      
      <motion.div 
        className="text-container"
        animate={{ 
          x: isHovering && !isOpen ? 5 : 0 
        }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.h3 
          className={`title ${isOpen ? 'active-title' : ''}`}
          whileHover={{ x: isOpen ? 0 : 3 }}
        >
          {todo.title}
        </motion.h3>
        
        <motion.div 
          className="category-badge"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1, scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          {todo.category}
        </motion.div>
      </motion.div>
      
      <motion.button 
        className={`expand-btn ${isOpen ? 'active-btn' : ''}`}
        onClick={() => toggleOpen(todo.id)}
        whileHover={{ 
          scale: 1.1,
          backgroundColor: "var(--primary-color)",
          color: "white",
          boxShadow: "0 4px 8px rgba(var(--primary-color-rgb), 0.25)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={isOpen ? 
          { rotate: 135, backgroundColor: "var(--primary-color)", color: "white" } : 
          { rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          width="16"
          height="16"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="content"
            variants={accordionVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <motion.div 
              className="content-inner"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.p variants={contentVariants}>
                {todo.text}
              </motion.p>
              
              {todo.links && todo.links.length > 0 && (
                <motion.div 
                  className="links-section"
                  variants={contentVariants}
                >
                  <motion.h4 variants={contentVariants}>Related resources:</motion.h4>
                  <ul className="links-list">
                    {todo.links.map((link, i) => (
                      <motion.li 
                        key={i} 
                        variants={linkVariants}
                        whileHover="hover"
                      >
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            width="16"
                            height="16"
                            className="link-icon"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          <span className="link-title">{link.title}</span>
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

Accordion.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
    }))
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleOpen: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired
};

export default Accordion;
