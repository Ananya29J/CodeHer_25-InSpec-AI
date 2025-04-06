from http.server import BaseHTTPRequestHandler
import json
import random

# Define severity levels
class_labels = ['minor', 'moderate', 'severe']
severity_multiplier = {
    'minor': 0.5,
    'moderate': 1.0,
    'severe': 1.5
}

# Mock price data
price_data = {
    "TOYOTA": {
        "Camry": {"door": 12000, "bumper": 8000, "fender": 5000, "light": 3000, "windshield": 15000, "bonnet": 10000, "dickey": 9000}
    },
    "HONDA": {
        "Civic": {"door": 11000, "bumper": 7500, "fender": 4800, "light": 2800, "windshield": 14000, "bonnet": 9500, "dickey": 8500}
    },
    "NISSAN": {
        "Rogue": {"door": 10500, "bumper": 7000, "fender": 4500, "light": 2500, "windshield": 13500, "bonnet": 9000, "dickey": 8000}
    }
}

def get_recommendations(severity):
    if severity == 'minor':
        return "Can be addressed during routine maintenance"
    elif severity == 'moderate':
        return "Should be repaired within the next 500 miles"
    else:
        return "Requires immediate attention for safety reasons"

def handler(request):
    # Handle OPTIONS request for CORS
    if request.method == 'OPTIONS':
        return {
            'status': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Allow-Methods': 'POST, OPTIONS'
            }
        }
    
    # For POST requests
    if request.method == 'POST':
        # Generate random severity
        severity = random.choice(class_labels)
        
        # Get form data if available
        try:
            body = json.loads(request.body)
            make = body.get('make', 'HONDA').upper()
            model_name = body.get('model', 'Civic')
            part = body.get('defectArea', 'door').lower()
        except:
            make = 'HONDA'
            model_name = 'Civic'
            part = 'door'
        
        # Calculate price estimate
        price_estimate = "₹5000-₹8000"  # Default
        try:
            if make in price_data and model_name in price_data[make]:
                if part in price_data[make][model_name]:
                    base_price = price_data[make][model_name][part]
                    multiplier = severity_multiplier.get(severity, 1.0)
                    estimated_cost = int(base_price * multiplier)
                    price_estimate = f"₹{estimated_cost}"
        except:
            pass
        
        return {
            'status': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'severity': severity.upper(),
                'confidence': round(random.uniform(0.75, 0.95), 2),
                'priceEstimate': price_estimate,
                'recommendations': get_recommendations(severity)
            })
        }
    
    # For other methods (GET, etc.)
    return {
        'status': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }