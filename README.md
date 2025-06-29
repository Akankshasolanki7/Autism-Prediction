# Autism Spectrum Disorder (ASD) Prediction System

A modern web application for predicting Autism Spectrum Disorder using machine learning. This application provides an intuitive interface for users to complete an assessment questionnaire and receive predictions based on a trained machine learning model.

## Features

- 🎯 **Accurate Predictions**: Uses a trained XGBoost model with high accuracy
- 🎨 **Modern UI**: Clean, responsive React-based interface
- 📱 **Mobile Friendly**: Optimized for all device sizes
- 🔒 **Privacy Focused**: No data storage, immediate results
- ⚡ **Fast**: Real-time predictions with minimal latency
- 🌐 **Accessible**: WCAG compliant design

## Technology Stack

### Frontend
- React 18 with TypeScript
- Tailwind CSS for styling
- Framer Motion for animations
- React Hook Form for form management
- Axios for API communication

### Backend
- FastAPI (Python)
- Scikit-learn for model inference
- Pydantic for data validation
- CORS middleware for cross-origin requests

### Deployment
- Frontend: Vercel
- Backend: Railway/Render
- CI/CD: GitHub Actions

## Project Structure

```
autism-prediction/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── utils/          # Utility functions
│   │   └── types/          # TypeScript type definitions
│   ├── public/             # Static assets
│   └── package.json
├── backend/                 # FastAPI application
│   ├── app/
│   │   ├── models/         # ML model files
│   │   ├── routers/        # API route handlers
│   │   ├── schemas/        # Pydantic schemas
│   │   └── utils/          # Utility functions
│   ├── requirements.txt
│   └── main.py
├── models/                  # Trained ML models
│   ├── best_model.pkl
│   └── encoders.pkl
└── docs/                   # Documentation
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd autism-prediction
```

2. Set up the backend:
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

3. Set up the frontend:
```bash
cd frontend
npm install
npm start
```

### Usage

1. Navigate to the application in your browser
2. Complete the assessment questionnaire
3. Review your results and recommendations
4. Consult with healthcare professionals for proper diagnosis

## Model Information

The prediction model uses the following features:
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
