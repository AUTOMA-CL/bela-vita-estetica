
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from './ui/button'
import { Calendar, Sparkles } from 'lucide-react'

const services = [
  {
    id: 1,
    name: "Tratamiento Botox",
    description: "Reducción de arrugas de expresión con resultados naturales y seguros.",
    price: "Desde $80.000",
    image: "https://cdn.abacus.ai/images/42ee2d93-0e0a-4753-ac59-adfaf80c3246.png",
    duration: "30 min"
  },
  {
    id: 2,
    name: "Bioestimuladores",
    description: "Estimulación natural del colágeno para rejuvenecimiento facial.",
    price: "Desde $120.000",
    image: "https://cdn.abacus.ai/images/7623938f-64bc-4e68-863e-f80a6cbf4a05.png",
    duration: "45 min"
  },
  {
    id: 3,
    name: "Mesoterapia Facial",
    description: "Hidratación profunda y revitalización de la piel con microagujas.",
    price: "Desde $60.000",
    image: "https://cdn.abacus.ai/images/ef2ef2c9-2e03-4bb8-b1e2-00bfc5a6a760.png",
    duration: "60 min"
  },
  {
    id: 4,
    name: "Rejuvenecimiento Láser",
    description: "Tratamiento avanzado para mejorar textura y luminosidad de la piel.",
    price: "Desde $100.000",
    image: "https://cdn.abacus.ai/images/62201cfa-eaa6-437d-8369-60bf98206057.png",
    duration: "40 min"
  },
  {
    id: 5,
    name: "Limpieza Facial Profunda",
    description: "Purificación completa de la piel con productos de alta gama.",
    price: "Desde $40.000",
    image: "https://cdn.abacus.ai/images/c35328ea-2a78-4df0-b25b-37f407abbef4.png",
    duration: "90 min"
  },
  {
    id: 6,
    name: "Tratamiento Anti-edad",
    description: "Tecnología de vanguardia para combatir los signos del envejecimiento.",
    price: "Desde $150.000",
    image: "https://cdn.abacus.ai/images/fe8bb1b0-1698-421c-a1ae-0a0d9e59cc36.png",
    duration: "75 min"
  }
]

export default function Services() {
  return (
    <section id="servicios" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Sparkles className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide">NUESTROS SERVICIOS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Tratamientos <span className="pink-glow">Especializados</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ofrecemos una amplia gama de tratamientos estéticos con la más alta calidad profesional, 
            utilizando técnicas avanzadas y productos de primera línea.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="service-card bg-white rounded-lg overflow-hidden"
            >
              <div className="relative h-64">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-gray-800">
                  {service.duration}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold pink-glow">{service.price}</span>
                  <Button size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    Agendar
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg">
            Ver Todos los Servicios
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
