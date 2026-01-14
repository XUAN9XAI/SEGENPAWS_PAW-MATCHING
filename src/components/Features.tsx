'use client'

import { motion } from 'framer-motion'
import { Target, Heart, BookOpen, TrendingUp, Shield } from 'lucide-react'

export function Features() {
  const features = [
    {
      icon: Target,
      title: 'Personalized Pet Recommendations',
      description: 'Our intelligent matching system considers your lifestyle, living space, and preferences to suggest the ideal pet for you.',
      color: 'bg-blue-500'
    },
    {
      icon: Heart,
      title: 'Lifestyle-Based Matching',
      description: 'We analyze your daily routine, activity level, and time availability to find pets that truly fit your life.',
      color: 'bg-rose-500'
    },
    {
      icon: BookOpen,
      title: 'Beginner-Friendly Guidance',
      description: 'Step-by-step care guides and resources designed for first-time pet owners to feel confident.',
      color: 'bg-emerald-500'
    },
    {
      icon: TrendingUp,
      title: 'Long-Term Care Insights',
      description: 'Understand the full journey of pet ownership with projections on costs, health needs, and lifecycle stages.',
      color: 'bg-purple-500'
    },
    {
      icon: Shield,
      title: 'Ethical Adoption Focus',
      description: 'We partner with verified shelters and promote responsible adoption practices to reduce pet abandonment.',
      color: 'bg-amber-500'
    }
  ]

  return (
    <section id="features" className="relative py-24 bg-white">
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
            <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-blue-600">
              Platform Benefits
            </span>
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Why Choose SEGENPAWS?
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're building a smarter way to connect humans with their perfect pet companions.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className={`w-14 h-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
