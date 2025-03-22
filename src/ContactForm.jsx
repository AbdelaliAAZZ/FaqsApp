import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaEnvelope, FaTimes, FaPaperPlane, FaCheck, FaEye, FaEyeSlash } from 'react-icons/fa';

function ContactForm() {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [buttonPosition, setButtonPosition] = useState(0);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const typingTimeoutRef = useRef(null);
  const buttonIntervalRef = useRef(null);
  const formRef = useRef(null);

  // Check if form is valid
  const isFormValid = useCallback(() => {
    return formData.name.trim() !== '' && 
           formData.email.includes('@') && 
           formData.message.trim() !== '';
  }, [formData]);

  useEffect(() => {
    // Set up button movement when form is not valid or when hovered
    if (!isFormValid() && showEmailForm) {
      const moveInterval = isButtonHovered ? 150 : 2000; // Move very fast when hovered
      
      // Clear any existing interval
      if (buttonIntervalRef.current) {
        clearInterval(buttonIntervalRef.current);
      }
      
      // Set new interval
      buttonIntervalRef.current = setInterval(() => {
        if (showEmailForm && !isFormValid()) {
          setButtonPosition(Math.floor(Math.random() * 8)); // More random positions
        }
      }, moveInterval);
      
      return () => {
        if (buttonIntervalRef.current) {
          clearInterval(buttonIntervalRef.current);
        }
      };
    }
  }, [formData, showEmailForm, isButtonHovered, isFormValid]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Handle typing detection
    setIsTyping(true);
    
    // Clear previous timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    // Set new timeout to detect when user stops typing
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setFormError('Please fill in all fields');
      return;
    }
    
    if (!formData.email.includes('@')) {
      setFormError('Please enter a valid email address');
      return;
    }
    
    // Clear any previous errors
    setFormError('');
    
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    
    // Show success message
    setFormSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setFormSubmitted(false);
      setShowEmailForm(false);
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 3000);
  };

  const handleWhatsApp = () => {
    // Replace with your actual WhatsApp number
    window.open('https://wa.me/1234567890?text=Hello,%20I%20have%20a%20question%20about%20your%20furniture', '_blank');
  };

  const getButtonPositionClass = () => {
    // More positions for more chaotic movement
    switch (buttonPosition) {
      case 0: return 'button-default';
      case 1: return 'button-top-right';
      case 2: return 'button-bottom-left';
      case 3: return 'button-bottom-right';
      case 4: return 'button-top-left';
      case 5: return 'button-far-right';
      case 6: return 'button-far-left';
      case 7: return 'button-far-bottom';
      default: return 'button-default';
    }
  };

  return (
    <motion.div 
      className="premium-support-section"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="premium-support-header">
        <h2>We&apos;re here to help</h2>
        <p>Get in touch with our customer support team</p>
      </div>
      
      <div className="premium-support-options">
        <div className="premium-support-option whatsapp-option">
          <div className="option-header">
            <div className="option-icon-wrapper whatsapp-icon">
              <FaWhatsapp />
            </div>
            <h3>WhatsApp Support</h3>
          </div>
          
          <p className="option-description">Connect with AtlasDev directly</p>
          
          <ul className="option-features">
            <li><FaCheck className="feature-icon" /> Technical assistance</li>
            <li><FaCheck className="feature-icon" /> Available 7 days a week</li>
            <li><FaCheck className="feature-icon" /> Project consultation</li>
          </ul>
          
          <button 
            className="premium-button whatsapp-button"
            onClick={() => window.open("https://wa.me/212600000000", "_blank")}
          >
            <FaWhatsapp /> Message on WhatsApp
          </button>
        </div>
        
        <div className="premium-support-divider"></div>
        
        <div className="premium-support-option email-option">
          <div className="option-header">
            <div className="option-icon-wrapper email-icon">
              <FaEnvelope />
            </div>
            <h3>Email Support</h3>
          </div>
          
          <p className="option-description">Send us a detailed inquiry</p>
          
          <ul className="option-features">
            <li><FaCheck className="feature-icon" /> Comprehensive support</li>
            <li><FaCheck className="feature-icon" /> Project proposals</li>
            <li><FaCheck className="feature-icon" /> Documentation sharing</li>
          </ul>
          
          <button 
            className="premium-button email-button"
            onClick={() => setShowEmailForm(true)}
          >
            <FaEnvelope /> Contact via Email
          </button>
        </div>
      </div>
      
      <AnimatePresence>
        {showEmailForm && (
          <motion.div 
            className="premium-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEmailForm(false)}
          >
            <motion.div 
              className="premium-form-container"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={e => e.stopPropagation()}
              ref={formRef}
            >
              <button 
                className="premium-close-button"
                onClick={() => setShowEmailForm(false)}
              >
                <FaTimes />
              </button>
              
              {formSubmitted ? (
                <div className="premium-success">
                  <div className="success-icon">
                    <FaCheck />
                  </div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
                </div>
              ) : (
                <>
                  <div className="premium-form-header">
                    <h3>Contact Our Support Team</h3>
                    <p>Fill out the form below and we&apos;ll get back to you as soon as possible.</p>
                  </div>
                  
                  <div className="eye-status-container">
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{ scale: isTyping ? 0.8 : 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isTyping ? <FaEyeSlash className="eye-icon closed" /> : <FaEye className="eye-icon open" />}
                    </motion.div>
                    <span className="eye-status-text">
                      {isTyping ? "I'm not watching u" : "I'm waiting for you to type..."}
                    </span>
                  </div>
                  
                  {formError && <div className="premium-form-error">{formError}</div>}
                  
                  <form className="premium-email-form" onSubmit={handleSubmit}>
                    <div className="premium-form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        placeholder="Enter your name" 
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="premium-form-group">
                      <label htmlFor="email">Email Address</label>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="Enter your email" 
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                    
                    <div className="premium-form-group">
                      <label htmlFor="message">Message</label>
                      <textarea 
                        id="message" 
                        placeholder="How can we help you?" 
                        rows="5"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    
                    <motion.button 
                      type="submit" 
                      className={`premium-submit-button ${!isFormValid() ? getButtonPositionClass() : ''}`}
                      whileHover={isFormValid() ? { scale: 1.05 } : { scale: 1 }}
                      onMouseEnter={() => setIsButtonHovered(true)}
                      onMouseLeave={() => setIsButtonHovered(false)}
                    >
                      <span>Send Message</span>
                      <FaPaperPlane />
                    </motion.button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default ContactForm; 