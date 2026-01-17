'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams } from 'react-router-dom'
import { 
  ArrowLeft, Home, Clock, DollarSign, Heart, Activity, 
  AlertTriangle, CheckCircle, XCircle, Stethoscope, PawPrint 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { supabase } from '@/integrations/supabase/client'
import { Footer } from '@/components/Footer'

interface PetProfile {
  id: string
  name: string
  category: 'dog' | 'cat' | 'bird'
  description: string | null
  ideal_owner: string | null
  daily_care: string | null
  space_needs: string | null
  budget_range: string | null
  temperament: string | null
  health_issues: string | null
  dos_and_donts: string | null
  image_url: string | null
}

interface PetCategoryInfo {
  title: string
  emoji: string
  description: string
  color: string
  bgColor: string
}

const categoryInfo: Record<string, PetCategoryInfo> = {
  dog: {
    title: 'Dogs',
    emoji: '🐕',
    description: 'Loyal companions known for their devotion, energy, and unconditional love.',
    color: 'text-amber-700',
    bgColor: 'bg-amber-100'
  },
  cat: {
    title: 'Cats',
    emoji: '🐱',
    description: 'Independent yet affectionate pets perfect for various lifestyles.',
    color: 'text-purple-700',
    bgColor: 'bg-purple-100'
  },
  bird: {
    title: 'Birds',
    emoji: '🦜',
    description: 'Colorful, intelligent companions that bring song and joy to your home.',
    color: 'text-blue-700',
    bgColor: 'bg-blue-100'
  }
}

// Default pet profiles for each category
const defaultProfiles: Record<string, PetProfile[]> = {
  dog: [
    {
      id: 'golden-retriever',
      name: 'Golden Retriever',
      category: 'dog',
      description: 'Friendly, intelligent, and devoted family dogs known for their golden coats and gentle temperament.',
      ideal_owner: 'Active families with children, first-time dog owners, those seeking a loyal companion for outdoor activities.',
      daily_care: 'Requires 1-2 hours of exercise daily, including walks, fetch, and swimming. Regular brushing (2-3 times weekly) to manage shedding. Mental stimulation through training and puzzle toys.',
      space_needs: 'Medium to large home with yard preferred. Apartments possible with sufficient exercise.',
      budget_range: '$100-200/month for food, grooming, and preventive care.',
      temperament: 'Gentle, patient, eager to please, excellent with children and other pets. Highly trainable and sociable.',
      health_issues: 'Hip dysplasia, heart conditions, certain cancers, skin allergies. Regular vet check-ups recommended.',
      dos_and_donts: 'DO: Provide plenty of exercise, socialization, and positive training. DON\'T: Leave alone for long periods, skip grooming, overfeed.',
      image_url: null
    },
    {
      id: 'french-bulldog',
      name: 'French Bulldog',
      category: 'dog',
      description: 'Playful, adaptable, and charming companions perfect for apartment living and urban lifestyles.',
      ideal_owner: 'Apartment dwellers, seniors, families with older children, those wanting a low-exercise dog.',
      daily_care: 'Moderate exercise needs (short walks, play sessions). Clean facial folds daily. Minimal grooming needed.',
      space_needs: 'Excellent for apartments and small homes. Heat-sensitive, needs climate control.',
      budget_range: '$80-150/month. Higher initial cost, potential for higher vet bills.',
      temperament: 'Affectionate, playful, alert. Can be stubborn but responds well to positive reinforcement.',
      health_issues: 'Brachycephalic syndrome (breathing issues), spinal problems, joint issues, skin allergies.',
      dos_and_donts: 'DO: Keep cool in hot weather, maintain healthy weight, clean wrinkles. DON\'T: Over-exercise, expose to extreme temperatures.',
      image_url: null
    },
    {
      id: 'labrador-retriever',
      name: 'Labrador Retriever',
      category: 'dog',
      description: 'America\'s most popular dog breed - outgoing, active, and friendly with everyone they meet.',
      ideal_owner: 'Active individuals or families, those who enjoy outdoor activities, homes with children.',
      daily_care: 'Needs significant daily exercise (1-2 hours). Weekly brushing, more during shedding season. Loves water and swimming.',
      space_needs: 'Best with a yard and room to run. Can adapt to apartments with sufficient exercise.',
      budget_range: '$100-180/month for quality food (they love to eat!), supplies, and care.',
      temperament: 'Friendly, outgoing, high-spirited. Excellent family dogs, good with children and other pets.',
      health_issues: 'Hip and elbow dysplasia, heart disease, eye conditions. Prone to obesity without proper diet control.',
      dos_and_donts: 'DO: Provide structured exercise, mental stimulation, training. DON\'T: Overfeed, neglect training, skip exercise.',
      image_url: null
    }
  ],
  cat: [
    {
      id: 'persian',
      name: 'Persian Cat',
      category: 'cat',
      description: 'Elegant, calm, and affectionate cats known for their luxurious long coats and sweet personalities.',
      ideal_owner: 'Quiet households, seniors, those working from home, anyone seeking a calm companion.',
      daily_care: 'Daily brushing is essential to prevent matting. Regular eye cleaning due to flat face. Moderate play needs.',
      space_needs: 'Adapts well to apartments. Indoor-only recommended. Needs quiet, stable environment.',
      budget_range: '$60-120/month for grooming supplies, quality food, and care.',
      temperament: 'Calm, gentle, affectionate. Enjoys lounging and being pampered. Not highly active.',
      health_issues: 'Breathing difficulties, eye problems, kidney disease, dental issues. Requires regular vet visits.',
      dos_and_donts: 'DO: Brush daily, keep eyes clean, provide quality food. DON\'T: Neglect grooming, leave outdoors, skip vet visits.',
      image_url: null
    },
    {
      id: 'maine-coon',
      name: 'Maine Coon',
      category: 'cat',
      description: 'Gentle giants with dog-like personalities, known for their intelligence and playful nature.',
      ideal_owner: 'Families with children, those who want an interactive cat, homes with other pets.',
      daily_care: 'Regular brushing (2-3 times weekly). Enjoys interactive play and climbing. Mental stimulation important.',
      space_needs: 'Needs space for their large size. Cat trees and climbing areas recommended.',
      budget_range: '$80-150/month due to larger food requirements and grooming needs.',
      temperament: 'Friendly, intelligent, playful. Often described as "dog-like" in their loyalty and trainability.',
      health_issues: 'Hip dysplasia, heart conditions (HCM), spinal muscular atrophy. Regular screenings recommended.',
      dos_and_donts: 'DO: Provide climbing opportunities, interactive play, social time. DON\'T: Leave isolated, skip grooming.',
      image_url: null
    },
    {
      id: 'siamese',
      name: 'Siamese',
      category: 'cat',
      description: 'Vocal, social, and highly intelligent cats that form strong bonds with their owners.',
      ideal_owner: 'Those who want an interactive, talkative cat. People home often or with other pets for company.',
      daily_care: 'Minimal grooming needed. Requires lots of attention and mental stimulation. Enjoys puzzle toys.',
      space_needs: 'Adapts to any size home. Needs vertical space and toys. Indoor-only recommended.',
      budget_range: '$50-100/month for food, toys, and care.',
      temperament: 'Vocal, demanding, extremely social. Very loyal but may bond strongly to one person.',
      health_issues: 'Respiratory issues, dental problems, some genetic conditions. Generally healthy breed.',
      dos_and_donts: 'DO: Provide attention, stimulation, companionship. DON\'T: Leave alone for long periods, ignore their communication.',
      image_url: null
    }
  ],
  bird: [
    {
      id: 'budgie',
      name: 'Budgerigar (Budgie)',
      category: 'bird',
      description: 'Cheerful, colorful small parrots that are perfect for first-time bird owners.',
      ideal_owner: 'First-time bird owners, apartment dwellers, families with older children.',
      daily_care: 'Fresh water and food daily. Cage cleaning weekly. Social interaction and out-of-cage time important.',
      space_needs: 'Spacious cage with room to fly. Safe out-of-cage time area recommended.',
      budget_range: '$30-60/month for food, supplies, and care.',
      temperament: 'Playful, social, can learn to talk and do tricks. Enjoy music and interaction.',
      health_issues: 'Respiratory issues, tumors in older birds, obesity. Annual vet check recommended.',
      dos_and_donts: 'DO: Provide social interaction, variety in diet, clean environment. DON\'T: Expose to fumes, drafts, or loud noises.',
      image_url: null
    },
    {
      id: 'cockatiel',
      name: 'Cockatiel',
      category: 'bird',
      description: 'Affectionate, musical birds known for their crests and ability to whistle tunes.',
      ideal_owner: 'Those wanting a more interactive bird, families, anyone who enjoys whistling and singing.',
      daily_care: 'Daily feeding and water changes. Regular cage cleaning. Enjoys head scratches and interaction.',
      space_needs: 'Larger cage than budgies. Room to spread wings. Safe area for supervised out-of-cage time.',
      budget_range: '$40-80/month for food, toys, and supplies.',
      temperament: 'Affectionate, gentle, loves to whistle. Can become very bonded to owners.',
      health_issues: 'Night frights, respiratory issues, nutritional deficiencies. Sensitive to environmental toxins.',
      dos_and_donts: 'DO: Provide varied diet, social time, mental stimulation. DON\'T: Use non-stick cookware nearby, neglect sleep schedule.',
      image_url: null
    },
    {
      id: 'canary',
      name: 'Canary',
      category: 'bird',
      description: 'Beautiful songbirds that bring melody to your home without requiring handling.',
      ideal_owner: 'Those who enjoy bird song, people wanting a pet that doesn\'t need handling, apartments.',
      daily_care: 'Fresh food and water daily. Weekly cage cleaning. Minimal handling required.',
      space_needs: 'Flight cage recommended for exercise. Quiet location away from direct sunlight.',
      budget_range: '$25-50/month for seeds, supplements, and supplies.',
      temperament: 'Independent, musical (males sing more). Usually prefer not to be handled but enjoy company.',
      health_issues: 'Respiratory issues, mites, egg binding in females. Generally hardy with proper care.',
      dos_and_donts: 'DO: Provide varied diet, proper lighting, clean environment. DON\'T: House males together, place in drafty areas.',
      image_url: null
    }
  ]
}

export default function PetProfilePage() {
  const { category } = useParams<{ category: string }>()
  const [profiles, setProfiles] = useState<PetProfile[]>([])
  const [selectedPet, setSelectedPet] = useState<PetProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const info = categoryInfo[category || ''] || categoryInfo.dog

  useEffect(() => {
    if (category) {
      fetchProfiles()
    }
  }, [category])

  const fetchProfiles = async () => {
    try {
      const { data, error } = await supabase
        .from('pet_profiles')
        .select('*')
        .eq('category', category as 'dog' | 'cat' | 'bird')
        .order('name')

      if (error) throw error

      if (data && data.length > 0) {
        setProfiles(data)
        setSelectedPet(data[0])
      } else {
        // Use default profiles
        const defaultList = defaultProfiles[category || 'dog'] || []
        setProfiles(defaultList)
        setSelectedPet(defaultList[0] || null)
      }
    } catch (error) {
      console.error('Error fetching pet profiles:', error)
      const defaultList = defaultProfiles[category || 'dog'] || []
      setProfiles(defaultList)
      setSelectedPet(defaultList[0] || null)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      </div>
    )
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
        <div className="container mx-auto px-6">
          {/* Category Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className={`inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full ${info.bgColor}`}>
              <span className="text-3xl">{info.emoji}</span>
              <span className={`text-sm font-semibold ${info.color}`}>{info.title}</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              {info.title} Care Guide
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {info.description}
            </p>
          </motion.div>

          {/* Pet Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {profiles.map((pet) => (
              <button
                key={pet.id}
                onClick={() => setSelectedPet(pet)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  selectedPet?.id === pet.id
                    ? 'bg-amber-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-amber-100 shadow'
                }`}
              >
                {pet.name}
              </button>
            ))}
          </motion.div>

          {/* Pet Profile Detail */}
          {selectedPet && (
            <motion.div
              key={selectedPet.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              {/* Pet Header */}
              <div className={`${info.bgColor} p-8 lg:p-12`}>
                <div className="flex flex-col lg:flex-row items-center gap-8">
                  <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center text-6xl shadow-lg">
                    {info.emoji}
                  </div>
                  <div className="text-center lg:text-left">
                    <h2 className="text-3xl lg:text-4xl font-black text-gray-900 mb-3">
                      {selectedPet.name}
                    </h2>
                    <p className="text-lg text-gray-700 max-w-2xl">
                      {selectedPet.description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Tabs */}
              <Tabs defaultValue="overview" className="p-8 lg:p-12">
                <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="care">Daily Care</TabsTrigger>
                  <TabsTrigger value="health">Health</TabsTrigger>
                  <TabsTrigger value="tips">Do's & Don'ts</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-6">
                  {/* Quick Facts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-amber-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="w-6 h-6 text-amber-600" />
                        <h4 className="font-bold text-gray-900">Ideal Owner</h4>
                      </div>
                      <p className="text-sm text-gray-600">{selectedPet.ideal_owner}</p>
                    </div>
                    <div className="bg-blue-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Home className="w-6 h-6 text-blue-600" />
                        <h4 className="font-bold text-gray-900">Space Needs</h4>
                      </div>
                      <p className="text-sm text-gray-600">{selectedPet.space_needs}</p>
                    </div>
                    <div className="bg-green-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <DollarSign className="w-6 h-6 text-green-600" />
                        <h4 className="font-bold text-gray-900">Budget</h4>
                      </div>
                      <p className="text-sm text-gray-600">{selectedPet.budget_range}</p>
                    </div>
                    <div className="bg-purple-50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Activity className="w-6 h-6 text-purple-600" />
                        <h4 className="font-bold text-gray-900">Temperament</h4>
                      </div>
                      <p className="text-sm text-gray-600">{selectedPet.temperament}</p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="care" className="space-y-6">
                  <div className="bg-amber-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Clock className="w-8 h-8 text-amber-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Daily Care Requirements</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedPet.daily_care}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="health" className="space-y-6">
                  <div className="bg-red-50 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <Stethoscope className="w-8 h-8 text-red-600" />
                      <h3 className="text-2xl font-bold text-gray-900">Common Health Issues</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedPet.health_issues}
                    </p>
                    <div className="mt-6 flex items-center gap-2 text-red-700">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-medium">Regular veterinary check-ups are essential for early detection.</span>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="tips" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-green-50 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                        <h3 className="text-2xl font-bold text-gray-900">Do's</h3>
                      </div>
                      <ul className="space-y-3">
                        {selectedPet.dos_and_donts?.split('DO:')[1]?.split('DON\'T:')[0]?.split(',').map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{item.trim()}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-red-50 rounded-2xl p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <XCircle className="w-8 h-8 text-red-600" />
                        <h3 className="text-2xl font-bold text-gray-900">Don'ts</h3>
                      </div>
                      <ul className="space-y-3">
                        {selectedPet.dos_and_donts?.split('DON\'T:')[1]?.split(',').map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-700">
                            <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                            <span>{item.trim().replace('.', '')}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              {/* CTA Section */}
              <div className="border-t border-gray-100 p-8 lg:p-12 bg-gray-50">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Think a {selectedPet.name} is right for you?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Take our quiz to see if this pet matches your lifestyle.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Link to="/quiz">
                      <Button className="bg-amber-600 hover:bg-amber-700 gap-2">
                        <PawPrint className="w-4 h-4" />
                        Take Pet Match Quiz
                      </Button>
                    </Link>
                    <Link to="/blog">
                      <Button variant="outline">
                        Read Care Articles
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
