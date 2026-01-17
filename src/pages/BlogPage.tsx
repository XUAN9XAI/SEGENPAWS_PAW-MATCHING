'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/integrations/supabase/client'
import { Footer } from '@/components/Footer'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  author: string | null
  category: string
  featured_image: string | null
  published_at: string | null
  created_at: string
}

const categories = [
  { id: 'all', name: 'All Posts', color: 'bg-gray-100 text-gray-800' },
  { id: 'pet-care-basics', name: 'Pet Care Basics', color: 'bg-amber-100 text-amber-800' },
  { id: 'training-tips', name: 'Training Tips', color: 'bg-blue-100 text-blue-800' },
  { id: 'health-wellness', name: 'Health & Wellness', color: 'bg-green-100 text-green-800' },
  { id: 'first-time-owners', name: 'First-Time Owners', color: 'bg-purple-100 text-purple-800' },
  { id: 'updates', name: 'SEGENPAWS Updates', color: 'bg-orange-100 text-orange-800' }
]

// Sample blog posts for demo (will be replaced with real data)
const samplePosts: BlogPost[] = [
  {
    id: '1',
    title: 'Complete Guide to Puppy Training: From Day One',
    slug: 'complete-guide-puppy-training',
    excerpt: 'Learn the essential techniques for training your new puppy, from basic commands to house training and socialization.',
    content: '',
    author: 'SEGENPAWS Team',
    category: 'training-tips',
    featured_image: null,
    published_at: '2025-01-10',
    created_at: '2025-01-10'
  },
  {
    id: '2',
    title: 'Understanding Your Cat\'s Body Language',
    slug: 'understanding-cat-body-language',
    excerpt: 'Decode your feline friend\'s signals and build a stronger bond by understanding what they\'re really trying to tell you.',
    content: '',
    author: 'SEGENPAWS Team',
    category: 'pet-care-basics',
    featured_image: null,
    published_at: '2025-01-08',
    created_at: '2025-01-08'
  },
  {
    id: '3',
    title: 'Essential Vaccinations for Your New Pet',
    slug: 'essential-vaccinations-new-pet',
    excerpt: 'A comprehensive guide to the vaccinations your pet needs to stay healthy and protected throughout their life.',
    content: '',
    author: 'SEGENPAWS Team',
    category: 'health-wellness',
    featured_image: null,
    published_at: '2025-01-05',
    created_at: '2025-01-05'
  },
  {
    id: '4',
    title: 'First-Time Pet Owner? Start Here',
    slug: 'first-time-pet-owner-guide',
    excerpt: 'Everything you need to know before bringing your first pet home, from preparation to the first week.',
    content: '',
    author: 'SEGENPAWS Team',
    category: 'first-time-owners',
    featured_image: null,
    published_at: '2025-01-03',
    created_at: '2025-01-03'
  },
  {
    id: '5',
    title: 'Bird Care 101: Setting Up the Perfect Aviary',
    slug: 'bird-care-aviary-setup',
    excerpt: 'Create the ideal living space for your feathered friends with our comprehensive guide to bird housing.',
    content: '',
    author: 'SEGENPAWS Team',
    category: 'pet-care-basics',
    featured_image: null,
    published_at: '2025-01-01',
    created_at: '2025-01-01'
  },
  {
    id: '6',
    title: 'Nutrition Guide: What to Feed Your Pet',
    slug: 'nutrition-guide-pet-feeding',
    excerpt: 'Discover the best dietary practices for dogs, cats, and birds to ensure optimal health and longevity.',
    content: '',
    author: 'SEGENPAWS Team',
    category: 'health-wellness',
    featured_image: null,
    published_at: '2024-12-28',
    created_at: '2024-12-28'
  }
]

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(samplePosts)
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(samplePosts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  useEffect(() => {
    filterPosts()
  }, [selectedCategory, searchQuery, posts])

  const fetchPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('published', true)
        .order('published_at', { ascending: false })

      if (error) throw error
      if (data && data.length > 0) {
        setPosts(data)
      }
    } catch (error) {
      console.error('Error fetching blog posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterPosts = () => {
    let filtered = posts

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => post.category === selectedCategory)
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        post =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query)
      )
    }

    setFilteredPosts(filtered)
  }

  const getCategoryColor = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.color || 'bg-gray-100 text-gray-800'
  }

  const getCategoryName = (categoryId: string) => {
    return categories.find(c => c.id === categoryId)?.name || categoryId
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
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
          {/* Page Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-3 mb-6">
              <BookOpen className="w-6 h-6 text-amber-600" />
              <span className="text-sm font-semibold text-amber-700">Pet Care Blog</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
              Expert Pet Care Articles
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover tips, guides, and insights to help you become the best pet parent.
            </p>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          >
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-3 text-lg"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.id
                      ? 'bg-amber-500 text-white'
                      : category.color + ' hover:opacity-80'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Blog Posts Grid */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
                  <div className="h-40 bg-gray-200 rounded-xl mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600">No articles found matching your criteria.</p>
              <Button
                onClick={() => { setSelectedCategory('all'); setSearchQuery('') }}
                className="mt-4"
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow group"
                >
                  {/* Featured Image Placeholder */}
                  <div className="h-48 bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                    <span className="text-6xl">📝</span>
                  </div>

                  <div className="p-6">
                    {/* Category Badge */}
                    <Badge className={`${getCategoryColor(post.category)} mb-3`}>
                      {getCategoryName(post.category)}
                    </Badge>

                    {/* Title */}
                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Meta */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(post.published_at)}
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {post.author}
                      </div>
                    </div>

                    {/* Read More */}
                    <Link to={`/blog/${post.slug}`}>
                      <Button variant="ghost" className="gap-2 p-0 h-auto text-amber-600 hover:text-amber-700">
                        Read More
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
