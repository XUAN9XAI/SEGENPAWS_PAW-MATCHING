'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { User, LogOut, Heart, BookOpen, Settings } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface UserMenuProps {
  onOpenAuth: () => void
}

export function UserMenu({ onOpenAuth }: UserMenuProps) {
  const { user, signOut, loading } = useAuth()
  const [isOpen, setIsOpen] = useState(false)

  if (loading) {
    return (
      <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
    )
  }

  if (!user) {
    return (
      <button
        onClick={onOpenAuth}
        className="bg-gray-100 p-3 rounded-full text-gray-700 hover:bg-gray-200 transition-colors flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline text-sm font-medium">Sign In</span>
      </button>
    )
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white font-bold hover:bg-amber-600 transition-colors"
      >
        {user.email?.[0].toUpperCase() || 'U'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-[150]"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-[160]"
            >
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <p className="font-medium text-gray-900 truncate">{user.email}</p>
                <p className="text-sm text-gray-500">Pet Parent</p>
              </div>
              
              <div className="p-2">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Heart className="w-5 h-5 text-rose-500" />
                  <span>Saved Pets</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <BookOpen className="w-5 h-5 text-blue-500" />
                  <span>Bookmarked Articles</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-500" />
                  <span>Settings</span>
                </button>
              </div>

              <div className="p-2 border-t border-gray-200">
                <button
                  onClick={() => {
                    signOut()
                    setIsOpen(false)
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
