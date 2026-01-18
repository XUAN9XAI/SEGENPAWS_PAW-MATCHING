import { Hero } from '@/components/Hero'
import { PetMatchQuiz } from '@/components/PetMatchQuiz'
import { Features } from '@/components/Features'
import { WhySegenpaws } from '@/components/WhySegenpaws'
import { PetCategories } from '@/components/PetCategories'
import { CareTipsSection } from '@/components/CareTipsSection'
import { ContactForm } from '@/components/ContactForm'
import { Footer } from '@/components/Footer'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground" style={{ overflow: 'visible' }}>
      <main className="relative" role="main" style={{ overflow: 'visible' }}>
        <section id="hero" aria-label="Hero section">
          <Hero />
        </section>
        <section id="quiz" aria-label="Pet Match Quiz section">
          <PetMatchQuiz />
        </section>
        <section id="features" aria-label="Features section">
          <Features />
        </section>
        <section id="why-segenpaws" aria-label="Why SEGENPAWS section">
          <WhySegenpaws />
        </section>
        <section id="pet-categories" aria-label="Pet Categories section">
          <PetCategories />
        </section>
        <section id="care-tips" aria-label="Care Tips section">
          <CareTipsSection />
        </section>
        <section id="contact" aria-label="Contact section">
          <ContactForm />
        </section>
      </main>
      <Footer />
    </div>
  )
}
