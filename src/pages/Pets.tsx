'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface PetProfile {
  id: string
  name: string
  category: string
  description: string | null
  image_url: string | null
}

const categoryEmojis: Record<string, string> = {
  dog: '🐕',
  cat: '🐱',
  bird: '🦜'
}

const categoryColors: Record<string, { bg: string, accent: string }> = {
  dog: { bg: 'from-amber-100 to-orange-100', accent: 'bg-amber-500' },
  cat: { bg: 'from-purple-100 to-pink-100', accent: 'bg-purple-500' },
  bird: { bg: 'from-blue-100 to-cyan-100', accent: 'bg-blue-500' }
}

export default function Pets() {
  const [pets, setPets] = useState<PetProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  useEffect(() => {
    fetchPets()
  }, [])

  const fetchPets = async () => {
    const { data, error } = await supabase
      .from('pet_profiles')
      .select('*')
      .order('name')

    if (!error && data) {
      setPets(data)
    }
    setLoading(false)
  }

  const categories = ['dog', 'cat', 'bird']
  const filteredPets = selectedCategory 
    ? pets.filter(pet => pet.category === selectedCategory)
    : pets

  const groupedPets = categories.reduce((acc, category) => {
    acc[category] = filteredPets.filter(pet => pet.category === category)
    return acc
  }, {} as Record<string, PetProfile[]>)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
              Pet Profiles
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore detailed care guides for different pets to find your perfect match.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All Pets
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center gap-2 ${
                  selectedCategory === category
                    ? `${categoryColors[category].accent} text-white`
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{categoryEmojis[category]}</span>
                {category.charAt(0).toUpperCase() + category.slice(1)}s
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Pet Profiles */}
      <section className="py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
                  <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4" />
                  <div className="h-6 bg-gray-200 rounded w-1/2 mx-auto mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-16">
              {categories.map((category) => {
                const categoryPets = groupedPets[category]
                if (categoryPets.length === 0 && selectedCategory === null) return null
                if (selectedCategory && selectedCategory !== category) return null

                return (
                  <div key={category}>
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
                      <span className="text-4xl">{categoryEmojis[category]}</span>
                      {category.charAt(0).toUpperCase() + category.slice(1)}s
                    </h2>
                    
                    {categoryPets.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">
                        No {category}s profiles available yet. Check back soon!
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {categoryPets.map((pet, index) => (
                          <motion.div
                            key={pet.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <Link
                              to={`/pets/${pet.category}/${pet.name.toLowerCase().replace(/\s+/g, '-')}`}
                              className="block group"
                            >
                              <div className={`bg-gradient-to-br ${categoryColors[pet.category].bg} rounded-2xl p-8 h-full hover:shadow-xl transition-all duration-300 hover:-translate-y-2`}>
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-5xl mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                  {pet.image_url ? (
                                    <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover rounded-full" />
                                  ) : (
                                    categoryEmojis[pet.category]
                                  )}
                                </div>
                                
                                <h3 className="text-2xl font-bold text-gray-900 text-center mb-3">
                                  {pet.name}
                                </h3>
                                
                                {pet.description && (
                                  <p className="text-gray-600 text-center line-clamp-2 mb-4">
                                    {pet.description}
                                  </p>
                                )}

                                <div className="flex items-center justify-center text-gray-900 font-medium group-hover:text-gray-700">
                                  View Profile
                                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
