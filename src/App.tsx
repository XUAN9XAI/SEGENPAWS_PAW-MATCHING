import { Routes, Route } from 'react-router-dom'
import { Toaster } from './components/ui/sonner'
import HomePage from './pages/HomePage'
import QuizPage from './pages/QuizPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import PetProfilePage from './pages/PetProfilePage'
import AdoptionResourcesPage from './pages/AdoptionResourcesPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/pets/:category" element={<PetProfilePage />} />
        <Route path="/adoption" element={<AdoptionResourcesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </>
  )
}
