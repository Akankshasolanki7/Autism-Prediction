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
├── backend/
│   ├── main.py              # FastAPI + Random Forest inference
│   └── requirements.txt     # Python dependencies
├── frontend/
│   ├── src/                 # React components + Tailwind CSS
│   ├── package.json         # Node dependencies
│   └── vite.config.js       # Build configuration
├── models/
│   ├── best_model.pkl       # Trained Random Forest
│   ├── encoders.pkl         # Label encoders
│   └── train.csv           # 800 training samples
└── README.md               # This file
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
