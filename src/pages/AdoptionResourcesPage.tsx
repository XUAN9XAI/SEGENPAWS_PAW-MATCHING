import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ExternalLink, CheckCircle2, Heart, Home, Search, FileText, Shield, AlertTriangle, Stethoscope, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Footer } from '@/components/Footer'

const shelters = [
  {
    name: 'ASPCA',
    description: 'American Society for the Prevention of Cruelty to Animals',
    url: 'https://www.aspca.org/adopt-pet',
    location: 'Nationwide (US)',
  },
  {
    name: 'Petfinder',
    description: 'Search over 11,000 shelters and rescue groups',
    url: 'https://www.petfinder.com',
    location: 'US & Canada',
  },
  {
    name: 'Adopt-a-Pet',
    description: 'North America\'s largest non-profit pet adoption website',
    url: 'https://www.adoptapet.com',
    location: 'US & Canada',
  },
  {
    name: 'Best Friends Animal Society',
    description: 'Working to make America no-kill by 2025',
    url: 'https://bestfriends.org/adopt',
    location: 'Nationwide (US)',
  },
  {
    name: 'The Humane Society',
    description: 'The nation\'s most effective animal protection organization',
    url: 'https://www.humanesociety.org/resources/how-find-perfect-shelter-pet',
    location: 'Worldwide',
  },
  {
    name: 'Rescue Me',
    description: 'Adopt dogs, cats, horses and other animals',
    url: 'https://www.rescueme.org',
    location: 'Nationwide (US)',
  },
]

const adoptionChecklist = [
  {
    category: 'Before You Visit',
    icon: Search,
    items: [
      'Research breeds/species that fit your lifestyle',
      'Take our Pet Match Quiz for personalized recommendations',
      'Calculate monthly costs (food, vet, supplies)',
      'Check your lease or HOA rules about pets',
      'Discuss with family/roommates',
      'Consider your work schedule and travel habits',
    ],
  },
  {
    category: 'At the Shelter',
    icon: Heart,
    items: [
      'Spend quality time with potential pets',
      'Ask about the pet\'s history and behavior',
      'Observe how they interact with you and others',
      'Bring family members to meet the pet',
      'Ask about any medical conditions or special needs',
      'Request a trial period if available',
    ],
  },
  {
    category: 'Prepare Your Home',
    icon: Home,
    items: [
      'Pet-proof your living space',
      'Set up a designated pet area',
      'Purchase essential supplies in advance',
      'Find a veterinarian in your area',
      'Arrange time off work for the first few days',
      'Create a quiet space for adjustment',
    ],
  },
  {
    category: 'After Adoption',
    icon: FileText,
    items: [
      'Schedule a vet visit within the first week',
      'Keep a consistent routine',
      'Be patient during the adjustment period',
      'Start training early with positive reinforcement',
      'Update microchip information',
      'Consider pet insurance',
    ],
  },
]

const redFlags = [
  {
    title: 'Health Concerns',
    icon: AlertTriangle,
    signs: [
      'Discharge from eyes or nose',
      'Patches of missing fur or skin issues',
      'Lethargy or difficulty moving',
      'Visible signs of untreated injuries',
      'Extreme skinniness or bloated belly',
    ],
  },
  {
    title: 'Behavioral Red Flags',
    icon: Shield,
    signs: [
      'Extreme fear or aggression',
      'Cowering or flinching when approached',
      'Resource guarding (food, toys)',
      'Excessive anxiety in normal situations',
      'History of biting (ask directly)',
    ],
  },
]

const greenFlags = [
  {
    title: 'Good Health Signs',
    icon: Stethoscope,
    signs: [
      'Bright, clear eyes',
      'Clean, shiny coat',
      'Alert and responsive',
      'Good appetite',
      'Normal energy levels for age/breed',
    ],
  },
  {
    title: 'Positive Behaviors',
    icon: Heart,
    signs: [
      'Approaches you willingly',
      'Relaxed body language',
      'Playful and curious',
      'Responds to basic cues',
      'Comfortable with handling',
    ],
  },
]

export default function AdoptionResourcesPage() {
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
              Back Home
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-4">
              Adoption Resources
            </span>
            <h1 className="text-4xl lg:text-6xl font-black text-gray-900 mb-6">
              Ready to Save a Life?
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to know about adopting your new best friend. From finding shelters to preparing your home, we've got you covered.
            </p>
          </motion.div>

          {/* Shelter Links Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
              Find a Shelter Near You
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {shelters.map((shelter, index) => (
                <motion.a
                  key={shelter.name}
                  href={shelter.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all group border border-amber-100 hover:border-amber-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-amber-600 transition-colors">
                      {shelter.name}
                    </h3>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-amber-600 transition-colors" />
                  </div>
                  <p className="text-gray-600 mb-3">{shelter.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin className="w-4 h-4 mr-1" />
                    {shelter.location}
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.section>

          {/* Adoption Checklist */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
              Adoption Checklist
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {adoptionChecklist.map((section, index) => (
                <motion.div
                  key={section.category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="bg-white rounded-2xl p-8 shadow-lg"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <section.icon className="w-6 h-6 text-amber-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{section.category}</h3>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* What to Look For */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-black text-gray-900 mb-8 text-center">
              What to Look For When Adopting
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Green Flags */}
              <div>
                <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Positive Signs
                </h3>
                <div className="space-y-6">
                  {greenFlags.map((section, index) => (
                    <div key={section.title} className="bg-green-50 rounded-2xl p-6 border border-green-100">
                      <div className="flex items-center gap-3 mb-4">
                        <section.icon className="w-6 h-6 text-green-600" />
                        <h4 className="font-bold text-gray-900">{section.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {section.signs.map((sign, signIndex) => (
                          <li key={signIndex} className="flex items-center gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-green-400 rounded-full" />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Red Flags */}
              <div>
                <h3 className="text-xl font-bold text-red-700 mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-6 h-6" />
                  Warning Signs
                </h3>
                <div className="space-y-6">
                  {redFlags.map((section, index) => (
                    <div key={section.title} className="bg-red-50 rounded-2xl p-6 border border-red-100">
                      <div className="flex items-center gap-3 mb-4">
                        <section.icon className="w-6 h-6 text-red-600" />
                        <h4 className="font-bold text-gray-900">{section.title}</h4>
                      </div>
                      <ul className="space-y-2">
                        {section.signs.map((sign, signIndex) => (
                          <li key={signIndex} className="flex items-center gap-2 text-gray-700">
                            <div className="w-2 h-2 bg-red-400 rounded-full" />
                            {sign}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-500 italic">
                  Note: Red flags don't always mean you shouldn't adopt. Many issues are treatable or trainable with patience and resources. Always discuss concerns with shelter staff.
                </p>
              </div>
            </div>
          </motion.section>

          {/* CTA Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-12 text-white"
          >
            <h2 className="text-3xl lg:text-4xl font-black mb-4">
              Not Sure Which Pet Is Right for You?
            </h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Take our Pet Match Quiz to discover the perfect companion for your lifestyle.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/quiz">
                <Button size="lg" variant="secondary" className="bg-white text-amber-600 hover:bg-amber-50">
                  Take the Quiz
                </Button>
              </Link>
              <Link to="/blog">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Read Pet Care Guides
                </Button>
              </Link>
            </div>
          </motion.section>
        </div>
      </main>

      <Footer />
    </div>
  )
}
