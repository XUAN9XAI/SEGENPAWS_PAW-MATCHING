'use client'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Heart, Clock, DollarSign, Home, Stethoscope, CheckCircle, XCircle, Sparkles } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'

interface PetProfile {
  id: string
  name: string
  category: string
  description: string | null
  temperament: string | null
  ideal_owner: string | null
  daily_care: string | null
  space_needs: string | null
  budget_range: string | null
  health_issues: string | null
  dos_and_donts: string | null
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

export default function PetProfile() {
  const { category, name } = useParams<{ category: string; name: string }>()
  const [pet, setPet] = useState<PetProfile | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (category && name) {
      fetchPet()
    }
  }, [category, name])

  const fetchPet = async () => {
    const validCategory = category as 'dog' | 'cat' | 'bird'
    const { data, error } = await supabase
      .from('pet_profiles')
      .select('*')
      .eq('category', validCategory)
      .ilike('name', name?.replace(/-/g, ' ') || '')
      .single()

    if (!error && data) {
      setPet(data)
    }
    setLoading(false)
  }

  const colors = categoryColors[category || 'dog'] || categoryColors.dog

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-3xl mb-8" />
              <div className="h-8 bg-gray-200 rounded w-1/2 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!pet) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Pet Profile Not Found</h1>
          <Link to="/pets" className="text-amber-600 hover:text-amber-700">
            ← Browse All Pets
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const parseDosAndDonts = (text: string | null) => {
    if (!text) return { dos: [], donts: [] }
    const lines = text.split('\n').filter(line => line.trim())
    const dos: string[] = []
    const donts: string[] = []
    
    lines.forEach(line => {
      if (line.toLowerCase().startsWith("don't") || line.toLowerCase().startsWith('avoid') || line.startsWith('-')) {
        donts.push(line.replace(/^-\s*/, ''))
      } else {
        dos.push(line.replace(/^-\s*/, ''))
      }
    })
    
    return { dos, donts }
  }

  const { dos, donts } = parseDosAndDonts(pet.dos_and_donts)

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {/* Back Link */}
          <Link
            to="/pets"
            className="inline-flex items-center text-gray-600 hover:text-amber-600 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Pet Profiles
          </Link>

          {/* Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-gradient-to-br ${colors.bg} rounded-3xl p-8 lg:p-12 mb-12`}
          >
            <div className="flex flex-col lg:flex-row gap-8 items-center">
              <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-8xl shadow-xl">
                {pet.image_url ? (
                  <img src={pet.image_url} alt={pet.name} className="w-full h-full object-cover rounded-full" />
                ) : (
                  categoryEmojis[pet.category] || '🐾'
                )}
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <span className={`inline-block ${colors.accent} text-white text-sm font-medium px-4 py-1 rounded-full mb-4`}>
                  {pet.category.charAt(0).toUpperCase() + pet.category.slice(1)}
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
                  {pet.name}
                </h1>
                {pet.description && (
                  <p className="text-xl text-gray-700 max-w-2xl">
                    {pet.description}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Temperament */}
              {pet.temperament && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 ${colors.accent} rounded-xl flex items-center justify-center`}>
                      <Heart className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Temperament & Behavior</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{pet.temperament}</p>
                </motion.section>
              )}

              {/* Ideal Owner */}
              {pet.ideal_owner && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Ideal Owner Profile</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{pet.ideal_owner}</p>
                </motion.section>
              )}

              {/* Daily Care */}
              {pet.daily_care && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Daily Care Requirements</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{pet.daily_care}</p>
                </motion.section>
              )}

              {/* Health Issues */}
              {pet.health_issues && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Common Health Issues</h2>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{pet.health_issues}</p>
                </motion.section>
              )}

              {/* Do's and Don'ts */}
              {pet.dos_and_donts && (
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Do's & Don'ts</h2>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-600 mb-4">
                        <CheckCircle className="w-5 h-5" />
                        Do's
                      </h3>
                      <ul className="space-y-2">
                        {dos.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <CheckCircle className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="flex items-center gap-2 text-lg font-bold text-red-600 mb-4">
                        <XCircle className="w-5 h-5" />
                        Don'ts
                      </h3>
                      <ul className="space-y-2">
                        {donts.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-600">
                            <XCircle className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Facts */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-2xl p-6 shadow-lg sticky top-24"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Facts</h3>
                
                {pet.space_needs && (
                  <div className="flex items-start gap-4 mb-6 pb-6 border-b border-gray-100">
                    <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                      <Home className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Space Needs</p>
                      <p className="text-sm text-gray-600">{pet.space_needs}</p>
                    </div>
                  </div>
                )}

                {pet.budget_range && (
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Monthly Budget</p>
                      <p className="text-sm text-gray-600">{pet.budget_range}</p>
                    </div>
                  </div>
                )}

                <Button className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                  Take the Quiz to Match
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
