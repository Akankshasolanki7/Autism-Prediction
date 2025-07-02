# 🧠 ASD Prediction System

A modern, AI-powered web application for Autism Spectrum Disorder (ASD) screening using advanced machine learning algorithms. This system provides an intuitive, step-by-step assessment process with real-time predictions and professional recommendations.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-blue?style=for-the-badge)](https://austin-umber.vercel.app/)
[![API Docs](https://img.shields.io/badge/API-Documentation-green?style=for-the-badge)](https://austim-production.up.railway.app/docs)

## ✨ Features

- 🎯 **Interactive Assessment**: Step-by-step behavioral questionnaire with progress tracking
- 🤖 **AI-Powered Predictions**: Advanced XGBoost machine learning model for accurate screening
- 📱 **Responsive Design**: Modern, mobile-friendly interface with smooth animations
- 🔒 **Privacy-Focused**: No data storage, immediate processing and results
- 👨‍⚕️ **Professional Guidance**: Clear recommendations for medical consultation
- ⚡ **Real-Time Results**: Instant predictions with detailed explanations

## 🛠️ Technology Stack

### 🔧 Backend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| **FastAPI** | Modern Python web framework for APIs | 0.100.0+ |
| **XGBoost** | Gradient boosting ML algorithm for predictions | 1.7.0+ |
| **Scikit-learn** | Machine learning utilities and preprocessing | 1.3.0+ |
| **Pandas** | Data manipulation and analysis | 2.0.0+ |
| **NumPy** | Numerical computing and array operations | 1.21.0+ |
| **Uvicorn** | ASGI server for production deployment | 0.20.0+ |
| **Pydantic** | Data validation and settings management | 2.0.0+ |

### 🎨 Frontend Technologies
| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | Modern JavaScript library for building UIs | 18.2.0+ |
| **Vite** | Fast build tool and development server | 4.4.0+ |
| **Tailwind CSS** | Utility-first CSS framework for styling | 3.3.0+ |
| **Framer Motion** | Production-ready motion library for animations | 10.16.0+ |
| **React Hook Form** | Performant forms with easy validation | 7.45.0+ |

### 🚀 Deployment & DevOps
| Platform/Tool | Purpose |
|---------------|---------|
| **Railway** | Backend hosting and deployment |
| **Vercel** | Frontend hosting with global CDN |
| **Docker** | Containerization for consistent deployments |
| **Git** | Version control and collaboration |

### 🧠 Machine Learning Pipeline
| Component | Technology | Purpose |
|-----------|------------|---------|
| **Model** | XGBoost Classifier | Binary classification for ASD prediction |
| **Preprocessing** | Scikit-learn LabelEncoder | Categorical data encoding |
| **Features** | 20+ behavioral & demographic features | Comprehensive assessment data |
| **Training Data** | CSV dataset with validated cases | Historical screening results |

## 📁 Project Architecture

```
autism-prediction-system/
├── 🔧 backend/                    # FastAPI Backend Service
│   ├── main.py                   # Core application with ML integration
│   ├── requirements.txt          # Python dependencies
│   ├── Dockerfile               # Container configuration
│   └── railway.json             # Railway deployment config
├── 🎨 frontend/                   # React Frontend Application
│   ├── src/
│   │   ├── components/          # Reusable React components
│   │   ├── App.jsx             # Main application component
│   │   └── main.jsx            # Application entry point
│   ├── package.json            # Node.js dependencies
│   ├── vite.config.js          # Vite build configuration
│   ├── tailwind.config.js      # Tailwind CSS configuration
│   └── vercel.json             # Vercel deployment config
├── 🤖 models/                     # Machine Learning Assets
│   ├── best_model.pkl          # Trained XGBoost model (binary)
│   ├── encoders.pkl            # Label encoders for preprocessing
│   └── train.csv               # Training dataset
├── 📚 docs/                       # Documentation
└── 🚀 deployment configs          # Platform-specific configs
    ├── Procfile                # Process file for deployment
    ├── railway.toml            # Railway configuration
    └── requirements.txt        # Root-level dependencies
```

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.8+
- **Git** for version control

### 🏃‍♂️ Local Development

1. **Clone the Repository**
   ```bash
   git clone https://github.com/your-username/autism-prediction-system.git
   cd autism-prediction-system
   ```

2. **🔧 Backend Setup**
   ```bash
   cd backend
   pip install -r requirements.txt
   python main.py
   ```
   ✅ Backend available at `http://localhost:8000`

3. **🎨 Frontend Setup**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   ✅ Frontend available at `http://localhost:3000`

### 🌐 Production Deployment

The application is live and accessible:

- **🌍 Live Application**: https://austin-umber.vercel.app/
- **📖 API Documentation**: https://austim-production.up.railway.app/docs
- **🔍 Health Check**: https://austim-production.up.railway.app/health

## 📊 API Reference

### Core Endpoints

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/` | Welcome message | JSON status |
| `GET` | `/health` | System health check | Health status |
| `POST` | `/predict` | ASD prediction | Prediction results |
| `GET` | `/docs` | Interactive API docs | Swagger UI |

### Prediction Request Format
```json
{
  "A1_Score": 1,
  "A2_Score": 0,
  // ... (A1-A10 behavioral scores)
  "age": 25,
  "gender": "m",
  "ethnicity": "White-European",
  "jaundice": "no",
  "austim": "no",
  "used_app_before": "no"
}
```

## 🧠 Machine Learning Model Details

### Model Performance
- **Algorithm**: XGBoost (Extreme Gradient Boosting)
- **Type**: Binary Classification
- **Features**: 20+ behavioral and demographic indicators
- **Accuracy**: Optimized for screening sensitivity

### Feature Categories
1. **Behavioral Assessment** (A1-A10): Core autism screening questions
2. **Demographics**: Age, gender, ethnicity
3. **Medical History**: Jaundice, family history
4. **Previous Screening**: App usage history

### Preprocessing Pipeline
- **Categorical Encoding**: LabelEncoder for text features
- **Feature Scaling**: Normalized input ranges
- **Data Validation**: Pydantic models for type safety

## ⚠️ Important Medical Disclaimer

> **🏥 Medical Disclaimer**: This application is designed for educational and preliminary screening purposes only. It is **NOT** a substitute for professional medical diagnosis, treatment, or advice.
>
> **Always consult with qualified healthcare professionals** for proper medical evaluation, diagnosis, and treatment of autism spectrum disorders or any other medical conditions.

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🆘 Support & Issues

- 🐛 **Bug Reports**: [Open an Issue](https://github.com/your-username/autism-prediction-system/issues)
- 💡 **Feature Requests**: [Request a Feature](https://github.com/your-username/autism-prediction-system/issues)
- 📧 **Contact**: [Your Email](mailto:your-email@example.com)

## 🙏 Acknowledgments

- **Dataset**: Based on autism screening research data
- **ML Framework**: XGBoost development team
- **UI Framework**: React and Tailwind CSS communities
- **Deployment**: Railway and Vercel platforms

---

<div align="center">

**⭐ Star this repository if you found it helpful!**

Made with ❤️ for autism awareness and early screening

</div>
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
