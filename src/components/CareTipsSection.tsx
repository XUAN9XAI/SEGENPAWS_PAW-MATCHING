'use client'

import { motion } from 'framer-motion'
import { Utensils, Sparkles, GraduationCap, HeartPulse, Brain, ArrowRight } from 'lucide-react'

export function CareTipsSection() {
  const categories = [
    {
      icon: Utensils,
      title: 'Feeding & Nutrition',
      description: 'Balanced diets for every life stage',
      color: 'bg-orange-500',
      articles: 12
    },
    {
      icon: Sparkles,
      title: 'Grooming & Hygiene',
      description: 'Keep your pet clean and healthy',
      color: 'bg-pink-500',
      articles: 8
    },
    {
      icon: GraduationCap,
      title: 'Training & Behavior',
      description: 'Build good habits from day one',
      color: 'bg-blue-500',
      articles: 15
    },
    {
      icon: HeartPulse,
      title: 'Health & Vaccination',
      description: 'Preventive care essentials',
      color: 'bg-red-500',
      articles: 10
    },
    {
      icon: Brain,
      title: 'Mental Stimulation',
      description: 'Keep your pet happy and engaged',
      color: 'bg-purple-500',
      articles: 7
    }
  ]

  return (
    <section id="care-tips" className="relative py-24 bg-white">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-emerald-600">
              Expert Guidance
            </span>
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Care Tips & Guidance
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Everything you need to know about caring for your furry, feathered, or scaled friend.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-gray-50 rounded-2xl p-6 h-full hover:bg-white hover:shadow-lg transition-all duration-300 border border-gray-100">
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                
                <p className="text-sm text-gray-600 mb-3">
                  {category.description}
                </p>
                
                <span className="text-xs text-gray-400">
                  {category.articles} articles
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <button className="inline-flex items-center text-emerald-600 font-semibold text-lg hover:text-emerald-700 transition-colors group">
            Explore All Care Tips
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  )
}
