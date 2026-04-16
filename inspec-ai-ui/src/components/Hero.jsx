import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Brain } from 'lucide-react';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Animated background elements */}
      <div className="hero__bg">
        <div className="hero__orb hero__orb--1" />
        <div className="hero__orb hero__orb--2" />
        <div className="hero__orb hero__orb--3" />
        <div className="hero__grid" />
      </div>

      <div className="container hero__content">
        <motion.div
          className="hero__text"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="section-label">
            <Zap size={14} />
            AI-Powered Vehicle Inspection
          </div>

          <h1 className="hero__title">
            Detect Vehicle Defects
            <br />
            with <span className="gradient-text">Precision AI</span>
          </h1>

          <p className="hero__subtitle">
            Upload images of vehicle damage and get instant AI-powered severity
            classification — Minor, Moderate, or Severe — with repair cost
            estimates and nearby service recommendations.
          </p>

          <div className="hero__actions">
            <a
              href="#detect"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#detect')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Start Analysis <ArrowRight size={18} />
            </a>
            <a
              href="#how-it-works"
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#how-it-works')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              How It Works
            </a>
          </div>
        </motion.div>

        <motion.div
          className="hero__stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="hero__stat glass-card">
            <div className="hero__stat-icon" style={{ background: 'rgba(124, 58, 237, 0.15)' }}>
              <Brain size={22} color="#a78bfa" />
            </div>
            <div>
              <span className="hero__stat-value">94%</span>
              <span className="hero__stat-label">Detection Accuracy</span>
            </div>
          </div>
          <div className="hero__stat glass-card">
            <div className="hero__stat-icon" style={{ background: 'rgba(6, 182, 212, 0.15)' }}>
              <Zap size={22} color="#06b6d4" />
            </div>
            <div>
              <span className="hero__stat-value">&lt;3s</span>
              <span className="hero__stat-label">Analysis Time</span>
            </div>
          </div>
          <div className="hero__stat glass-card">
            <div className="hero__stat-icon" style={{ background: 'rgba(34, 197, 94, 0.15)' }}>
              <Shield size={22} color="#22c55e" />
            </div>
            <div>
              <span className="hero__stat-value">3-Tier</span>
              <span className="hero__stat-label">Severity Scale</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
