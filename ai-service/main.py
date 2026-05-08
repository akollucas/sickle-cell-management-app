from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import os

app = Flask(__name__)
CORS(app)

# Load pre-trained model
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
if os.path.exists(model_path):
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
else:
    model = None
    print("Warning: model.pkl not found. Using fallback predictions.")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Extract features in correct order
    features = [
        data.get('hydration_level', 0),
        data.get('pain_level', 0),
        data.get('sleep_hours', 7),
        data.get('activity_level', 2),
        data.get('previous_crisis_days', 30)
    ]
    
    if model:
        # Make prediction (probability of crisis)
        proba = model.predict_proba([features])[0][1]
        risk_score = int(proba * 100)
    else:
        # Simple rule-based fallback
        risk_score = 20
        if data.get('hydration_level', 8) < 4:
            risk_score += 25
        if data.get('pain_level', 0) > 5:
            risk_score += 30
        if data.get('sleep_hours', 8) < 6:
            risk_score += 15
        risk_score = min(95, risk_score)
    
    # Generate contributing factors
    factors = []
    if data.get('hydration_level', 0) < 4:
        factors.append("Low hydration - drink more water")
    if data.get('pain_level', 0) > 5:
        factors.append("Elevated pain levels reported")
    if data.get('sleep_hours', 7) < 6:
        factors.append("Insufficient sleep")
    
    return jsonify({
        'riskScore': risk_score,
        'contributingFactors': factors,
        'recommendation': 'Stay hydrated and monitor pain closely.' if risk_score > 50 else 'Continue current care plan.'
    })

@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)