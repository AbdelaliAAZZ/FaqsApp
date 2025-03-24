import { useState } from 'react';
import PropTypes from 'prop-types';

const ContactSection = ({ onSubmit }) => {
  const [activeMethod, setActiveMethod] = useState('email');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleMethodChange = (method) => {
    setActiveMethod(method);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (activeMethod === 'whatsapp' && !formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for WhatsApp';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call with timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (onSubmit) {
          onSubmit({
            ...formData,
            contactMethod: activeMethod
          });
        }
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrors({ submit: 'Failed to submit form. Please try again.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact" className="py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 dark:text-white">
              Need More Help?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
              Our support team is ready to assist you with any questions you might have. Choose your preferred method of communication below.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 md:p-8 transition-colors duration-300" 
               style={{ backgroundColor: document.documentElement.classList.contains('dark') ? '#121212' : '#ffffff' }}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div 
                className={`contact-method ${activeMethod === 'whatsapp' ? 'active' : ''} transition-colors duration-300`}
                onClick={() => handleMethodChange('whatsapp')}
                style={{ 
                  backgroundColor: document.documentElement.classList.contains('dark') ? '#1a1a1a' : '#ffffff',
                  borderColor: document.documentElement.classList.contains('dark') ? '#333333' : ''
                }}
              >
                <div className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center text-white mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">WhatsApp</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Quick response via chat</p>
                </div>
              </div>
              
              <div 
                className={`contact-method ${activeMethod === 'email' ? 'active' : ''} transition-colors duration-300`}
                onClick={() => handleMethodChange('email')}
                style={{ 
                  backgroundColor: document.documentElement.classList.contains('dark') ? '#1a1a1a' : '#ffffff',
                  borderColor: document.documentElement.classList.contains('dark') ? '#333333' : ''
                }}
              >
                <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800 dark:text-white">Email</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Detailed support requests</p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="form-group">
                <label htmlFor="name" className="form-label">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-control ${errors.name ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Enter your name"
                  style={{ 
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1a1a1a' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#333333',
                    borderColor: document.documentElement.classList.contains('dark') ? '#333333' : ''
                  }}
                />
                {errors.name && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-control ${errors.email ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Enter your email"
                  style={{ 
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1a1a1a' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#333333',
                    borderColor: document.documentElement.classList.contains('dark') ? '#333333' : ''
                  }}
                />
                {errors.email && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.email}</p>}
              </div>
              
              {activeMethod === 'whatsapp' && (
                <div className="form-group">
                  <label htmlFor="phone" className="form-label">WhatsApp Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`form-control ${errors.phone ? 'border-red-500 dark:border-red-500' : ''}`}
                    placeholder="Enter your WhatsApp number"
                    style={{ 
                      backgroundColor: document.documentElement.classList.contains('dark') ? '#1a1a1a' : '#ffffff',
                      color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#333333',
                      borderColor: document.documentElement.classList.contains('dark') ? '#333333' : ''
                    }}
                  />
                  {errors.phone && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="message" className="form-label">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className={`form-control h-32 resize-none ${errors.message ? 'border-red-500 dark:border-red-500' : ''}`}
                  placeholder="Describe your question or issue"
                  style={{ 
                    backgroundColor: document.documentElement.classList.contains('dark') ? '#1a1a1a' : '#ffffff',
                    color: document.documentElement.classList.contains('dark') ? '#ffffff' : '#333333',
                    borderColor: document.documentElement.classList.contains('dark') ? '#333333' : ''
                  }}
                ></textarea>
                {errors.message && <p className="text-red-500 dark:text-red-400 text-xs mt-1">{errors.message}</p>}
              </div>
              
              {errors.submit && (
                <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg text-sm">
                  {errors.submit}
                </div>
              )}
              
              <button
                type="submit"
                className="form-submit-btn transition-colors duration-300"
                disabled={isSubmitting}
                style={{ 
                  backgroundColor: '#2AC9A8',
                  boxShadow: document.documentElement.classList.contains('dark') ? '0 0 15px rgba(42, 201, 168, 0.3)' : 'none'
                }}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    {activeMethod === 'whatsapp' ? 'Send via WhatsApp' : 'Send via Email'}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

ContactSection.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default ContactSection; 