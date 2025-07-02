# 🧠 ASD Prediction System

AI-powered web application for Autism Spectrum Disorder screening using machine learning.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-blue?style=for-the-badge)](https://austin-umber.vercel.app/) [![API Docs](https://img.shields.io/badge/📖_API_Docs-green?style=for-the-badge)](https://austim-production.up.railway.app/docs)

## What it does
- **Interactive questionnaire** → **AI analysis** → **Instant results** → **Professional recommendations**
- No data stored, completely private screening process

## Tech Stack

**Frontend:** React + Vite + Tailwind CSS + Framer Motion
**Backend:** FastAPI + Random Forest + Scikit-learn + Pandas
**Deployment:** Vercel (Frontend) + Railway (Backend)
**ML Model:** Random Forest classifier (93% accuracy) with SMOTE balancing

## Quick Start

```bash
# 1. Clone repository
git clone https://github.com/your-username/autism-prediction-system.git
cd autism-prediction-system

# 2. Start backend
cd backend
pip install -r requirements.txt
python main.py

# 3. Start frontend (new terminal)
cd frontend
npm install
npm run dev
```

**Local URLs:** Frontend: `http://localhost:3000` | Backend: `http://localhost:8000`

## Project Structure
```
├── backend/          # FastAPI + ML model
├── frontend/         # React app
├── models/           # XGBoost model files
└── docs/            # Documentation
```

## How it Works

1. **Assessment**: 10 behavioral questions + demographics
2. **AI Analysis**: Random Forest model (trained with SMOTE) processes responses
3. **Results**: Instant prediction with recommendations
4. **Privacy**: No data stored, completely anonymous

## Machine Learning Details

**Models Tested:** Decision Tree, Random Forest, XGBoost
**Best Performer:** Random Forest (93% accuracy)
**Data Balancing:** SMOTE (Synthetic Minority Oversampling)
**Features:** 20+ behavioral & demographic indicators

## API Endpoints

- `POST /predict` - Submit assessment data, get prediction
- `GET /docs` - Interactive API documentation
- `GET /health` - System status check

## ⚠️ Medical Disclaimer

**This is a screening tool, not a diagnostic tool.** Always consult healthcare professionals for proper medical evaluation and diagnosis.

## Contributing

1. Fork the repo
2. Create feature branch
3. Make changes
4. Submit pull request

## License

MIT License - see [LICENSE](LICENSE) file.

---

**⭐ Star this repo if helpful!** | **🐛 [Report Issues](https://github.com/your-username/autism-prediction-system/issues)** | **💡 [Request Features](https://github.com/your-username/autism-prediction-system/issues)**
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
