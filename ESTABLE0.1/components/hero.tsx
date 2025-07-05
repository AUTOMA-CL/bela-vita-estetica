
'use client'

import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Sparkles, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full bg-muted">
          <Image
            src="https://cdn.abacus.ai/images/381c231a-fff2-4c09-9a2a-89191c5a6ad4.png"
            alt="Centro de estética Bela Vita - ambiente elegante y moderno"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/70 to-transparent" />
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center space-x-2 text-primary"
              >
                <Sparkles className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide">CENTRO DE ESTÉTICA PROFESIONAL</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-4xl md:text-6xl font-bold leading-tight"
              >
                Ayudamos a mujeres a{' '}
                <span className="pink-glow">verse y sentirse</span>{' '}
                más jóvenes
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="text-xl text-gray-600 leading-relaxed"
              >
                Tratamientos naturales y personalizados con la más alta calidad profesional. Descubre el poder de sentirte radiante con nuestros servicios especializados.
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" className="text-lg px-8 py-6">
                <Calendar className="h-5 w-5 mr-2" />
                Agendar Cita
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                onClick={() => scrollToSection('servicios')}
              >
                <Heart className="h-5 w-5 mr-2" />
                Ver Servicios
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="flex items-center space-x-6 pt-8"
            >
              <div className="text-center">
                <div className="text-2xl font-bold pink-glow">+500</div>
                <div className="text-sm text-gray-600">Tratamientos exitosos</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold pink-glow">98%</div>
                <div className="text-sm text-gray-600">Satisfacción del cliente</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold pink-glow">5+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="relative lg:block hidden"
          >
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-accent/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-gray-500">Descubre más</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary to-transparent animate-pulse" />
        </div>
      </motion.div>
    </section>
  )
}
