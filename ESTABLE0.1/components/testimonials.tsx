
'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "María González",
    age: 28,
    image: "https://cdn.abacus.ai/images/2f9dc5e4-94cb-4fa9-8c97-4b5d950fc74e.png",
    rating: 5,
    text: "El tratamiento de bioestimuladores cambió completamente mi piel. El equipo de Bela Vita es excepcional, muy profesional y me hicieron sentir cómoda desde el primer momento. Los resultados superaron mis expectativas.",
    treatment: "Bioestimuladores"
  },
  {
    id: 2,
    name: "Carmen Rodríguez",
    age: 42,
    image: "https://cdn.abacus.ai/images/2c437a2c-e53d-41a0-89d6-b46ffa3f0be3.png",
    rating: 5,
    text: "Después de varios tratamientos de mesoterapia, mi piel luce más joven y radiante. La atención personalizada y la calidad de los productos utilizados hacen que valga cada peso invertido. Altamente recomendado.",
    treatment: "Mesoterapia Facial"
  },
  {
    id: 3,
    name: "Isabel Morales",
    age: 58,
    image: "https://cdn.abacus.ai/images/df69a037-40ea-49cf-909c-6a988953efda.png",
    rating: 5,
    text: "A mi edad pensé que ya era tarde para este tipo de tratamientos, pero el equipo de Bela Vita me demostró lo contrario. El botox me ha dado una apariencia más fresca y natural. Me siento renovada.",
    treatment: "Tratamiento Botox"
  }
]

export default function Testimonials() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-accent/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-2 text-primary mb-4">
            <Quote className="h-5 w-5" />
            <span className="text-sm font-medium tracking-wide">TESTIMONIOS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Lo que dicen nuestras <span className="pink-glow">clientas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            La satisfacción de nuestras clientas es nuestra mayor recompensa. 
            Descubre las experiencias reales de quienes han confiado en nosotros.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.age} años</p>
                  <div className="flex items-center mt-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              
              <blockquote className="text-gray-600 mb-4 leading-relaxed">
                "{testimonial.text}"
              </blockquote>
              
              <div className="border-t pt-4">
                <span className="text-sm font-medium text-primary">
                  Tratamiento: {testimonial.treatment}
                </span>
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
          <div className="bg-white rounded-lg p-8 max-w-2xl mx-auto shadow-lg">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold pink-glow">4.9</div>
                <div className="flex items-center justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-current text-yellow-400" />
                  ))}
                </div>
              </div>
              <div className="text-left">
                <div className="text-lg font-semibold">Excelente calificación</div>
                <div className="text-gray-600">Basado en +100 reseñas</div>
              </div>
            </div>
            <p className="text-gray-600">
              Únete a nuestras clientas satisfechas y descubre la diferencia de nuestros tratamientos profesionales.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
