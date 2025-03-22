import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function CustomAlert({ message, type }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const getAlertColor = () => {
    switch (type) {
      case 'success':
        return '#18856d';
      case 'error':
        return '#e74c3c';
      case 'warning':
        return '#f39c12';
      case 'info':
      default:
        return '#3498db';
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="custom-alert"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          style={{ backgroundColor: getAlertColor() }}
        >
          <p>{message}</p>
          <button onClick={() => setVisible(false)}>×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CustomAlert; 