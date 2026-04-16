import { motion } from 'framer-motion';
import { ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { severityConfig } from '../data/constants';
import './Features.css';

const cards = [
  {
    key: 'MINOR',
    icon: ShieldCheck,
    items: ['Cosmetic scratches', 'Early signs of wear', 'Non-essential component issues', 'Minor fluid seepage'],
  },
  {
    key: 'MODERATE',
    icon: AlertTriangle,
    items: ['Significant brake pad wear', 'Minor to moderate fluid leaks', 'Belt wear beyond 50%', 'Suspension component wear'],
  },
  {
    key: 'SEVERE',
    icon: ShieldAlert,
    items: ['Brake failure risk', 'Significant structural damage', 'Major fluid leaks', 'Tire sidewall damage / blowout risk'],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="container">
        <motion.div
          className="features__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <ShieldCheck size={14} />
            Classification System
          </div>
          <h2 className="section-title">Three-Tier Severity Detection</h2>
          <p className="section-subtitle">
            Our AI classifies vehicle defects into three distinct severity levels to help you
            prioritize repairs and understand urgency.
          </p>
        </motion.div>

        <motion.div
          className="features__grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {cards.map(({ key, icon: Icon, items }) => {
            const cfg = severityConfig[key];
            return (
              <motion.div
                key={key}
                className="feature-card"
                variants={cardVariants}
                style={{ '--card-color': cfg.color, '--card-bg': cfg.bg, '--card-border': cfg.border }}
              >
                <div className="feature-card__badge">
                  <Icon size={20} />
                  <span>{cfg.label}</span>
                </div>

                <h3 className="feature-card__title">{cfg.label} Severity</h3>
                <p className="feature-card__desc">{cfg.description}</p>

                <ul className="feature-card__list">
                  {items.map((item) => (
                    <li key={item}>
                      <CheckCircle2 size={15} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="feature-card__urgency">
                  {cfg.urgency}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
