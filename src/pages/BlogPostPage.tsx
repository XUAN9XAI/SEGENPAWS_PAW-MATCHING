'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Calendar, User, Clock, Share2, BookOpen } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { supabase } from '@/integrations/supabase/client'
import { Footer } from '@/components/Footer'
import { toast } from 'sonner'

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

const categories: Record<string, { name: string; color: string }> = {
  'pet-care-basics': { name: 'Pet Care Basics', color: 'bg-amber-100 text-amber-800' },
  'training-tips': { name: 'Training Tips', color: 'bg-blue-100 text-blue-800' },
  'health-wellness': { name: 'Health & Wellness', color: 'bg-green-100 text-green-800' },
  'first-time-owners': { name: 'First-Time Owners', color: 'bg-purple-100 text-purple-800' },
  'updates': { name: 'SEGENPAWS Updates', color: 'bg-orange-100 text-orange-800' }
}

// Sample post content for demo
const sampleContent = `
## Introduction

Bringing a new pet into your home is an exciting and rewarding experience. However, it also comes with responsibilities that require preparation and knowledge.

## Getting Started

Before your new companion arrives, make sure you have:

- **Essential supplies**: Food, water bowls, bedding, and appropriate containment
- **Veterinary care planned**: Schedule a first check-up within the first week
- **Pet-proofing done**: Remove hazards and create a safe space

## The First Week

The initial days are crucial for bonding and establishing routines:

1. **Give them space**: Allow your pet to explore at their own pace
2. **Maintain consistency**: Feed at the same times daily
3. **Start training early**: Basic commands and house rules
4. **Show patience**: Adjustment takes time for everyone

## Building a Bond

Trust is earned through:

- Regular feeding and care
- Gentle handling and positive reinforcement
- Quality time together
- Respecting their boundaries

## Conclusion

Remember, every pet is unique. Pay attention to their individual needs and preferences, and don't hesitate to consult professionals when needed.

---

*For more detailed guides on specific pet types, explore our other articles or take our Pet Match Quiz to find your ideal companion.*
`

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [readingTime, setReadingTime] = useState(5)

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle()

      if (error) throw error

      if (data) {
        setPost(data)
        // Calculate reading time (rough estimate: 200 words per minute)
        const wordCount = data.content.split(/\s+/).length
        setReadingTime(Math.max(1, Math.ceil(wordCount / 200)))
      } else {
        // Use sample post for demo
        setPost({
          id: 'demo',
          title: slug?.split('-').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ') || 'Sample Article',
          slug: slug || '',
          excerpt: 'A comprehensive guide to help you become the best pet parent.',
          content: sampleContent,
          author: 'SEGENPAWS Team',
          category: 'pet-care-basics',
          featured_image: null,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        })
      }
    } catch (error) {
      console.error('Error fetching blog post:', error)
      navigate('/blog')
    } finally {
      setIsLoading(false)
    }
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'No date'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post?.title,
          text: post?.excerpt || '',
          url: window.location.href
        })
      } catch (error) {
        console.log('Share cancelled')
      }
    } else {
      await navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard!')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600" />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article not found</h1>
          <Link to="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    )
  }

  const categoryInfo = categories[post.category] || { name: post.category, color: 'bg-gray-100 text-gray-800' }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-bagel text-xl text-black hover:opacity-80 transition-opacity">
            SEGENPAWS
          </Link>
          <Link to="/blog">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </header>

      <main className="pt-24 pb-16">
        <article className="container mx-auto px-6 max-w-4xl">
          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            {/* Category Badge */}
            <Badge className={`${categoryInfo.color} mb-4`}>
              {categoryInfo.name}
            </Badge>

            {/* Title */}
            <h1 className="text-3xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(post.published_at)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{readingTime} min read</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="gap-2"
              >
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </motion.div>

          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="h-64 lg:h-96 bg-gradient-to-br from-amber-100 to-orange-100 rounded-3xl flex items-center justify-center mb-12"
          >
            <BookOpen className="w-24 h-24 text-amber-400" />
          </motion.div>

          {/* Article Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl p-8 lg:p-12"
          >
            <div className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
              {/* Render markdown-like content */}
              {post.content.split('\n').map((line, index) => {
                if (line.startsWith('## ')) {
                  return <h2 key={index} className="text-2xl font-bold mt-8 mb-4">{line.replace('## ', '')}</h2>
                }
                if (line.startsWith('- **')) {
                  const match = line.match(/- \*\*(.+?)\*\*: (.+)/)
                  if (match) {
                    return (
                      <p key={index} className="my-2 pl-4">
                        • <strong>{match[1]}</strong>: {match[2]}
                      </p>
                    )
                  }
                }
                if (line.match(/^\d+\. /)) {
                  return <p key={index} className="my-2 pl-4">{line}</p>
                }
                if (line.startsWith('- ')) {
                  return <p key={index} className="my-2 pl-4">• {line.replace('- ', '')}</p>
                }
                if (line.startsWith('*') && line.endsWith('*')) {
                  return <p key={index} className="my-4 italic text-gray-500">{line.replace(/\*/g, '')}</p>
                }
                if (line === '---') {
                  return <hr key={index} className="my-8 border-gray-200" />
                }
                if (line.trim()) {
                  return <p key={index} className="my-4">{line}</p>
                }
                return null
              })}
            </div>

            {/* Related CTAs */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h3>
              <div className="flex flex-wrap gap-4">
                <Link to="/quiz">
                  <Button className="bg-amber-600 hover:bg-amber-700">
                    Take Pet Match Quiz
                  </Button>
                </Link>
                <Link to="/blog">
                  <Button variant="outline">
                    Explore More Articles
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
