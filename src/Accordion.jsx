import { motion, AnimatePresence } from 'framer-motion';
import PropTypes from 'prop-types';

export function Accordion({ items, openFaqs, setOpenFaqs }) {
  // Create handler for toggling FAQ items
  const toggleFaq = (index) => {
    const newOpenFaqs = [...openFaqs];
    newOpenFaqs[index] = !newOpenFaqs[index];
    setOpenFaqs(newOpenFaqs);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <AccordionItem
          key={index}
          item={item}
          isOpen={openFaqs[index]}
          toggleFaq={() => toggleFaq(index)}
        />
      ))}
    </div>
  );
}

function AccordionItem({ item, isOpen, toggleFaq }) {
  return (
    <div className={`item ${isOpen ? 'active' : ''}`}>
      <div className={`number ${isOpen ? 'active-number' : ''}`}>
        {item.id}
      </div>
      
      <div className="text-container" onClick={toggleFaq}>
        <h3 className={`title ${isOpen ? 'active-title' : ''}`}>
          {item.title}
        </h3>
        <span className="category">{item.category}</span>
      </div>
      
      <button 
        className={`expand-btn ${isOpen ? 'active-btn' : ''}`}
        aria-expanded={isOpen}
        onClick={toggleFaq}
      >
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
          {isOpen ? (
            <path d="M5 12h14M12 5v14" stroke="currentColor" strokeWidth="2" />
          ) : (
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" />
          )}
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="content-inner">
              <div dangerouslySetInnerHTML={{ __html: item.text }} />
              
              {item.links && item.links.length > 0 && (
                <div className="links-section">
                  <h4>Related Links:</h4>
                  <ul className="links-list">
                    {item.links.map((link, i) => (
                      <li key={i}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
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
                            className="mr-2"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                          {link.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Accordion.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      links: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          url: PropTypes.string.isRequired,
        })
      ),
    })
  ).isRequired,
  openFaqs: PropTypes.arrayOf(PropTypes.bool).isRequired,
  setOpenFaqs: PropTypes.func.isRequired,
};

AccordionItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleFaq: PropTypes.func.isRequired,
};
