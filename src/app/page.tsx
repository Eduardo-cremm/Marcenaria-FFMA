import HeroSection from '@/components/sections/HeroSection'
import CategoriesSection from '@/components/sections/CategoriesSection'
import FeaturedProjects from '@/components/sections/FeaturedProjects'
import WhyFFMA from '@/components/sections/WhyFFMA'
import ProcessSection from '@/components/sections/ProcessSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import BeforeAfterSection from '@/components/sections/BeforeAfterSection'
import FAQSection from '@/components/sections/FAQSection'
import CTASection from '@/components/sections/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProjects />
      <WhyFFMA />
      <ProcessSection />
      <TestimonialsSection />
      <BeforeAfterSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
