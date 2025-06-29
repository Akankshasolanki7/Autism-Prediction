import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'

const questions = {
  A1: "I often notice small sounds when others do not",
  A2: "I usually concentrate more on the whole picture, rather than the small details",
  A3: "I find it easy to do more than one thing at once",
  A4: "If there is an interruption, I can switch back to what I was doing very quickly",
  A5: "I find it easy to 'read between the lines' when someone is talking to me",
  A6: "I know how to tell if someone listening to me is getting bored",
  A7: "When I'm reading a story I find it difficult to work out the characters' intentions",
  A8: "I like to collect information about categories of things",
  A9: "I find it easy to work out what someone is thinking or feeling just by looking at their face",
  A10: "I find it difficult to work out people's intentions"
}

const ethnicityOptions = [
  "White-European", "Middle Eastern", "Pasifika", "Black", "Others",
  "Hispanic", "Asian", "Turkish", "South Asian", "Latino", "?"
]

const countryOptions = [
  "United States", "United Kingdom", "Canada", "Australia", "India",
  "Germany", "France", "Italy", "Spain", "Netherlands", "Sweden",
  "Brazil", "Argentina", "Mexico", "Japan", "China", "South Korea",
  "New Zealand", "South Africa", "Egypt", "Others"
]

const relationOptions = [
  "Self", "Parent", "Relative", "Health care professional", "Others", "?"
]

const AssessmentForm = ({ onSubmit, isLoading }) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [currentSection, setCurrentSection] = useState(0)

  const sections = [
    { title: "Behavioral Questions", fields: "questions" },
    { title: "Personal Information", fields: "personal" },
    { title: "Background Information", fields: "background" }
  ]

  const onFormSubmit = (data) => {
    // Convert string values to appropriate types
    const formattedData = {
      ...data,
      age: parseInt(data.age),
      A1_Score: parseInt(data.A1_Score),
      A2_Score: parseInt(data.A2_Score),
      A3_Score: parseInt(data.A3_Score),
      A4_Score: parseInt(data.A4_Score),
      A5_Score: parseInt(data.A5_Score),
      A6_Score: parseInt(data.A6_Score),
      A7_Score: parseInt(data.A7_Score),
      A8_Score: parseInt(data.A8_Score),
      A9_Score: parseInt(data.A9_Score),
      A10_Score: parseInt(data.A10_Score),
    }
    onSubmit(formattedData)
  }

  const nextSection = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1)
    }
  }

  const prevSection = () => {
    if (currentSection > 0) {
      setCurrentSection(currentSection - 1)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white rounded-2xl shadow-2xl overflow-hidden"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">
              {sections[currentSection].title}
            </h2>
            <p className="text-blue-100 text-sm">
              Step {currentSection + 1} of {sections.length}
            </p>
          </div>
          <div className="text-right">
            <div className="text-white text-sm font-medium mb-1">Progress</div>
            <div className="text-2xl font-bold text-white">
              {Math.round(((currentSection + 1) / sections.length) * 100)}%
            </div>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs text-blue-200 mb-2">
            {sections.map((section, index) => (
              <span key={index} className={index <= currentSection ? 'text-white font-medium' : ''}>
                {section.title}
              </span>
            ))}
          </div>
          <div className="w-full bg-blue-800 bg-opacity-30 rounded-full h-2">
            <motion.div
              className="bg-white h-2 rounded-full shadow-sm"
              initial={{ width: 0 }}
              animate={{ width: `${((currentSection + 1) / sections.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-8">

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Behavioral Questions Section */}
        {currentSection === 0 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-8">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Instructions</h3>
                  <div className="mt-1 text-sm text-blue-700">
                    <p>Please answer the following questions based on your typical behavior. Select "Yes" if the statement applies to you, "No" if it doesn't. Take your time and answer honestly.</p>
                  </div>
                </div>
              </div>
            </div>

            {Object.entries(questions).map(([key, question], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div className="flex-1">
                    <label className="block text-gray-800 font-medium mb-4 leading-relaxed">
                      {question}
                    </label>
                    <div className="flex space-x-6">
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          value="1"
                          {...register(`${key}_Score`, { required: "This field is required" })}
                          className="sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-green-300 rounded-full mr-3 group-hover:border-green-400 transition-colors duration-200 flex items-center justify-center">
                          <div className="w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                        </div>
                        <span className="text-green-600 font-semibold group-hover:text-green-700">Yes</span>
                      </label>
                      <label className="flex items-center cursor-pointer group">
                        <input
                          type="radio"
                          value="0"
                          {...register(`${key}_Score`, { required: "This field is required" })}
                          className="sr-only"
                        />
                        <div className="w-5 h-5 border-2 border-red-300 rounded-full mr-3 group-hover:border-red-400 transition-colors duration-200 flex items-center justify-center">
                          <div className="w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                        </div>
                        <span className="text-red-600 font-semibold group-hover:text-red-700">No</span>
                      </label>
                    </div>
                    {errors[`${key}_Score`] && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center"
                      >
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors[`${key}_Score`].message}
                      </motion.p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Personal Information Section */}
        {currentSection === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-600 text-sm">Please provide some basic information about yourself or the person being assessed.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 12v-2m0 0V9a2 2 0 012-2h2a2 2 0 012 2v8a2 2 0 01-2 2H10a2 2 0 01-2-2z" />
                    </svg>
                    Age
                  </span>
                </label>
                <input
                  type="number"
                  min="1"
                  max="120"
                  placeholder="Enter age"
                  {...register("age", {
                    required: "Age is required",
                    min: { value: 1, message: "Age must be at least 1" },
                    max: { value: 120, message: "Age must be less than 120" }
                  })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 placeholder-gray-400"
                />
                {errors.age && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.age.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Gender
                  </span>
                </label>
                <select
                  {...register("gender", { required: "Gender is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 bg-white"
                >
                  <option value="">Select Gender</option>
                  <option value="m">Male</option>
                  <option value="f">Female</option>
                </select>
                {errors.gender && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.gender.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ethnicity
                  </span>
                </label>
                <select
                  {...register("ethnicity", { required: "Ethnicity is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 bg-white"
                >
                  <option value="">Select Ethnicity</option>
                  {ethnicityOptions.map(option => (
                    <option key={option} value={option}>{option === '?' ? 'Prefer not to say' : option}</option>
                  ))}
                </select>
                {errors.ethnicity && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.ethnicity.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="space-y-2"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Country of Residence
                  </span>
                </label>
                <select
                  {...register("contry_of_res", { required: "Country is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 bg-white"
                >
                  <option value="">Select Country</option>
                  {countryOptions.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
                {errors.contry_of_res && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-1 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.contry_of_res.message}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Background Information Section */}
        {currentSection === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Background Information</h3>
              <p className="text-gray-600 text-sm">Please provide some background information that may be relevant to the assessment.</p>
            </div>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    History of Jaundice
                  </span>
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="yes"
                      {...register("jaundice", { required: "This field is required" })}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-green-300 rounded-full mr-3 group-hover:border-green-400 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                    </div>
                    <span className="text-green-600 font-semibold group-hover:text-green-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="no"
                      {...register("jaundice", { required: "This field is required" })}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-red-300 rounded-full mr-3 group-hover:border-red-400 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                    </div>
                    <span className="text-red-600 font-semibold group-hover:text-red-700">No</span>
                  </label>
                </div>
                {errors.jaundice && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.jaundice.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Family History of Autism
                  </span>
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="yes"
                      {...register("austim", { required: "This field is required" })}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-green-300 rounded-full mr-3 group-hover:border-green-400 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                    </div>
                    <span className="text-green-600 font-semibold group-hover:text-green-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="no"
                      {...register("austim", { required: "This field is required" })}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-red-300 rounded-full mr-3 group-hover:border-red-400 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                    </div>
                    <span className="text-red-600 font-semibold group-hover:text-red-700">No</span>
                  </label>
                </div>
                {errors.austim && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.austim.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.3 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    Used Screening App Before
                  </span>
                </label>
                <div className="flex space-x-6">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="yes"
                      {...register("used_app_before", { required: "This field is required" })}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-green-300 rounded-full mr-3 group-hover:border-green-400 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-3 h-3 bg-green-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                    </div>
                    <span className="text-green-600 font-semibold group-hover:text-green-700">Yes</span>
                  </label>
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="radio"
                      value="no"
                      {...register("used_app_before", { required: "This field is required" })}
                      className="sr-only"
                    />
                    <div className="w-5 h-5 border-2 border-red-300 rounded-full mr-3 group-hover:border-red-400 transition-colors duration-200 flex items-center justify-center">
                      <div className="w-3 h-3 bg-red-500 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-200"></div>
                    </div>
                    <span className="text-red-600 font-semibold group-hover:text-red-700">No</span>
                  </label>
                </div>
                {errors.used_app_before && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.used_app_before.message}
                  </motion.p>
                )}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.3 }}
                className="bg-white border-2 border-gray-200 rounded-xl p-6"
              >
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  <span className="flex items-center">
                    <svg className="w-4 h-4 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Relationship to Person Being Assessed
                  </span>
                </label>
                <select
                  {...register("relation", { required: "Relationship is required" })}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-gray-800 bg-white"
                >
                  <option value="">Select Relationship</option>
                  {relationOptions.map(option => (
                    <option key={option} value={option}>{option === '?' ? 'Prefer not to say' : option}</option>
                  ))}
                </select>
                {errors.relation && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-500 text-sm mt-2 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {errors.relation.message}
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center pt-8 mt-8 border-t border-gray-200">
          <motion.button
            type="button"
            onClick={prevSection}
            disabled={currentSection === 0}
            whileHover={currentSection !== 0 ? { scale: 1.02 } : {}}
            whileTap={currentSection !== 0 ? { scale: 0.98 } : {}}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${
              currentSection === 0
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-gray-600 text-white hover:bg-gray-700 shadow-lg hover:shadow-xl'
            }`}
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </motion.button>

          <div className="flex items-center space-x-2 text-sm text-gray-500">
            {sections.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index <= currentSection ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {currentSection < sections.length - 1 ? (
            <motion.button
              type="button"
              onClick={nextSection}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Next
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          ) : (
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={!isLoading ? { scale: 1.02 } : {}}
              whileTap={!isLoading ? { scale: 0.98 } : {}}
              className={`flex items-center px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:from-green-700 hover:to-emerald-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Get Prediction
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>
      </div>
    </motion.div>
  )
}

export default AssessmentForm
