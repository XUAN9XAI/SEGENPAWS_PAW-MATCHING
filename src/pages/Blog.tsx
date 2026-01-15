'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Search, Tag } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Input } from '@/components/ui/input'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  category: string
  author: string | null
  featured_image: string | null
  published_at: string | null
  created_at: string
}

const categories = [
  { id: 'all', name: 'All Posts', color: 'bg-gray-500' },
  { id: 'pet-care-basics', name: 'Pet Care Basics', color: 'bg-amber-500' },
  { id: 'training-tips', name: 'Training Tips', color: 'bg-blue-500' },
  { id: 'health-wellness', name: 'Health & Wellness', color: 'bg-emerald-500' },
  { id: 'first-time-owners', name: 'First-Time Owners', color: 'bg-purple-500' },
]

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetchPosts()
  }, [selectedCategory])

  const fetchPosts = async () => {
    setLoading(true)
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory)
    }

    const { data, error } = await query

    if (!error && data) {
      setPosts(data)
    }
    setLoading(false)
  }

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCategoryColor = (category: string) => {
    return categories.find(c => c.id === category)?.color || 'bg-gray-500'
  }

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
              Pet Care Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Expert advice, tips, and stories to help you be the best pet parent you can be.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? `${category.color} text-white`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full lg:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg animate-pulse">
                  <div className="h-48 bg-gray-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-6 bg-gray-200 rounded w-3/4" />
                    <div className="h-4 bg-gray-200 rounded w-full" />
                    <div className="h-4 bg-gray-200 rounded w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-500">No articles found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                >
                  <Link to={`/blog/${post.slug}`}>
                    <div className="relative h-48 bg-gradient-to-br from-amber-100 to-orange-100">
                      {post.featured_image && (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      )}
                      <div className={`absolute top-4 left-4 ${getCategoryColor(post.category)} text-white text-xs font-medium px-3 py-1 rounded-full`}>
                        {categories.find(c => c.id === post.category)?.name || post.category}
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                        {post.title}
                      </h2>
                      
                      {post.excerpt && (
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-4">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author || 'SEGENPAWS'}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.published_at || post.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center text-amber-600 font-medium group-hover:text-amber-700">
                        Read More
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
