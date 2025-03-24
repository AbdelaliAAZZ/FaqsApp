import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const DarkModeToggle = ({ darkMode, toggleDarkMode }) => {
  // Define animations for the toggle icon
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
    <motion.button
      className={`relative flex items-center justify-center w-12 h-12 rounded-full focus:outline-none ${
        darkMode 
          ? 'bg-[#1e1e1e] hover:bg-[#2a2a2a] border-[1px] border-gray-800' 
          : 'bg-gray-100 hover:bg-gray-200'
      } transition-all duration-300`}
      onClick={toggleDarkMode}
      whileHover={{ scale: 1.1, rotate: [0, 15, -15, 0] }}
      whileTap={{ scale: 0.9 }}
      aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        boxShadow: darkMode ? "0px 0px 8px rgba(42, 201, 168, 0.4)" : "0px 0px 8px rgba(14, 110, 255, 0.4)"
      }}
    >
      <motion.div 
        className="w-8 h-8"
        variants={moroccoPatternsVariants}
        animate={darkMode ? "dark" : "light"}
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          width="24" 
          height="24"
          className="morocco-toggle-icon"
        >
          <path 
            d="M12 2L14.39 8.25H21L16.3 12.46L18.56 19L12 15.19L5.44 19L7.7 12.46L3 8.25H9.61L12 2Z" 
            fill={darkMode ? "#60A5FA" : "#FCD34D"}
            stroke={darkMode ? "#60A5FA" : "#FCD34D"}
            strokeWidth="0.5"
          />
          <circle 
            cx="12" 
            cy="12" 
            r="5" 
            fill={darkMode ? "#121212" : "#FFFFFF"} 
            stroke={darkMode ? "#60A5FA" : "#FCD34D"}
            strokeWidth="0.5"
          />
          <path 
            d="M12 7L13 9H11L12 7Z" 
            fill={darkMode ? "#60A5FA" : "#FCD34D"} 
            className="decoration-1"
          />
          <path 
            d="M12 17L13 15H11L12 17Z" 
            fill={darkMode ? "#60A5FA" : "#FCD34D"} 
            className="decoration-2"
          />
          <path 
            d="M7 12L9 13V11L7 12Z" 
            fill={darkMode ? "#60A5FA" : "#FCD34D"} 
            className="decoration-3"
          />
          <path 
            d="M17 12L15 13V11L17 12Z" 
            fill={darkMode ? "#60A5FA" : "#FCD34D"} 
            className="decoration-4"
          />
        </svg>
      </motion.div>
    </motion.button>
  );
};

DarkModeToggle.propTypes = {
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};

export default DarkModeToggle; 