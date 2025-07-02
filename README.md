# Autism Spectrum Disorder Screening Tool

A web-based screening application for early detection of Autism Spectrum Disorder (ASD) using machine learning classification.

[**Live Application**](https://austin-umber.vercel.app/) | [**API Documentation**](https://austim-production.up.railway.app/docs)

## Overview

This application implements a validated ASD screening questionnaire with automated classification using a Random Forest model. The system processes behavioral assessment responses and demographic information to provide screening results and recommendations for professional evaluation.

## Technical Implementation

**Frontend**: React 18, Vite, Tailwind CSS, Framer Motion
**Backend**: FastAPI, scikit-learn, pandas, uvicorn
**Model**: Random Forest Classifier (50 estimators, max_depth=20)
**Data Processing**: Label encoding for categorical variables
**Deployment**: Vercel (frontend), Railway (backend)

## Model Architecture

**Algorithm**: Random Forest Classifier
**Configuration**: 50 trees, maximum depth 20, bootstrap disabled
**Features**: 21 input features (10 behavioral + 11 demographic)
**Training Data**: 800 samples with balanced class distribution
**Preprocessing**: Label encoding for 7 categorical variables

### Feature Set
- **Behavioral Indicators**: A1-A10 scores (binary responses)
- **Demographics**: Age, gender, ethnicity, country of residence
- **Medical History**: Jaundice history, family autism history
- **Assessment Context**: Previous app usage, relationship to subject

## Development Setup

```bash
# Clone repository
git clone <repository-url>
cd autism-prediction-system

# Backend setup
cd backend
pip install fastapi uvicorn scikit-learn pandas numpy
python main.py

# Frontend setup (separate terminal)
cd frontend
npm install
npm run dev
```

## Project Structure
```
├── backend/
│   ├── main.py              # FastAPI application
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/                 # React components
│   └── package.json         # Node dependencies
├── models/
│   ├── best_model.pkl       # Trained Random Forest
│   ├── encoders.pkl         # Label encoders
│   └── train.csv           # Training dataset (800 samples)
└── README.md
```

## API Reference

### Prediction Endpoint
```http
POST /predict
Content-Type: application/json

{
  "A1_Score": 1, "A2_Score": 0, ..., "A10_Score": 1,
  "age": 18, "gender": "m", "ethnicity": "White-European",
  "jaundice": "no", "austim": "no", "contry_of_res": "United States",
  "used_app_before": "no", "relation": "Self"
}
```

### Response Format
```json
{
  "prediction": 0,
  "probability": 0.23,
  "risk_level": "Low",
  "total_score": 3,
  "recommendations": ["Consult healthcare professional if concerns persist"]
}
```

### Other Endpoints
- `GET /health` - Service health check
- `GET /docs` - Swagger API documentation

## Implementation Notes

The Random Forest model was selected after comparing multiple algorithms:
- Decision Tree: 86% cross-validation accuracy
- Random Forest: 93% cross-validation accuracy
- XGBoost: 90% cross-validation accuracy

Data preprocessing includes SMOTE oversampling to handle class imbalance in the training dataset.

## Disclaimer

This application provides screening results based on validated questionnaire responses. Results should not be considered diagnostic and professional medical consultation is recommended for comprehensive evaluation.

## License

MIT License
- A1-A10 Scores: Responses to 10 behavioral questions
- Age: Participant's age
- Gender: Male/Female
- Ethnicity: Ethnic background
- Jaundice: History of jaundice
- Family History: Family history of autism
- Country of Residence: Geographic location
- Previous App Usage: Prior use of screening apps
- Relationship: Who is completing the assessment

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This tool is for screening purposes only and should not be used as a substitute for professional medical diagnosis. Always consult with qualified healthcare professionals for proper evaluation and diagnosis.

## Support

For support, please open an issue on GitHub or contact the development team.
