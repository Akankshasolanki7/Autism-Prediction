"""
FastAPI backend for Autism Spectrum Disorder (ASD) Prediction System
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import uvicorn
import pickle
import pandas as pd
import numpy as np
from pathlib import Path
import logging
from typing import Dict, Any
from pydantic import BaseModel, Field
import os

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="ASD Prediction API",
    description="API for predicting Autism Spectrum Disorder using machine learning",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify exact origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and encoders
model = None
encoders = None

class PredictionRequest(BaseModel):
    """Request model for ASD prediction"""
    A1_Score: int = Field(..., ge=0, le=1, description="Answer to question A1 (0 or 1)")
    A2_Score: int = Field(..., ge=0, le=1, description="Answer to question A2 (0 or 1)")
    A3_Score: int = Field(..., ge=0, le=1, description="Answer to question A3 (0 or 1)")
    A4_Score: int = Field(..., ge=0, le=1, description="Answer to question A4 (0 or 1)")
    A5_Score: int = Field(..., ge=0, le=1, description="Answer to question A5 (0 or 1)")
    A6_Score: int = Field(..., ge=0, le=1, description="Answer to question A6 (0 or 1)")
    A7_Score: int = Field(..., ge=0, le=1, description="Answer to question A7 (0 or 1)")
    A8_Score: int = Field(..., ge=0, le=1, description="Answer to question A8 (0 or 1)")
    A9_Score: int = Field(..., ge=0, le=1, description="Answer to question A9 (0 or 1)")
    A10_Score: int = Field(..., ge=0, le=1, description="Answer to question A10 (0 or 1)")
    age: int = Field(..., ge=1, le=120, description="Age in years")
    gender: str = Field(..., description="Gender (m/f)")
    ethnicity: str = Field(..., description="Ethnicity")
    jaundice: str = Field(..., description="History of jaundice (yes/no)")
    austim: str = Field(..., description="Family history of autism (yes/no)")
    contry_of_res: str = Field(..., description="Country of residence")
    used_app_before: str = Field(..., description="Used screening app before (yes/no)")
    relation: str = Field(..., description="Relationship to person being assessed")

class PredictionResponse(BaseModel):
    """Response model for ASD prediction"""
    prediction: int = Field(..., description="Prediction result (0: No ASD, 1: ASD)")
    probability: float = Field(..., description="Probability of ASD (0-1)")
    risk_level: str = Field(..., description="Risk level (Low/Medium/High)")
    total_score: int = Field(..., description="Total score from A1-A10")
    recommendations: list = Field(..., description="Recommendations based on result")

def load_model_and_encoders():
    """Load the trained model and encoders"""
    global model, encoders
    
    try:
        # Get the path to the models directory
        models_dir = Path(__file__).parent.parent / "models"
        
        # Load the trained model
        model_path = models_dir / "best_model.pkl"
        with open(model_path, 'rb') as f:
            model = pickle.load(f)
        logger.info("Model loaded successfully")
        
        # Load the encoders
        encoders_path = models_dir / "encoders.pkl"
        with open(encoders_path, 'rb') as f:
            encoders = pickle.load(f)
        logger.info("Encoders loaded successfully")
        
    except Exception as e:
        logger.error(f"Error loading model or encoders: {str(e)}")
        raise e

@app.on_event("startup")
async def startup_event():
    """Load model and encoders on startup"""
    load_model_and_encoders()

@app.get("/")
async def root():
    """Root endpoint"""
    return {"message": "ASD Prediction API", "status": "running", "version": "1.0.0"}

@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "model_loaded": model is not None,
        "encoders_loaded": encoders is not None
    }

def preprocess_input(data: PredictionRequest) -> pd.DataFrame:
    """Preprocess input data for prediction"""
    try:
        # Convert to dictionary
        input_dict = data.model_dump()

        # Create DataFrame
        df = pd.DataFrame([input_dict])

        # Calculate result (sum of A1-A10 scores)
        a_scores = [f'A{i}_Score' for i in range(1, 11)]
        df['result'] = df[a_scores].sum(axis=1)

        # Define the expected column order based on training data
        expected_columns = [
            'A1_Score', 'A2_Score', 'A3_Score', 'A4_Score', 'A5_Score',
            'A6_Score', 'A7_Score', 'A8_Score', 'A9_Score', 'A10_Score',
            'age', 'gender', 'ethnicity', 'jaundice', 'austim',
            'contry_of_res', 'used_app_before', 'result', 'relation'
        ]

        # Define categorical columns that need encoding
        categorical_columns = ['gender', 'ethnicity', 'jaundice', 'austim',
                             'contry_of_res', 'used_app_before', 'relation']

        # Apply label encoding to categorical columns
        for col in categorical_columns:
            if col in encoders and col in df.columns:
                # Handle unknown categories by using the most frequent category
                try:
                    df[col] = encoders[col].transform(df[col])
                except ValueError:
                    # If category is unknown, use the most frequent category (usually 0)
                    logger.warning(f"Unknown category in {col}, using default value")
                    df[col] = 0

        # Reorder columns to match training data
        df = df[expected_columns]

        return df

    except Exception as e:
        logger.error(f"Error in preprocessing: {str(e)}")
        raise HTTPException(status_code=400, detail=f"Error preprocessing input: {str(e)}")

@app.post("/predict", response_model=PredictionResponse)
async def predict_asd(request: PredictionRequest):
    """Predict ASD based on input features"""
    try:
        if model is None or encoders is None:
            raise HTTPException(status_code=500, detail="Model or encoders not loaded")
        
        # Preprocess input
        processed_data = preprocess_input(request)
        
        # Make prediction
        prediction = model.predict(processed_data)[0]
        prediction_proba = model.predict_proba(processed_data)[0]
        
        # Get probability of positive class (ASD)
        asd_probability = prediction_proba[1] if len(prediction_proba) > 1 else prediction_proba[0]
        
        # Calculate total score
        total_score = sum([
            request.A1_Score, request.A2_Score, request.A3_Score, request.A4_Score,
            request.A5_Score, request.A6_Score, request.A7_Score, request.A8_Score,
            request.A9_Score, request.A10_Score
        ])
        
        # Determine risk level
        if asd_probability < 0.3:
            risk_level = "Low"
        elif asd_probability < 0.7:
            risk_level = "Medium"
        else:
            risk_level = "High"
        
        # Generate recommendations
        recommendations = generate_recommendations(prediction, asd_probability, total_score)
        
        return PredictionResponse(
            prediction=int(prediction),
            probability=float(asd_probability),
            risk_level=risk_level,
            total_score=total_score,
            recommendations=recommendations
        )
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error in prediction: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error making prediction: {str(e)}")

def generate_recommendations(prediction: int, probability: float, total_score: int) -> list:
    """Generate recommendations based on prediction results"""
    recommendations = []
    
    if prediction == 1 or probability > 0.5:
        recommendations.extend([
            "Consider consulting with a qualified healthcare professional for a comprehensive evaluation",
            "Early intervention services may be beneficial if ASD is confirmed",
            "Connect with autism support organizations in your area",
            "Consider behavioral therapy and educational support if needed"
        ])
    else:
        recommendations.extend([
            "Results suggest low likelihood of ASD, but this is not a definitive diagnosis",
            "If you have ongoing concerns, consult with a healthcare professional",
            "Continue monitoring developmental milestones",
            "Maintain regular check-ups with your healthcare provider"
        ])
    
    # Add general recommendations
    recommendations.extend([
        "This screening tool is not a substitute for professional medical diagnosis",
        "Results should be discussed with qualified healthcare professionals",
        "Consider multiple assessments over time for more accurate evaluation"
    ])
    
    return recommendations

@app.get("/questions")
async def get_questions():
    """Get the list of assessment questions"""
    questions = {
        "A1": "I often notice small sounds when others do not",
        "A2": "I usually concentrate more on the whole picture, rather than the small details",
        "A3": "I find it easy to do more than one thing at once",
        "A4": "If there is an interruption, I can switch back to what I was doing very quickly",
        "A5": "I find it easy to 'read between the lines' when someone is talking to me",
        "A6": "I know how to tell if someone listening to me is getting bored",
        "A7": "When I'm reading a story I find it difficult to work out the characters' intentions",
        "A8": "I like to collect information about categories of things",
        "A9": "I find it easy to work out what someone is thinking or feeling just by looking at their face",
        "A10": "I find it difficult to work out people's intentions"
    }
    
    return {"questions": questions}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
