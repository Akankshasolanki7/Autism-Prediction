import React, { useState } from 'react'
import { motion } from 'framer-motion'
import AssessmentForm from './components/AssessmentForm'
import ResultsDisplay from './components/ResultsDisplay'
import Header from './components/Header'
import Footer from './components/Footer'

function App() {
  const [currentStep, setCurrentStep] = useState('form') // 'form' or 'results'
  const [predictionResult, setPredictionResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleFormSubmit = async (formData) => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      
      if (!response.ok) {
        throw new Error('Failed to get prediction')
      }
      
      const result = await response.json()
      setPredictionResult(result)
      setCurrentStep('results')
    } catch (error) {
      console.error('Error:', error)
      alert('Failed to get prediction. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setCurrentStep('form')
    setPredictionResult(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="relative -mt-16 pt-16">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            {currentStep === 'form' && (
              <AssessmentForm
                onSubmit={handleFormSubmit}
                isLoading={isLoading}
              />
            )}

            {currentStep === 'results' && predictionResult && (
              <ResultsDisplay
                result={predictionResult}
                onReset={handleReset}
              />
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
