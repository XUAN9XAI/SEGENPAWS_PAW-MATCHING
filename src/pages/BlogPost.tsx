'use client'

import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowLeft, Bookmark, Share2 } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  category: string
  author: string | null
  featured_image: string | null
  published_at: string | null
  created_at: string
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (slug) {
      fetchPost()
    }
  }, [slug])

  const fetchPost = async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (!error && data) {
      setPost(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-16">
          <div className="container mx-auto px-6 sm:px-8 lg:px-12">
            <div className="max-w-3xl mx-auto animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-8" />
              <div className="h-64 bg-gray-200 rounded-2xl mb-8" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-32 pb-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <Link to="/blog" className="text-amber-600 hover:text-amber-700">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <article className="pt-32 pb-16">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl mx-auto">
            {/* Back Link */}
            <Link
              to="/blog"
              className="inline-flex items-center text-gray-600 hover:text-amber-600 mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>

            {/* Header */}
            <motion.header
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <span className="inline-block bg-amber-500 text-white text-sm font-medium px-4 py-1 rounded-full mb-4">
                {post.category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
              </span>
              
              <h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-gray-600">
                <span className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  {post.author || 'SEGENPAWS Team'}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
            </motion.header>

            {/* Featured Image */}
            {post.featured_image && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8 rounded-2xl overflow-hidden"
              >
                <img
                  src={post.featured_image}
                  alt={post.title}
                  className="w-full h-auto"
                />
              </motion.div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-gray-200">
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="w-4 h-4" />
                Save
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-a:text-amber-600 prose-a:no-underline hover:prose-a:underline"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Back to Blog */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <Link
                to="/blog"
                className="inline-flex items-center text-amber-600 font-medium hover:text-amber-700"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to All Articles
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
