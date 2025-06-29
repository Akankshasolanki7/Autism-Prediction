# Deployment Guide

This guide will help you deploy the ASD Prediction System to production.

## Architecture Overview

- **Frontend**: React application built with Vite
- **Backend**: FastAPI Python application
- **Models**: Pre-trained ML models (XGBoost + encoders)

## Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- Git

### Backend Setup
```bash
cd backend
pip install -r requirements.txt
python main.py
```
The backend will be available at `http://localhost:8000`

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
The frontend will be available at `http://localhost:3000`

## Production Deployment

### Option 1: Railway (Recommended for Backend)

1. **Backend Deployment**:
   - Push your code to GitHub
   - Connect your GitHub repo to Railway
   - Railway will automatically detect the `railway.json` configuration
   - Set environment variables if needed
   - Deploy!

2. **Frontend Deployment on Vercel**:
   ```bash
   cd frontend
   npm run build
   # Deploy the dist/ folder to Vercel
   ```

### Option 2: Render

1. **Backend on Render**:
   - Connect your GitHub repository
   - Render will use the `render.yaml` configuration
   - Set build command: `pip install -r requirements.txt`
   - Set start command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

2. **Frontend on Netlify**:
   ```bash
   cd frontend
   npm run build
   # Deploy the dist/ folder to Netlify
   ```

### Option 3: Docker Deployment

1. **Build Backend Docker Image**:
   ```bash
   cd backend
   docker build -t asd-prediction-backend .
   docker run -p 8000:8000 asd-prediction-backend
   ```

2. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   # Serve the dist/ folder with any static file server
   ```

## Environment Configuration

### Backend Environment Variables
- `PORT`: Server port (default: 8000)
- `CORS_ORIGINS`: Allowed CORS origins (set to your frontend URL)

### Frontend Environment Variables
- `VITE_API_URL`: Backend API URL (update in production)

## Production Checklist

### Security
- [ ] Update CORS origins to only allow your frontend domain
- [ ] Enable HTTPS for both frontend and backend
- [ ] Add rate limiting to the API
- [ ] Implement proper error handling

### Performance
- [ ] Enable gzip compression
- [ ] Add CDN for static assets
- [ ] Implement caching strategies
- [ ] Monitor API response times

### Monitoring
- [ ] Set up application monitoring (e.g., Sentry)
- [ ] Configure logging
- [ ] Set up health checks
- [ ] Monitor model performance

## Deployment Commands

### Railway Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy frontend
cd frontend
vercel --prod
```

### Manual Server Deployment
```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --workers 4

# Frontend (build and serve)
cd frontend
npm run build
npx serve -s dist -l 3000
```

## Troubleshooting

### Common Issues

1. **CORS Errors**: Update the CORS origins in `backend/main.py`
2. **Model Loading Errors**: Ensure model files are included in deployment
3. **Build Failures**: Check Node.js and Python versions
4. **API Connection Issues**: Verify the API URL in frontend configuration

### Health Checks

- Backend health: `GET /health`
- Frontend: Check if the application loads properly
- API functionality: Test a prediction request

## Scaling Considerations

### Backend Scaling
- Use multiple workers with Gunicorn
- Implement Redis for caching
- Consider load balancing for high traffic

### Frontend Scaling
- Use CDN for global distribution
- Implement service workers for offline functionality
- Optimize bundle size and lazy loading

## Support

For deployment issues:
1. Check the application logs
2. Verify all environment variables are set
3. Test the API endpoints manually
4. Check network connectivity between services

## Security Notes

⚠️ **Important**: This application handles health-related data. Ensure compliance with relevant regulations (HIPAA, GDPR, etc.) in your deployment environment.

- Use HTTPS in production
- Implement proper authentication if needed
- Regular security audits
- Keep dependencies updated
