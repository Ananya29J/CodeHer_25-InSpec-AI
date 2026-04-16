import { motion } from 'framer-motion';
import { Camera, FileText, Brain, ClipboardCheck } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    icon: Camera,
    title: 'Upload Photos',
    desc: 'Take clear photos of the vehicle defect from multiple angles and upload them to our system.',
    color: '#7c3aed',
  },
  {
    icon: FileText,
    title: 'Vehicle Details',
    desc: 'Enter your vehicle\'s make, model, year, and the specific damaged component for accurate analysis.',
    color: '#06b6d4',
  },
  {
    icon: Brain,
    title: 'AI Analysis',
    desc: 'Our MobileNetV2-based model processes the image and classifies the defect severity in under 3 seconds.',
    color: '#f59e0b',
  },
  {
    icon: ClipboardCheck,
    title: 'Get Report',
    desc: 'Receive a detailed severity report with cost estimates, repair urgency, and nearby service center recommendations.',
    color: '#22c55e',
  },
];

export default function HowItWorks() {
  return (
    <section className="how-it-works" id="how-it-works">
      <div className="container">
        <motion.div
          className="how__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <Brain size={14} />
            Process
          </div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            From photo to diagnosis in four simple steps
          </p>
        </motion.div>

        <div className="how__steps">
          {steps.map((step, i) => (
            <motion.div
              key={step.title}
              className="how__step"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
            >
              <div className="how__step-number">{String(i + 1).padStart(2, '0')}</div>
              <div
                className="how__step-icon"
                style={{ background: `${step.color}15`, color: step.color }}
              >
                <step.icon size={26} />
              </div>
              <h3 className="how__step-title">{step.title}</h3>
              <p className="how__step-desc">{step.desc}</p>
              {i < steps.length - 1 && <div className="how__connector" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
