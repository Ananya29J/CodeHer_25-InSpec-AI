export default function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Handle OPTIONS method for CORS preflight
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
    
    // Define severity levels
    const classLabels = ['minor', 'moderate', 'severe'];
    const severityMultiplier = {
      'minor': 0.5,
      'moderate': 1.0,
      'severe': 1.5
    };
    
    // Mock price data
    const priceData = {
      "TOYOTA": {
        "Camry": {"door": 12000, "bumper": 8000, "fender": 5000}
      },
      "HONDA": {
        "Civic": {"door": 11000, "bumper": 7500, "fender": 4800}
      },
      "NISSAN": {
        "Rogue": {"door": 10500, "bumper": 7000, "fender": 4500}
      }
    };
    
    function getRecommendations(severity) {
      if (severity === 'minor') {
        return "Can be addressed during routine maintenance";
      } else if (severity === 'moderate') {
        return "Should be repaired within the next 500 miles";
      } else {
        return "Requires immediate attention for safety reasons";
      }
    }
    
    // For POST requests
    if (req.method === 'POST') {
      try {
        // Generate random severity
        const severity = classLabels[Math.floor(Math.random() * classLabels.length)];
        
        // Extract form data if available
        const body = req.body || {};
        const make = (body.make || 'HONDA').toUpperCase();
        const modelName = body.model || 'Civic';
        const part = (body.defectArea || 'door').toLowerCase();
        
        // Calculate price estimate
        let priceEstimate = "₹5000-₹8000";  // Default
        try {
          if (priceData[make] && priceData[make][modelName]) {
            if (priceData[make][modelName][part]) {
              const basePrice = priceData[make][modelName][part];
              const multiplier = severityMultiplier[severity] || 1.0;
              const estimatedCost = Math.floor(basePrice * multiplier);
              priceEstimate = `₹${estimatedCost}`;
            }
          }
        } catch (error) {
          console.error("Price calculation error:", error);
        }
        
        // Return response
        res.status(200).json({
          severity: severity.toUpperCase(),
          confidence: (Math.random() * 0.2 + 0.75).toFixed(2),
          priceEstimate: priceEstimate,
          recommendations: getRecommendations(severity)
        });
        
      } catch (error) {
        console.error("API error:", error);
        res.status(500).json({ error: 'Something went wrong' });
      }
    } else {
      // For non-POST methods
      res.status(405).json({ error: 'Method not allowed' });
    }
  }