
'use client'

import { useState } from 'react'
import Header from '@/components/header'
import HeroSection from '@/components/hero-section'
import ServicesSection from '@/components/services-section'
import BookingSection from '@/components/booking-section'
import Footer from '@/components/footer'
import { Service } from '@/lib/types'

export default function Home() {
  const [selectedService, setSelectedService] = useState<Service | null>(null)

  const handleBookingClick = () => {
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
  }

  return (
    <main className="min-h-screen">
      <Header onBookingClick={handleBookingClick} />
      <HeroSection onBookingClick={handleBookingClick} />
      <ServicesSection onServiceSelect={handleServiceSelect} />
      <BookingSection selectedService={selectedService} />
      <Footer />
    </main>
  )
}
