'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export function PetCategories() {
  const categories = [
    {
      id: 'dogs',
      name: 'Dogs',
      emoji: '🐕',
      description: 'Loyal companions for active lifestyles',
      traits: ['Active', 'Social', 'Trainable'],
      bgColor: 'from-amber-100 to-orange-100',
      accentColor: 'bg-amber-500'
    },
    {
      id: 'cats',
      name: 'Cats',
      emoji: '🐱',
      description: 'Independent friends for cozy homes',
      traits: ['Independent', 'Low-maintenance', 'Affectionate'],
      bgColor: 'from-purple-100 to-pink-100',
      accentColor: 'bg-purple-500'
    },
    {
      id: 'birds',
      name: 'Birds',
      emoji: '🦜',
      description: 'Colorful companions with personality',
      traits: ['Intelligent', 'Musical', 'Long-lived'],
      bgColor: 'from-blue-100 to-cyan-100',
      accentColor: 'bg-blue-500'
    }
  ]

  return (
    <section id="pet-categories" className="relative py-24 bg-gray-50">
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
            <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
            <span className="text-sm font-semibold text-rose-600">
              Explore Categories
            </span>
            <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
            Popular Pet Categories
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover which type of pet best matches your lifestyle and preferences.
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group cursor-pointer"
            >
              <div className={`bg-gradient-to-br ${category.bgColor} rounded-3xl p-8 h-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2`}>
                {/* Emoji */}
                <div className="text-7xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {category.emoji}
                </div>
                
                {/* Name */}
                <h3 className="text-3xl font-black text-gray-900 mb-3">
                  {category.name}
                </h3>
                
                {/* Description */}
                <p className="text-gray-700 mb-6">
                  {category.description}
                </p>
                
                {/* Traits */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {category.traits.map((trait) => (
                    <span
                      key={trait}
                      className={`${category.accentColor} text-white text-sm px-3 py-1 rounded-full`}
                    >
                      {trait}
                    </span>
                  ))}
                </div>
                
                {/* CTA */}
                <div className="flex items-center text-gray-900 font-semibold group-hover:text-gray-700">
                  Learn More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
