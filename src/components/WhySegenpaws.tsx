'use client'

import { motion } from 'framer-motion'
import { HeartHandshake, BookCheck, Users, Stethoscope } from 'lucide-react'

export function WhySegenpaws() {
  const reasons = [
    {
      icon: HeartHandshake,
      title: 'Reduces Pet Abandonment',
      description: 'By matching pets with compatible owners from the start, we help prevent the heartbreak of rehoming.'
    },
    {
      icon: BookCheck,
      title: 'Promotes Responsible Ownership',
      description: 'Our educational resources prepare you for every aspect of pet care before you bring your companion home.'
    },
    {
      icon: Stethoscope,
      title: 'Backed by Research & Vet Guidelines',
      description: 'All our care recommendations are developed in consultation with veterinary professionals.'
    },
    {
      icon: Users,
      title: 'Community-Driven Insights',
      description: 'Learn from thousands of pet owners who share their real experiences and tips.'
    }
  ]

  return (
    <section id="why-segenpaws" className="relative py-24 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Decorative */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-amber-400">
                Our Mission
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl font-black mb-6 leading-tight">
              Why SEGENPAWS <br />
              <span className="text-amber-400">Makes a Difference</span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              We believe every pet deserves a loving forever home, and every human 
              deserves the joy of a compatible companion. That's why we've built a 
              platform that prioritizes informed, thoughtful pet adoption.
            </p>
            
            <div className="flex items-center gap-6">
              <div className="text-center">
                <div className="text-4xl font-black text-amber-400">50K+</div>
                <div className="text-sm text-gray-400">Happy Matches</div>
              </div>
              <div className="w-px h-12 bg-gray-700" />
              <div className="text-center">
                <div className="text-4xl font-black text-emerald-400">98%</div>
                <div className="text-sm text-gray-400">Success Rate</div>
              </div>
              <div className="w-px h-12 bg-gray-700" />
              <div className="text-center">
                <div className="text-4xl font-black text-blue-400">500+</div>
                <div className="text-sm text-gray-400">Partner Shelters</div>
              </div>
            </div>
          </motion.div>

          {/* Right - Reasons Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {reasons.map((reason, index) => (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center mb-4">
                  <reason.icon className="w-6 h-6 text-amber-400" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2">
                  {reason.title}
                </h3>
                
                <p className="text-sm text-gray-400 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
