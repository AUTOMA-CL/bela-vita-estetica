
'use client'

import { motion } from 'framer-motion'
import { Button } from './ui/button'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'

export default function Contact() {
  return (
    <section id="contacto" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Phone className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide">CONTACTO</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            ¿Lista para <span className="pink-glow">transformarte</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Contáctanos para agendar tu consulta personalizada. Estamos aquí para ayudarte 
            a alcanzar tus objetivos de belleza y bienestar.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-lg p-8"
          >
            <h3 className="text-2xl font-semibold mb-6">Envíanos un mensaje</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                    placeholder="+56 9 xxxx xxxx"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Servicio de interés
                </label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors">
                  <option value="">Selecciona un servicio</option>
                  <option value="botox">Tratamiento Botox</option>
                  <option value="bioestimuladores">Bioestimuladores</option>
                  <option value="mesoterapia">Mesoterapia Facial</option>
                  <option value="laser">Rejuvenecimiento Láser</option>
                  <option value="limpieza">Limpieza Facial</option>
                  <option value="antiedad">Tratamiento Anti-edad</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje
                </label>
                <textarea
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                ></textarea>
              </div>
              
              <Button size="lg" className="w-full">
                <Send className="h-5 w-5 mr-2" />
                Enviar mensaje
              </Button>
            </form>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6">Información de contacto</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Ubicación</h4>
                    <p className="text-gray-600">
                      Av. Las Condes 12345, Oficina 456<br />
                      Las Condes, Santiago<br />
                      Región Metropolitana
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Teléfono</h4>
                    <p className="text-gray-600">+56 9 8765 4321</p>
                    <p className="text-gray-600">+56 2 2345 6789</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">contacto@belavita.cl</p>
                    <p className="text-gray-600">citas@belavita.cl</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-3 rounded-lg">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Horarios</h4>
                    <div className="text-gray-600 space-y-1">
                      <p>Lunes - Viernes: 9:00 - 19:00</p>
                      <p>Sábados: 9:00 - 16:00</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Agenda tu cita</h4>
              <p className="text-gray-600 mb-4">
                ¿Prefieres llamar directamente? Nuestro equipo está listo para atenderte 
                y ayudarte a encontrar el tratamiento perfecto para ti.
              </p>
              <Button className="w-full">
                <Phone className="h-4 w-4 mr-2" />
                Llamar ahora
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
