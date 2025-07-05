
'use client'

import { motion } from 'framer-motion'
import { Heart, Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-['Playfair_Display'] text-2xl font-bold text-[#E6C0C8]">
              Bela Vita
            </h3>
            <p className="font-['Montserrat'] text-gray-400 leading-relaxed">
              Tu oasis de belleza y bienestar donde cada tratamiento es una experiencia única de relajación y renovación.
            </p>
            <div className="flex space-x-4">
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-[#E6C0C8] rounded-full flex items-center justify-center text-gray-900 hover:bg-[#E6C0C8]/80 transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1 }}
                href="#"
                className="w-10 h-10 bg-[#E6C0C8] rounded-full flex items-center justify-center text-gray-900 hover:bg-[#E6C0C8]/80 transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display'] text-lg font-semibold">
              Contáctanos
            </h4>
            <div className="space-y-3 font-['Montserrat'] text-gray-400">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#E6C0C8]" />
                <span>(+57) 310 123 4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#E6C0C8]" />
                <span>info@belavita.co</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-[#E6C0C8]" />
                <span>Bogotá, Colombia</span>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="space-y-4">
            <h4 className="font-['Playfair_Display'] text-lg font-semibold">
              Horarios de Atención
            </h4>
            <div className="space-y-2 font-['Montserrat'] text-gray-400">
              <div className="flex justify-between">
                <span>Lunes - Viernes</span>
                <span>9:00 AM - 7:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados</span>
                <span>9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span>Domingos</span>
                <span>Cerrado</span>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-8 pt-8 text-center"
        >
          <p className="font-['Montserrat'] text-gray-400 flex items-center justify-center">
            © 2024 Bela Vita. Hecho con
            <Heart className="w-4 h-4 mx-1 text-[#E6C0C8]" />
            para tu bienestar.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
