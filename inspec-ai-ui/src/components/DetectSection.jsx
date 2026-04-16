import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, ImagePlus, Search, Star, MapPin, Clock,
  ChevronRight, Gauge, DollarSign, Wrench, AlertCircle,
} from 'lucide-react';
import {
  defectAreas, yearOptions, severityConfig,
  repairShops, analyzeDefect,
} from '../data/constants';
import './DetectSection.css';

export default function DetectSection() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [form, setForm] = useState({ make: '', model: '', defectArea: '', year: '' });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);
  const resultRef = useRef(null);

  const handleFile = useCallback((f) => {
    if (!f || !f.type.startsWith('image/')) return;
    setFile(f);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target.result);
    reader.readAsDataURL(f);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleAnalyze = () => {
    if (!file) return alert('Please upload an image first');
    const { make, model, defectArea, year } = form;
    if (!make || !model || !defectArea || !year) return alert('Please fill out all vehicle details');

    setLoading(true);
    setResult(null);

    // Simulate API delay
    setTimeout(() => {
      const analysis = analyzeDefect(make, model, defectArea);
      setResult(analysis);
      setLoading(false);
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1800);
  };

  const cfg = result ? severityConfig[result.severity] : null;

  return (
    <section className="detect" id="detect">
      <div className="container">
        <motion.div
          className="detect__header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-label">
            <Search size={14} />
            Defect Analysis
          </div>
          <h2 className="section-title">Detect Vehicle Defects</h2>
          <p className="section-subtitle">
            Upload an image and provide vehicle details for instant AI-powered severity analysis
          </p>
        </motion.div>

        <motion.div
          className="detect__form-wrapper"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {/* Upload Area */}
          <div
            className={`detect__upload ${dragActive ? 'detect__upload--active' : ''} ${preview ? 'detect__upload--has-image' : ''}`}
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
            {preview ? (
              <div className="detect__preview">
                <img src={preview} alt="Vehicle defect preview" />
                <div className="detect__preview-overlay">
                  <ImagePlus size={22} />
                  <span>Click to change image</span>
                </div>
              </div>
            ) : (
              <div className="detect__upload-content">
                <div className="detect__upload-icon">
                  <Upload size={28} />
                </div>
                <h3>Drag & Drop Image Here</h3>
                <p>or click to browse files</p>
                <span className="detect__upload-hint">Supports JPG, PNG, WEBP up to 10MB</span>
              </div>
            )}
          </div>

          {/* Vehicle Form */}
          <div className="detect__fields">
            <div className="detect__field">
              <label htmlFor="make">Vehicle Make</label>
              <input
                id="make"
                type="text"
                placeholder="e.g. Toyota, Honda, Nissan"
                value={form.make}
                onChange={handleChange('make')}
              />
            </div>
            <div className="detect__field">
              <label htmlFor="model">Vehicle Model</label>
              <input
                id="model"
                type="text"
                placeholder="e.g. Camry, Civic, Rogue"
                value={form.model}
                onChange={handleChange('model')}
              />
            </div>
            <div className="detect__field">
              <label htmlFor="defectArea">Defect Area</label>
              <select id="defectArea" value={form.defectArea} onChange={handleChange('defectArea')}>
                <option value="">Select area</option>
                {defectAreas.map((a) => (
                  <option key={a} value={a}>{a}</option>
                ))}
              </select>
            </div>
            <div className="detect__field">
              <label htmlFor="year">Vehicle Year</label>
              <select id="year" value={form.year} onChange={handleChange('year')}>
                <option value="">Select year</option>
                {yearOptions.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            className="btn-primary detect__submit"
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="detect__spinner" />
                Analyzing...
              </>
            ) : (
              <>
                <Search size={18} />
                Analyze Defect
              </>
            )}
          </button>
        </motion.div>

        {/* Results */}
        <AnimatePresence>
          {(loading || result) && (
            <motion.div
              ref={resultRef}
              className="detect__results"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {loading && (
                <div className="detect__loading">
                  <div className="detect__loading-spinner" />
                  <h3>Analyzing Defect...</h3>
                  <p>Our AI is processing your image</p>
                </div>
              )}

              {result && !loading && (
                <>
                  {/* Severity Header */}
                  <div className="result__header" style={{ '--s-color': cfg.color, '--s-bg': cfg.bg, '--s-border': cfg.border }}>
                    <div className="result__severity-badge" style={{ background: cfg.bg, color: cfg.color, borderColor: cfg.border }}>
                      <Gauge size={18} />
                      {result.severity} SEVERITY
                    </div>
                    <div className="result__confidence">
                      Confidence: <strong>{Math.round(result.confidence * 100)}%</strong>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="result__grid">
                    <div className="result__card">
                      <div className="result__card-icon" style={{ background: cfg.bg, color: cfg.color }}>
                        <AlertCircle size={20} />
                      </div>
                      <div>
                        <span className="result__card-label">Severity Level</span>
                        <span className="result__card-value">{cfg.label}</span>
                        <span className="result__card-desc">{result.recommendation}</span>
                      </div>
                    </div>

                    <div className="result__card">
                      <div className="result__card-icon" style={{ background: 'rgba(124, 58, 237, 0.12)', color: '#a78bfa' }}>
                        <DollarSign size={20} />
                      </div>
                      <div>
                        <span className="result__card-label">Estimated Cost</span>
                        <span className="result__card-value">{result.priceEstimate}</span>
                        <span className="result__card-desc">Based on {form.make} {form.model} ({form.year})</span>
                      </div>
                    </div>

                    <div className="result__card">
                      <div className="result__card-icon" style={{ background: 'rgba(6, 182, 212, 0.12)', color: '#06b6d4' }}>
                        <Wrench size={20} />
                      </div>
                      <div>
                        <span className="result__card-label">Defect Area</span>
                        <span className="result__card-value">{form.defectArea}</span>
                        <span className="result__card-desc">{result.urgency}</span>
                      </div>
                    </div>
                  </div>

                  {/* Severity Scale */}
                  <div className="result__scale">
                    <span className="result__scale-label">Severity Scale</span>
                    <div className="result__scale-bar">
                      {['MINOR', 'MODERATE', 'SEVERE'].map((s) => {
                        const c = severityConfig[s];
                        const isActive = s === result.severity;
                        return (
                          <div
                            key={s}
                            className={`result__scale-item ${isActive ? 'result__scale-item--active' : ''}`}
                            style={{
                              background: isActive ? c.color : `${c.color}20`,
                              color: isActive ? '#fff' : c.color,
                              borderColor: isActive ? c.color : 'transparent',
                            }}
                          >
                            {c.label}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Repair Shops */}
                  <div className="result__shops">
                    <h3 className="result__shops-title">
                      <MapPin size={18} />
                      Recommended Repair Shops
                    </h3>
                    <div className="result__shops-grid">
                      {repairShops.map((shop) => (
                        <div key={shop.name} className="shop-card">
                          <div className="shop-card__header">
                            <h4>{shop.name}</h4>
                            <div className="shop-card__rating">
                              <Star size={14} fill="#f59e0b" stroke="none" />
                              <span>{shop.rating}</span>
                              <span className="shop-card__reviews">({shop.reviews})</span>
                            </div>
                          </div>
                          <div className="shop-card__meta">
                            <span><MapPin size={13} /> {shop.distance} — {shop.area}</span>
                            <span><Clock size={13} /> {shop.highlight}</span>
                          </div>
                          <div className="shop-card__tags">
                            {shop.certified.map((c) => (
                              <span key={c} className="shop-card__tag">{c} Certified</span>
                            ))}
                          </div>
                          <button className="btn-secondary shop-card__btn">
                            Book Appointment <ChevronRight size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
