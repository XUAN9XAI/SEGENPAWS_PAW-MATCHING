import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/hooks/useAuth'
import Index from '@/pages/Index'
import Blog from '@/pages/Blog'
import BlogPost from '@/pages/BlogPost'
import Pets from '@/pages/Pets'
import PetProfile from '@/pages/PetProfile'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/pets" element={<Pets />} />
            <Route path="/pets/:category/:name" element={<PetProfile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  )
}
