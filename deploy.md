# Deployment Instructions

## Step 1: Create GitHub Repository

1. Go to https://github.com and create a new repository
2. Name it: `autism-prediction-system`
3. Make it public or private (your choice)
4. Don't initialize with README (we already have one)

## Step 2: Push to GitHub

Run these commands in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/autism-prediction-system.git
git branch -M main
git push -u origin main
```

## Step 3: Deploy Backend to Railway

1. Go to https://railway.app
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose your `autism-prediction-system` repository
6. Railway will automatically detect the backend and deploy it
7. Your backend will be available at a URL like: `https://your-app-name.railway.app`

## Step 4: Deploy Frontend to Vercel

1. Go to https://vercel.com
2. Sign up/login with your GitHub account
3. Click "New Project"
4. Import your GitHub repository
5. Set the framework preset to "Vite"
6. Set the root directory to `frontend`
7. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: Your Railway backend URL (from step 3)
8. Deploy!

## Step 5: Update CORS Settings

After deployment, update the backend CORS settings:

1. In `backend/main.py`, update the CORS origins:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://your-vercel-app.vercel.app"],  # Your frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. Commit and push the changes:
```bash
git add .
git commit -m "Update CORS for production"
git push
```

Railway will automatically redeploy with the new settings.

## Alternative: One-Click Deploy

### Backend (Railway)
[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/new/template)

### Frontend (Vercel)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)

## Verification

1. Visit your frontend URL
2. Complete the assessment form
3. Verify that predictions work correctly
4. Check that the results display properly

Your application should now be live and accessible to users worldwide!
