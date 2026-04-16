import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    q: 'How accurate is the defect detection?',
    a: 'Our AI-powered system achieves a 94% accuracy rate for common vehicle defects. The model is based on MobileNetV2 architecture, trained on thousands of vehicle damage images and continuously improved.',
  },
  {
    q: 'What types of defects can the system detect?',
    a: 'The system analyzes damage to body panels including doors, bumpers, fenders, bonnets, windshields, lights, and dickey/trunk areas. It classifies damage severity rather than identifying specific mechanical faults.',
  },
  {
    q: 'How are repair costs calculated?',
    a: 'Repair costs are estimated based on your vehicle\'s make, model, and the detected severity level. We apply a severity multiplier (0.5× for minor, 1.0× for moderate, 1.5× for severe) to base part prices sourced from regional service data.',
  },
  {
    q: 'How are the three severity levels determined?',
    a: 'Our AI considers defect size, location, structural impact, and safety implications. MINOR covers cosmetic issues, MODERATE indicates performance-affecting damage requiring attention within 500 miles, and SEVERE flags critical safety risks needing immediate repair.',
  },
  {
    q: 'Is my uploaded image stored or shared?',
    a: 'No. All image processing happens locally in your browser. Your images are never uploaded to any server, ensuring complete privacy and data security.',
  },
];

function FAQItem({ faq, isOpen, onClick }) {
  return (
    <div className={`faq-item ${isOpen ? 'faq-item--open' : ''}`} onClick={onClick}>
      <button className="faq-item__question">
        <span>{faq.q}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="faq-item__answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p>{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="faq" id="faq">
      <div className="container">
        <motion.div
          className="faq__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <HelpCircle size={14} />
            FAQ
          </div>
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Common questions about our vehicle defect detection system
          </p>
        </motion.div>

        <motion.div
          className="faq__list"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              isOpen={openIndex === i}
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
