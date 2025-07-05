
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Clock, DollarSign, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Service, Category } from '@/lib/types'
import { mockServices, mockCategories } from '@/lib/seed-data'

interface ServicesSectionProps {
  onServiceSelect: (service: Service) => void
}

export default function ServicesSection({ onServiceSelect }: ServicesSectionProps) {
  const [services, setServices] = useState<Service[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
  const [filteredServices, setFilteredServices] = useState<Service[]>([])

  useEffect(() => {
    // Load mock data (in real app, this would be from Supabase)
    setServices(mockServices)
    setCategories(mockCategories)
    setFilteredServices(mockServices)
  }, [])

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredServices(services)
    } else {
      setFilteredServices(services.filter(service => service.category_id === selectedCategory))
    }
  }, [selectedCategory, services])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const handleServiceSelect = (service: Service) => {
    onServiceSelect(service)
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="services" className="py-16 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Nuestros Servicios
          </h2>
          <p className="font-['Montserrat'] text-lg text-gray-600 max-w-2xl mx-auto">
            Descubre nuestra amplia gama de tratamientos diseñados para revitalizar tu cuerpo y mente
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          <Button
            onClick={() => setSelectedCategory(null)}
            variant={selectedCategory === null ? "rosa" : "outline"}
            className="rounded-full px-6"
          >
            Todos los Servicios
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? "rosa" : "outline"}
              className="rounded-full px-6"
            >
              {category.name}
            </Button>
          ))}
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden h-full">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={service.image_url || '/placeholder.jpg'}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-[#E6C0C8] text-gray-800 px-3 py-1 rounded-full text-sm font-medium">
                    <Sparkles className="inline w-4 h-4 mr-1" />
                    Premium
                  </div>
                </div>
                
                <CardHeader className="pb-3">
                  <CardTitle className="font-['Playfair_Display'] text-xl font-bold text-gray-900">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="font-['Montserrat'] text-gray-600 line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {service.duration} min
                    </div>
                    <div className="flex items-center font-semibold text-[#E6C0C8]">
                      <DollarSign className="w-4 h-4 mr-1" />
                      {formatPrice(service.price)}
                    </div>
                  </div>

                  <Button
                    onClick={() => handleServiceSelect(service)}
                    variant="rosa"
                    className="w-full group-hover:bg-[#E6C0C8]/90 transition-colors"
                  >
                    Seleccionar Servicio
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
