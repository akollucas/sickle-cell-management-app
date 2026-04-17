const axios = require('axios');

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:5001';

exports.predictRisk = async (features) => {
  try {
    const response = await axios.post(`${AI_SERVICE_URL}/predict`, features);
    return response.data;
  } catch (error) {
    console.error('AI Service error:', error.message);
    // Fallback mock prediction if AI service is unavailable
    return {
      riskScore: Math.floor(Math.random() * 30) + 20,
      contributingFactors: ['Dehydration risk', 'Recent pain episode'],
      recommendation: 'Increase fluid intake and rest.'
    };
  }
};