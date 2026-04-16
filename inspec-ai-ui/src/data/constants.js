// Car parts price data (INR)
export const priceData = {
  TOYOTA: {
    Camry: { door: 12000, bumper: 8000, fender: 5000, light: 3000, windshield: 15000, bonnet: 10000, dickey: 9000 },
  },
  HONDA: {
    Civic: { door: 11000, bumper: 7500, fender: 4800, light: 2800, windshield: 14000, bonnet: 9500, dickey: 8500 },
  },
  NISSAN: {
    Rogue: { door: 10500, bumper: 7000, fender: 4500, light: 2500, windshield: 13500, bonnet: 9000, dickey: 8000 },
  },
};

// Severity levels
export const severityLevels = ['minor', 'moderate', 'severe'];

export const severityMultiplier = {
  minor: 0.5,
  moderate: 1.0,
  severe: 1.5,
};

export const severityConfig = {
  MINOR: {
    color: '#22c55e',
    bg: 'rgba(34, 197, 94, 0.12)',
    border: 'rgba(34, 197, 94, 0.3)',
    label: 'Minor',
    recommendation: 'Can be addressed during routine maintenance',
    description: 'Cosmetic issues with limited impact on safety or performance.',
    urgency: 'Low urgency — schedule during next service',
  },
  MODERATE: {
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.12)',
    border: 'rgba(245, 158, 11, 0.3)',
    label: 'Moderate',
    recommendation: 'Should be repaired within the next 500 miles',
    description: 'Performance-affecting issues that may eventually impact safety.',
    urgency: 'Medium urgency — repair within 1–2 weeks',
  },
  SEVERE: {
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.12)',
    border: 'rgba(239, 68, 68, 0.3)',
    label: 'Severe',
    recommendation: 'Requires immediate attention for safety reasons',
    description: 'Critical damage compromising vehicle safety and structural integrity.',
    urgency: 'High urgency — do not drive, repair immediately',
  },
};

// Defect area options
export const defectAreas = [
  'Bonnet', 'Bumper', 'Dickey', 'Door', 'Fender', 'Light', 'Windshield',
];

// Year options
export const yearOptions = Array.from({ length: 16 }, (_, i) => 2025 - i);

// Mock repair shops
export const repairShops = [
  {
    name: 'AutoPro Service Center',
    distance: '2.3 km',
    area: 'Vadapalani',
    rating: 4.9,
    reviews: 124,
    highlight: 'Same-day service available',
    certified: ['Toyota', 'Honda'],
  },
  {
    name: 'QuickFix Auto',
    distance: '3.7 km',
    area: 'Ashok Nagar',
    rating: 4.6,
    reviews: 86,
    highlight: '10% off for first-time customers',
    certified: ['Nissan', 'Toyota'],
  },
  {
    name: 'AutoCare Plus',
    distance: '5.1 km',
    area: 'Anna Nagar',
    rating: 4.7,
    reviews: 201,
    highlight: '3-year warranty on all work',
    certified: ['Honda', 'Nissan'],
  },
];

// Simulate analysis
export function analyzeDefect(make, model, defectArea) {
  const severity = severityLevels[Math.floor(Math.random() * severityLevels.length)];
  const confidence = +(Math.random() * 0.2 + 0.75).toFixed(2);
  const config = severityConfig[severity.toUpperCase()];

  let priceEstimate = '₹5,000 – ₹8,000';
  const makeUpper = make.toUpperCase();
  const partLower = defectArea.toLowerCase();

  if (priceData[makeUpper] && priceData[makeUpper][model]) {
    const partPrice = priceData[makeUpper][model][partLower];
    if (partPrice) {
      const multiplier = severityMultiplier[severity];
      const cost = Math.round(partPrice * multiplier);
      const rangeLow = Math.round(cost * 0.85);
      const rangeHigh = Math.round(cost * 1.15);
      priceEstimate = `₹${rangeLow.toLocaleString('en-IN')} – ₹${rangeHigh.toLocaleString('en-IN')}`;
    }
  }

  return {
    severity: severity.toUpperCase(),
    confidence,
    priceEstimate,
    recommendation: config.recommendation,
    description: config.description,
    urgency: config.urgency,
  };
}
