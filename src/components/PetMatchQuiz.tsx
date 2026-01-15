'use client'

import { motion } from 'framer-motion'
import { Heart, Home, Clock, DollarSign, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from './ui/button'

export function PetMatchQuiz() {
  const factors = [
    {
      icon: Home,
      title: 'Living Space',
      description: 'Apartment, house with yard, or rural property'
    },
    {
      icon: Clock,
      title: 'Time Availability',
      description: 'Hours per day for pet care and interaction'
    },
    {
      icon: DollarSign,
      title: 'Budget',
      description: 'Monthly costs for food, vet, and supplies'
    },
    {
      icon: Heart,
      title: 'Experience Level',
      description: 'First-time owner or experienced pet parent'
    },
    {
      icon: Sparkles,
      title: 'Allergies',
      description: 'Any sensitivities to fur, feathers, or dander'
    }
  ]

  return (
    <section id="quiz" className="relative py-24 bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-amber-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 bg-orange-200/30 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-amber-700">
              Personalized Matching
            </span>
            <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Pet Match Quiz
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Answer a few simple questions about your lifestyle, and we'll recommend 
            the perfect pet companion for you.
          </p>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl p-8 lg:p-12 mb-12"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            What We Consider
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {factors.map((factor, index) => (
              <motion.div
                key={factor.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <factor.icon className="w-7 h-7 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 mb-2">{factor.title}</h4>
                <p className="text-sm text-gray-600">{factor.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-10 py-6 rounded-full shadow-lg hover:shadow-xl transition-all group"
          >
            Start the Quiz
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="text-sm text-gray-500 mt-4">
            Takes about 3 minutes • 100% free
          </p>
        </motion.div>
      </div>
    </section>
  )
}
