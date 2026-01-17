'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Home, Clock, DollarSign, Heart, Sparkles, Check, RotateCcw, PawPrint } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { supabase } from '@/integrations/supabase/client'
import { Footer } from '@/components/Footer'

interface Question {
  id: string
  question: string
  options: { value: string; label: string; icon?: string }[]
  factor: string
}

interface PetRecommendation {
  category: string
  name: string
  score: number
  description: string
  image: string
}

const quizQuestions: Question[] = [
  {
    id: 'living_space',
    question: 'What type of living space do you have?',
    factor: 'Living Space',
    options: [
      { value: 'apartment', label: 'Apartment / Studio', icon: '🏢' },
      { value: 'house_small', label: 'House with small yard', icon: '🏠' },
      { value: 'house_large', label: 'House with large yard', icon: '🏡' },
      { value: 'rural', label: 'Rural property / Farm', icon: '🌾' }
    ]
  },
  {
    id: 'time_available',
    question: 'How much time can you dedicate to pet care daily?',
    factor: 'Time Availability',
    options: [
      { value: 'minimal', label: 'Less than 1 hour', icon: '⏰' },
      { value: 'moderate', label: '1-2 hours', icon: '🕐' },
      { value: 'substantial', label: '2-4 hours', icon: '🕑' },
      { value: 'extensive', label: 'More than 4 hours', icon: '🕓' }
    ]
  },
  {
    id: 'budget',
    question: 'What is your monthly budget for pet care?',
    factor: 'Budget',
    options: [
      { value: 'low', label: 'Under $50', icon: '💵' },
      { value: 'moderate', label: '$50 - $150', icon: '💰' },
      { value: 'high', label: '$150 - $300', icon: '💎' },
      { value: 'flexible', label: 'Over $300 / Flexible', icon: '👑' }
    ]
  },
  {
    id: 'experience',
    question: 'What is your experience level with pets?',
    factor: 'Experience Level',
    options: [
      { value: 'none', label: 'First-time pet owner', icon: '🌱' },
      { value: 'some', label: 'Had pets as a child', icon: '🌿' },
      { value: 'moderate', label: 'Currently own / recently owned pets', icon: '🌳' },
      { value: 'expert', label: 'Experienced pet parent', icon: '🏆' }
    ]
  },
  {
    id: 'allergies',
    question: 'Do you or anyone in your household have pet allergies?',
    factor: 'Allergies',
    options: [
      { value: 'none', label: 'No known allergies', icon: '✅' },
      { value: 'mild', label: 'Mild allergies (manageable)', icon: '🤧' },
      { value: 'moderate', label: 'Moderate allergies', icon: '⚠️' },
      { value: 'severe', label: 'Severe allergies', icon: '🚫' }
    ]
  }
]

const petRecommendations: Record<string, PetRecommendation[]> = {
  dog: [
    { category: 'dog', name: 'Golden Retriever', score: 0, description: 'Friendly, devoted, and intelligent family companion', image: '🐕' },
    { category: 'dog', name: 'Labrador Retriever', score: 0, description: 'Outgoing, active, and gentle with families', image: '🦮' },
    { category: 'dog', name: 'French Bulldog', score: 0, description: 'Playful, adaptable, and great for apartments', image: '🐶' }
  ],
  cat: [
    { category: 'cat', name: 'Persian Cat', score: 0, description: 'Calm, affectionate, and low-maintenance', image: '🐱' },
    { category: 'cat', name: 'Siamese', score: 0, description: 'Vocal, social, and highly intelligent', image: '😺' },
    { category: 'cat', name: 'Maine Coon', score: 0, description: 'Gentle giant with dog-like personality', image: '😸' }
  ],
  bird: [
    { category: 'bird', name: 'Budgie', score: 0, description: 'Cheerful, easy to care for, and great for beginners', image: '🐦' },
    { category: 'bird', name: 'Cockatiel', score: 0, description: 'Affectionate, whistles tunes, and loves attention', image: '🦜' },
    { category: 'bird', name: 'Canary', score: 0, description: 'Beautiful singers, independent, and low maintenance', image: '🐤' }
  ]
}

function calculateRecommendations(answers: Record<string, string>): PetRecommendation[] {
  const scores: Record<string, number> = { dog: 0, cat: 0, bird: 0 }

  // Living space scoring
  if (answers.living_space === 'apartment') {
    scores.cat += 3; scores.bird += 3; scores.dog += 1
  } else if (answers.living_space === 'house_small') {
    scores.cat += 2; scores.bird += 2; scores.dog += 3
  } else if (answers.living_space === 'house_large' || answers.living_space === 'rural') {
    scores.dog += 3; scores.cat += 2; scores.bird += 2
  }

  // Time availability scoring
  if (answers.time_available === 'minimal') {
    scores.cat += 3; scores.bird += 2; scores.dog += 0
  } else if (answers.time_available === 'moderate') {
    scores.cat += 3; scores.bird += 2; scores.dog += 2
  } else if (answers.time_available === 'substantial' || answers.time_available === 'extensive') {
    scores.dog += 3; scores.cat += 2; scores.bird += 2
  }

  // Budget scoring
  if (answers.budget === 'low') {
    scores.bird += 3; scores.cat += 2; scores.dog += 1
  } else if (answers.budget === 'moderate') {
    scores.cat += 3; scores.bird += 2; scores.dog += 2
  } else {
    scores.dog += 3; scores.cat += 3; scores.bird += 2
  }

  // Experience scoring
  if (answers.experience === 'none') {
    scores.cat += 2; scores.bird += 3; scores.dog += 1
  } else if (answers.experience === 'some') {
    scores.cat += 3; scores.dog += 2; scores.bird += 2
  } else {
    scores.dog += 3; scores.cat += 3; scores.bird += 2
  }

  // Allergies scoring
  if (answers.allergies === 'severe') {
    scores.bird += 3; scores.dog -= 2; scores.cat -= 1
  } else if (answers.allergies === 'moderate') {
    scores.bird += 2; scores.cat += 1; scores.dog += 0
  } else {
    scores.dog += 2; scores.cat += 2; scores.bird += 2
  }

  // Get sorted categories
  const sortedCategories = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .map(([category]) => category)

  // Return top recommendations
  const recommendations: PetRecommendation[] = []
  sortedCategories.forEach((category, index) => {
    const pets = petRecommendations[category]
    if (pets) {
      pets.forEach(pet => {
        recommendations.push({
          ...pet,
          score: scores[category] - index * 2
        })
      })
    }
  })

  return recommendations.sort((a, b) => b.score - a.score).slice(0, 6)
}

export default function QuizPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [recommendations, setRecommendations] = useState<PetRecommendation[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const progress = ((currentStep + 1) / quizQuestions.length) * 100
  const currentQuestion = quizQuestions[currentStep]
  const isLastQuestion = currentStep === quizQuestions.length - 1
  const canProceed = answers[currentQuestion?.id]

  const handleAnswer = (value: string) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: value }))
  }

  const handleNext = async () => {
    if (isLastQuestion) {
      setIsSubmitting(true)
      const results = calculateRecommendations(answers)
      setRecommendations(results)

      // Save to database
      try {
        const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        await supabase.from('quiz_results').insert({
          session_id: sessionId,
          answers: answers,
          recommended_category: results[0]?.category as 'dog' | 'cat' | 'bird' | null,
          recommended_pets: results.slice(0, 3).map(r => r.name),
          score_breakdown: { dog: 0, cat: 0, bird: 0 } // Simplified for now
        })
      } catch (error) {
        console.error('Failed to save quiz results:', error)
      }

      setIsSubmitting(false)
      setShowResults(true)
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleRestart = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setRecommendations([])
  }

  const getFactorIcon = (factor: string) => {
    switch (factor) {
      case 'Living Space': return <Home className="w-5 h-5" />
      case 'Time Availability': return <Clock className="w-5 h-5" />
      case 'Budget': return <DollarSign className="w-5 h-5" />
      case 'Experience Level': return <Heart className="w-5 h-5" />
      case 'Allergies': return <Sparkles className="w-5 h-5" />
      default: return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-bagel text-xl text-black hover:opacity-80 transition-opacity">
            SEGENPAWS
          </Link>
          <Link to="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-3xl">
          <AnimatePresence mode="wait">
            {!showResults ? (
              <motion.div
                key="quiz"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Progress */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-600">
                      Question {currentStep + 1} of {quizQuestions.length}
                    </span>
                    <span className="text-sm font-medium text-amber-600">
                      {Math.round(progress)}% Complete
                    </span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                {/* Question Card */}
                <motion.div
                  key={currentQuestion.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
                >
                  {/* Factor Badge */}
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                      {getFactorIcon(currentQuestion.factor)}
                    </div>
                    <span className="text-sm font-semibold text-amber-700">
                      {currentQuestion.factor}
                    </span>
                  </div>

                  {/* Question */}
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
                    {currentQuestion.question}
                  </h2>

                  {/* Options */}
                  <div className="space-y-4">
                    {currentQuestion.options.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(option.value)}
                        className={`w-full text-left p-5 rounded-2xl border-2 transition-all ${
                          answers[currentQuestion.id] === option.value
                            ? 'border-amber-500 bg-amber-50'
                            : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{option.icon}</span>
                          <span className="font-medium text-gray-800">{option.label}</span>
                          {answers[currentQuestion.id] === option.value && (
                            <Check className="w-5 h-5 text-amber-600 ml-auto" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Navigation */}
                  <div className="flex justify-between mt-10">
                    <Button
                      variant="outline"
                      onClick={handleBack}
                      disabled={currentStep === 0}
                      className="gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!canProceed || isSubmitting}
                      className="gap-2 bg-amber-600 hover:bg-amber-700"
                    >
                      {isSubmitting ? 'Analyzing...' : isLastQuestion ? 'See Results' : 'Next'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Results Header */}
                <div className="text-center mb-12">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring' }}
                    className="w-20 h-20 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <PawPrint className="w-10 h-10 text-white" />
                  </motion.div>
                  <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-4">
                    Your Perfect Pet Matches!
                  </h2>
                  <p className="text-lg text-gray-600 max-w-xl mx-auto">
                    Based on your lifestyle and preferences, here are the pets that would be the best companions for you.
                  </p>
                </div>

                {/* Recommendations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                  {recommendations.map((pet, index) => (
                    <motion.div
                      key={`${pet.category}-${pet.name}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                    >
                      {index === 0 && (
                        <div className="inline-block bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                          Top Match
                        </div>
                      )}
                      <div className="text-5xl mb-4">{pet.image}</div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{pet.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{pet.description}</p>
                      <Link to={`/pets/${pet.category}`}>
                        <Button variant="outline" className="w-full">
                          Learn More
                        </Button>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button
                    onClick={handleRestart}
                    variant="outline"
                    className="gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Retake Quiz
                  </Button>
                  <Link to="/">
                    <Button className="gap-2 bg-amber-600 hover:bg-amber-700">
                      <Home className="w-4 h-4" />
                      Back to Home
                    </Button>
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  )
}
