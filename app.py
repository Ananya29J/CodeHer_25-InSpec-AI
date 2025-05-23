from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import numpy as np
import json
import os
import random

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Flag for TensorFlow availability
have_tf = False

# Load price data
try:
    with open('data/car_parts_prices.json', 'r') as f:
        price_data = json.load(f)
    print("Price data loaded successfully")
except Exception as e:
    print(f"Error loading price data: {e}")
    # Create mock price data
    price_data = {
        "TOYOTA": {
            "Camry": {"door": 12000, "bumper": 8000, "fender": 5000}
        },
        "HONDA": {
            "Civic": {"door": 11000, "bumper": 7500, "fender": 4800}
        },
        "NISSAN": {
            "Rogue": {"door": 10500, "bumper": 7000, "fender": 4500}
        }
    }
    print("Created mock price data")

# Define severity levels
class_labels = ['minor', 'moderate', 'severe']
severity_multiplier = {
    'minor': 0.5,
    'moderate': 1.0,
    'severe': 1.5
}

# Serve frontend files
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_frontend(path):
    if path == "":
        return send_from_directory('frontend', 'index.html')
    try:
        return send_from_directory('frontend', path)
    except:
        return send_from_directory('frontend', 'index.html')

# API endpoint for defect analysis
@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        if 'image' not in request.files:
            return jsonify({'error': 'No image provided'}), 400
        
        # Get form data
        image_file = request.files['image']
        make = request.form.get('make', '').upper().strip()
        model_name = request.form.get('model', '').strip()
        part = request.form.get('defectArea', '').strip().lower()
        year = request.form.get('year', '')
        
        # Generate random severity for testing
        severity = random.choice(class_labels)
        
        # Calculate mock price estimate
        try:
            price_estimate = "₹5000-₹8000"  # Default estimate
            if make in price_data and model_name in price_data[make]:
                if part in price_data[make][model_name]:
                    base_price = price_data[make][model_name][part]
                    multiplier = severity_multiplier.get(severity, 1.0)
                    estimated_cost = int(base_price * multiplier)
                    price_estimate = f"₹{estimated_cost}"
        except Exception:
            price_estimate = "Price estimate unavailable"
            
        return jsonify({
            'severity': severity.upper(),
            'confidence': round(random.uniform(0.75, 0.95), 2),
            'priceEstimate': price_estimate,
            'recommendations': get_recommendations(severity)
        })
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

def get_recommendations(severity):
    if severity == 'minor':
        return "Can be addressed during routine maintenance"
    elif severity == 'moderate':
        return "Should be repaired within the next 500 miles"
    else:
        return "Requires immediate attention for safety reasons"

# Vercel requires a named app variable for Python functions
app = app

# Only run the development server locally, not on Vercel
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)