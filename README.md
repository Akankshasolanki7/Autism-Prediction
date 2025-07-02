# ASD Screening Application

Web-based Autism Spectrum Disorder screening tool using Random Forest machine learning classification.

**🌐 [Live Demo](https://austin-umber.vercel.app/)** | **📖 [API Docs](https://austim-production.up.railway.app/docs)**

## Tech Stack
**Frontend:** React + Vite + Tailwind CSS
**Backend:** FastAPI + scikit-learn + pandas
**ML Model:** Random Forest (93% accuracy, 50 trees, max_depth=20)
**Data:** 800 samples, SMOTE balanced, 21 features
**Deploy:** Vercel + Railway

## Quick Start
```bash
# Backend
cd backend && pip install -r requirements.txt && python main.py

# Frontend (new terminal)
cd frontend && npm install && npm run dev
```

## Model Details
**Algorithm:** Random Forest Classifier
**Performance:** 93% cross-validation accuracy
**Config:** `RandomForestClassifier(bootstrap=False, max_depth=20, n_estimators=50)`
**Training:** 800 samples with SMOTE balancing
**Features:** 21 inputs (A1-A10 behavioral + demographics + medical history)
**Encoders:** 7 categorical variables (gender, ethnicity, etc.)

**Model Selection Process:**
- Decision Tree: 86% accuracy
- **Random Forest: 93% accuracy** ← Selected
- XGBoost: 90% accuracy

## Project Structure
```
├── backend/main.py          # FastAPI + Random Forest inference
├── frontend/src/            # React components + Tailwind CSS
├── models/
│   ├── best_model.pkl       # Trained Random Forest
│   ├── encoders.pkl         # Label encoders
│   └── train.csv           # 800 training samples
└── requirements.txt         # fastapi, scikit-learn, pandas
```

## API Usage
```bash
# Health check
curl https://austim-production.up.railway.app/health

# Prediction
curl -X POST https://austim-production.up.railway.app/predict \
  -H "Content-Type: application/json" \
  -d '{"A1_Score":1,"A2_Score":0,...,"age":25,"gender":"m"}'
```

**Response:** `{"prediction": 0, "probability": 0.23, "risk_level": "Low"}`

## Key Features
- **10-question behavioral assessment** with demographics
- **Real-time ML prediction** using Random Forest
- **Progressive web form** with validation
- **Mobile-responsive design** with animations
- **No data storage** - completely private
- **Professional recommendations** for next steps

## Technical Notes
- **SMOTE balancing** applied to training data
- **Label encoding** for categorical features (gender, ethnicity, etc.)
- **Cross-validation** used for model selection
- **Pydantic validation** for API requests
- **Docker containerized** backend
- **CORS configured** for production

**Disclaimer:** Screening tool only - not for diagnosis. Consult healthcare professionals for medical evaluation.

**License:** MIT
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
