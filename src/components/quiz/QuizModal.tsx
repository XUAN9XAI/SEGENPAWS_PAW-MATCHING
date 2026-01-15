'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ArrowRight, ArrowLeft, Check, Home, Clock, DollarSign, Heart, Sparkles, Loader2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

interface QuizModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Question {
  id: string
  question: string
  options: { label: string; value: string; weight: Record<string, number> }[]
  icon: React.ElementType
}

const defaultQuestions: Question[] = [
  {
    id: 'living_space',
    question: 'What type of living space do you have?',
    icon: Home,
    options: [
      { label: 'Small apartment', value: 'apartment', weight: { cat: 3, bird: 3, dog: 1 } },
      { label: 'House with small yard', value: 'small_yard', weight: { cat: 3, bird: 2, dog: 2 } },
      { label: 'House with large yard', value: 'large_yard', weight: { cat: 2, bird: 2, dog: 3 } },
      { label: 'Rural property', value: 'rural', weight: { cat: 2, bird: 1, dog: 3 } },
    ]
  },
  {
    id: 'time_availability',
    question: 'How much time can you dedicate daily to pet care?',
    icon: Clock,
    options: [
      { label: 'Less than 1 hour', value: 'minimal', weight: { cat: 3, bird: 2, dog: 0 } },
      { label: '1-2 hours', value: 'moderate', weight: { cat: 3, bird: 3, dog: 2 } },
      { label: '2-4 hours', value: 'good', weight: { cat: 2, bird: 2, dog: 3 } },
      { label: 'More than 4 hours', value: 'extensive', weight: { cat: 2, bird: 2, dog: 3 } },
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your monthly budget for pet care?',
    icon: DollarSign,
    options: [
      { label: 'Under $50', value: 'low', weight: { cat: 2, bird: 3, dog: 1 } },
      { label: '$50-$100', value: 'moderate', weight: { cat: 3, bird: 3, dog: 2 } },
      { label: '$100-$200', value: 'good', weight: { cat: 3, bird: 2, dog: 3 } },
      { label: 'Over $200', value: 'high', weight: { cat: 2, bird: 2, dog: 3 } },
    ]
  },
  {
    id: 'experience',
    question: 'What\'s your experience level with pets?',
    icon: Heart,
    options: [
      { label: 'First-time pet owner', value: 'beginner', weight: { cat: 3, bird: 2, dog: 2 } },
      { label: 'Had pets as a child', value: 'some', weight: { cat: 3, bird: 3, dog: 3 } },
      { label: 'Currently have/had pets', value: 'experienced', weight: { cat: 3, bird: 3, dog: 3 } },
      { label: 'Professional experience', value: 'professional', weight: { cat: 3, bird: 3, dog: 3 } },
    ]
  },
  {
    id: 'allergies',
    question: 'Do you or anyone in your household have pet allergies?',
    icon: Sparkles,
    options: [
      { label: 'No allergies', value: 'none', weight: { cat: 3, bird: 3, dog: 3 } },
      { label: 'Mild allergies to fur', value: 'mild_fur', weight: { cat: 1, bird: 3, dog: 1 } },
      { label: 'Severe allergies to fur', value: 'severe_fur', weight: { cat: 0, bird: 3, dog: 0 } },
      { label: 'Allergies to feathers/dander', value: 'feathers', weight: { cat: 2, bird: 0, dog: 2 } },
    ]
  },
]

interface QuizResult {
  category: 'dog' | 'cat' | 'bird'
  score: number
  percentage: number
}

export function QuizModal({ isOpen, onClose }: QuizModalProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<QuizResult[]>([])
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()

  const questions = defaultQuestions

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }))
  }

  const calculateResults = () => {
    const scores = { dog: 0, cat: 0, bird: 0 }
    
    questions.forEach(question => {
      const answer = answers[question.id]
      if (answer) {
        const option = question.options.find(o => o.value === answer)
        if (option) {
          Object.entries(option.weight).forEach(([pet, weight]) => {
            scores[pet as keyof typeof scores] += weight
          })
        }
      }
    })

    const maxPossible = questions.length * 3
    const resultArray: QuizResult[] = Object.entries(scores)
      .map(([category, score]) => ({
        category: category as 'dog' | 'cat' | 'bird',
        score,
        percentage: Math.round((score / maxPossible) * 100)
      }))
      .sort((a, b) => b.score - a.score)

    return resultArray
  }

  const handleSubmit = async () => {
    setSaving(true)
    const resultArray = calculateResults()
    setResults(resultArray)

    // Generate a session ID for anonymous users
    const sessionId = user?.id || `anon_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Save to database
    await supabase.from('quiz_results').insert({
      session_id: sessionId,
      user_id: user?.id || null,
      answers,
      recommended_category: resultArray[0]?.category,
      recommended_pets: resultArray.map(r => r.category),
      score_breakdown: resultArray.reduce((acc, r) => ({ ...acc, [r.category]: r.score }), {})
    })

    setSaving(false)
    setShowResults(true)
  }

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleSubmit()
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const resetQuiz = () => {
    setCurrentStep(0)
    setAnswers({})
    setShowResults(false)
    setResults([])
  }

  const currentQuestion = questions[currentStep]
  const canProceed = answers[currentQuestion?.id]

  if (!isOpen) return null

  const categoryEmojis = { dog: '🐕', cat: '🐱', bird: '🦜' }
  const categoryNames = { dog: 'Dogs', cat: 'Cats', bird: 'Birds' }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white relative flex-shrink-0">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-2xl font-bold">
              {showResults ? '🎉 Your Results!' : 'Pet Match Quiz'}
            </h2>
            {!showResults && (
              <p className="text-white/80 mt-1">
                Question {currentStep + 1} of {questions.length}
              </p>
            )}
          </div>

          {/* Progress Bar */}
          {!showResults && (
            <div className="h-2 bg-gray-100 flex-shrink-0">
              <motion.div
                className="h-full bg-amber-500"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          )}

          {/* Content */}
          <div className="p-6 overflow-y-auto flex-1">
            {showResults ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="text-center">
                  <p className="text-gray-600 mb-4">
                    Based on your answers, here's your pet compatibility:
                  </p>
                </div>

                <div className="space-y-4">
                  {results.map((result, index) => (
                    <motion.div
                      key={result.category}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className={`p-4 rounded-2xl border-2 ${
                        index === 0 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-gray-200 bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl">{categoryEmojis[result.category]}</span>
                          <div>
                            <h3 className="font-bold text-gray-900 text-lg">
                              {categoryNames[result.category]}
                              {index === 0 && (
                                <span className="ml-2 text-amber-600 text-sm">Best Match!</span>
                              )}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {result.percentage}% compatibility
                            </p>
                          </div>
                        </div>
                        <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${index === 0 ? 'bg-amber-500' : 'bg-gray-400'}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${result.percentage}%` }}
                            transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-4">
                  <Link
                    to={`/pets/${results[0]?.category}`}
                    onClick={onClose}
                    className="flex-1"
                  >
                    <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white py-6">
                      Explore {categoryNames[results[0]?.category]}
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    onClick={resetQuiz}
                    className="flex-1 py-6"
                  >
                    Retake Quiz
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-amber-100 rounded-xl flex items-center justify-center">
                    <currentQuestion.icon className="w-7 h-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {currentQuestion.question}
                  </h3>
                </div>

                <div className="space-y-3">
                  {currentQuestion.options.map((option) => {
                    const isSelected = answers[currentQuestion.id] === option.value
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleAnswer(currentQuestion.id, option.value)}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-50 text-amber-900'
                            : 'border-gray-200 hover:border-amber-300 hover:bg-amber-50/50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{option.label}</span>
                          {isSelected && (
                            <Check className="w-5 h-5 text-amber-600" />
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </div>

          {/* Footer Navigation */}
          {!showResults && (
            <div className="p-6 border-t border-gray-200 flex justify-between flex-shrink-0">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 0}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Previous
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed || saving}
                className="bg-amber-600 hover:bg-amber-700 text-white gap-2"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : currentStep === questions.length - 1 ? (
                  <>See Results</>
                ) : (
                  <>
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
