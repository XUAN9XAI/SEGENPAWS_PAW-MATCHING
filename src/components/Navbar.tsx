'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { UserMenu } from './auth/UserMenu'
import { AuthModal } from './auth/AuthModal'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [isMobileMenuOpen])

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Pet Match Quiz', href: '/#quiz' },
    { name: 'Pets', href: '/pets' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/#why-segenpaws' },
    { name: 'Contact', href: '/#contact' },
  ]

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/'
    if (href.startsWith('/#')) return location.pathname === '/'
    return location.pathname.startsWith(href)
  }

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    if (href.startsWith('/#')) {
      if (location.pathname !== '/') {
        window.location.href = href
      } else {
        const element = document.getElementById(href.replace('/#', ''))
        element?.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 w-full z-[110]"
      >
        <div className={`w-full px-6 sm:px-8 lg:px-12 py-4 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-xl shadow-md' : 'bg-white shadow-sm'
        }`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center cursor-pointer hover:scale-105 transition-transform">
              <span className="font-bagel text-black text-xl tracking-wider">SEGENPAWS</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-medium transition-colors hover:scale-105 ${
                      isActive(link.href) ? 'text-amber-600' : 'text-black hover:text-black/70'
                    }`}
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    className={`font-medium transition-colors hover:scale-105 ${
                      isActive(link.href) ? 'text-amber-600' : 'text-black hover:text-black/70'
                    }`}
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-3">
              <UserMenu onOpenAuth={() => setShowAuthModal(true)} />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleNavClick('/#quiz')}
                className="hidden sm:block bg-amber-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
              >
                Find Your Pet
              </motion.button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden bg-gray-100 p-3 rounded-full text-black hover:bg-gray-200 transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-md z-[80]"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Menu Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isMobileMenuOpen ? '0%' : '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="lg:hidden fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-white border-l border-gray-200 z-[90]"
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-end p-4">
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-3 rounded-full text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex flex-col px-6 pb-6 h-full">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                link.href.startsWith('/#') ? (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="px-4 py-3 text-left text-gray-900 hover:bg-gray-100 rounded-lg font-medium text-lg"
                  >
                    {link.name}
                  </button>
                ) : (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-gray-900 hover:bg-gray-100 rounded-lg font-medium text-lg"
                  >
                    {link.name}
                  </Link>
                )
              ))}
            </div>

            <button
              onClick={() => {
                handleNavClick('/#quiz')
                setIsMobileMenuOpen(false)
              }}
              className="bg-amber-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors mt-8"
            >
              Find Your Pet
            </button>
          </div>
        </div>
      </motion.div>

      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
