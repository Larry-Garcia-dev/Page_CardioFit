import { Navbar } from "@/components/sections/navbar"
import { HeroSection } from "@/components/sections/hero"
import { PricingSection } from "@/components/sections/pricing"
import { ServicesSection } from "@/components/sections/services"
import { TeamSection } from "@/components/sections/team"
import { ContactSection } from "@/components/sections/contact"
import { Footer } from "@/components/sections/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#00041c]">
      <Navbar />
      <HeroSection />
      <PricingSection />
      <ServicesSection />
      <TeamSection />
      <ContactSection />
      <Footer />
    </main>
  )
}
