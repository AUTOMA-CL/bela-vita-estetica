
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from './ui/button'
import { Heart, Award, Users, Calendar } from 'lucide-react'

export default function About() {
  return (
    <section id="nosotros" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-lg overflow-hidden">
              <Image
                src="https://cdn.abacus.ai/images/f36117c4-4cc6-4e44-81b5-c44d62d6301e.png"
                alt="Doctora profesional de Bela Vita"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-xl" />
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full blur-lg" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-primary">
                <Heart className="h-5 w-5" />
                <span className="text-sm font-medium tracking-wide">SOBRE NOSOTROS</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                Excelencia en <span className="pink-glow">Estética</span> y Bienestar
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                En Bela Vita, nos especializamos en tratamientos estéticos de vanguardia que combinan 
                ciencia, arte y cuidado personalizado. Nuestro equipo de profesionales altamente 
                capacitados se dedica a realzar tu belleza natural con técnicas innovadoras y seguras.
              </p>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                Con más de 5 años de experiencia, hemos ayudado a cientos de mujeres a sentirse 
                más seguras y radiantes. Cada tratamiento está diseñado específicamente para 
                tus necesidades únicas.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold pink-glow">5+</div>
                <div className="text-sm text-gray-600">Años de experiencia</div>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold pink-glow">500+</div>
                <div className="text-sm text-gray-600">Clientes satisfechas</div>
              </div>
              <div className="text-center">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <div className="text-2xl font-bold pink-glow">98%</div>
                <div className="text-sm text-gray-600">Satisfacción</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg">
                <Calendar className="h-5 w-5 mr-2" />
                Agenda tu Consulta
              </Button>
              <Button variant="outline" size="lg">
                Conoce al Equipo
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
