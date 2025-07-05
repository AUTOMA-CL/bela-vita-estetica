
'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Calendar, Clock, User, Mail, Phone, CheckCircle, Loader2 } from 'lucide-react'
import { Service, BookingFormData } from '@/lib/types'
import { mockServices, availableTimeSlots } from '@/lib/seed-data'
import 'react-day-picker/dist/style.css'

interface BookingSectionProps {
  selectedService?: Service | null
}

export default function BookingSection({ selectedService }: BookingSectionProps) {
  const [services, setServices] = useState<Service[]>([])
  const [formData, setFormData] = useState<BookingFormData>({
    service_id: selectedService?.id || 0,
    client_name: '',
    client_email: '',
    client_phone: '',
    appointment_date: '',
    appointment_time: '',
  })
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<BookingFormData>>({})

  useEffect(() => {
    setServices(mockServices)
  }, [])

  useEffect(() => {
    if (selectedService) {
      setFormData(prev => ({ ...prev, service_id: selectedService.id }))
    }
  }, [selectedService])

  const selectedServiceData = services.find(s => s.id === formData.service_id)

  const validateForm = (): boolean => {
    const newErrors: Partial<BookingFormData> = {}
    
    if (!formData.service_id) newErrors.service_id = 0
    if (!formData.client_name.trim()) newErrors.client_name = 'El nombre es requerido'
    if (!formData.client_email.trim()) newErrors.client_email = 'El email es requerido'
    if (!formData.client_phone.trim()) newErrors.client_phone = 'El teléfono es requerido'
    if (!formData.appointment_date) newErrors.appointment_date = 'La fecha es requerida'
    if (!formData.appointment_time) newErrors.appointment_time = 'La hora es requerida'

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.client_email && !emailRegex.test(formData.client_email)) {
      newErrors.client_email = 'Email inválido'
    }

    // Phone validation
    const phoneRegex = /^[0-9\-\+\(\)\s]+$/
    if (formData.client_phone && !phoneRegex.test(formData.client_phone)) {
      newErrors.client_phone = 'Teléfono inválido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    if (date) {
      setFormData(prev => ({
        ...prev,
        appointment_date: date.toISOString().split('T')[0]
      }))
    }
  }

  const handleTimeSelect = (time: string) => {
    setFormData(prev => ({ ...prev, appointment_time: time }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In real app, this would be a Supabase call:
      // const { data, error } = await supabase
      //   .from('appointments')
      //   .insert([formData])
      
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting booking:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      service_id: 0,
      client_name: '',
      client_email: '',
      client_phone: '',
      appointment_date: '',
      appointment_time: '',
    })
    setSelectedDate(undefined)
    setIsSubmitted(false)
    setErrors({})
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
    }).format(price)
  }

  const today = new Date()
  const maxDate = new Date()
  maxDate.setMonth(maxDate.getMonth() + 3)

  if (isSubmitted) {
    return (
      <section id="booking" className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Card className="max-w-md mx-auto shadow-xl border-[#A7D7C5]">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-16 h-16 bg-[#A7D7C5] rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-['Playfair_Display'] text-2xl text-gray-900">
                  ¡Cita Confirmada!
                </CardTitle>
                <CardDescription className="font-['Montserrat'] text-gray-600">
                  Hemos recibido tu solicitud de cita exitosamente
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedServiceData && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="font-semibold">{selectedServiceData.name}</p>
                    <p className="text-sm text-gray-600">
                      {formData.appointment_date} a las {formData.appointment_time}
                    </p>
                    <p className="text-sm text-[#E6C0C8] font-semibold">
                      {formatPrice(selectedServiceData.price)}
                    </p>
                  </div>
                )}
                <p className="text-sm text-gray-500 text-center">
                  Te contactaremos pronto para confirmar los detalles de tu cita
                </p>
                <Button
                  onClick={resetForm}
                  variant="rosa"
                  className="w-full"
                >
                  Agendar Otra Cita
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Agenda tu Momento
          </h2>
          <p className="font-['Montserrat'] text-lg text-gray-600 max-w-2xl mx-auto">
            Reserva tu cita y déjanos cuidar de ti en un ambiente de total relajación
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl">
              <CardHeader>
                <CardTitle className="font-['Playfair_Display'] text-2xl flex items-center">
                  <Calendar className="mr-2 h-6 w-6 text-[#E6C0C8]" />
                  Información de la Cita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label htmlFor="service">Servicio *</Label>
                    <Select
                      value={formData.service_id.toString()}
                      onValueChange={(value) => setFormData(prev => ({ ...prev, service_id: parseInt(value) }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona un servicio" />
                      </SelectTrigger>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.name} - {formatPrice(service.price)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Fecha *</Label>
                    <div className="border rounded-md p-3">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        disabled={{ before: today, after: maxDate }}
                        className="rdp-custom"
                        classNames={{
                          selected: 'rdp-selected bg-[#E6C0C8] text-white',
                          today: 'rdp-today bg-gray-100',
                        }}
                      />
                    </div>
                  </div>

                  {/* Time Selection */}
                  {formData.appointment_date && (
                    <div className="space-y-2">
                      <Label>Hora disponible *</Label>
                      <div className="grid grid-cols-3 gap-2">
                        {availableTimeSlots.map((time) => (
                          <Button
                            key={time}
                            type="button"
                            variant={formData.appointment_time === time ? "rosa" : "outline"}
                            size="sm"
                            onClick={() => handleTimeSelect(time)}
                            className="text-sm"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            {time}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Client Information */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Nombre completo *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="name"
                          type="text"
                          value={formData.client_name}
                          onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                          className="pl-10"
                          placeholder="Tu nombre completo"
                        />
                      </div>
                      {errors.client_name && (
                        <p className="text-sm text-red-500">{errors.client_name}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="email"
                          type="email"
                          value={formData.client_email}
                          onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                          className="pl-10"
                          placeholder="tu@email.com"
                        />
                      </div>
                      {errors.client_email && (
                        <p className="text-sm text-red-500">{errors.client_email}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Teléfono *</Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.client_phone}
                          onChange={(e) => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
                          className="pl-10"
                          placeholder="(+57) 300 123 4567"
                        />
                      </div>
                      {errors.client_phone && (
                        <p className="text-sm text-red-500">{errors.client_phone}</p>
                      )}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="rosa"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Confirmando...
                      </>
                    ) : (
                      'Confirmar Cita'
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Summary */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl sticky top-8">
              <CardHeader>
                <CardTitle className="font-['Playfair_Display'] text-2xl">
                  Resumen de tu Cita
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedServiceData ? (
                  <>
                    <div className="border-b pb-4">
                      <h3 className="font-semibold text-lg">{selectedServiceData.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{selectedServiceData.description}</p>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedServiceData.duration} minutos
                        </span>
                        <span className="font-bold text-xl text-[#E6C0C8]">
                          {formatPrice(selectedServiceData.price)}
                        </span>
                      </div>
                    </div>

                    {formData.appointment_date && formData.appointment_time && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Fecha y Hora:</h4>
                        <p className="text-gray-600">
                          {new Date(formData.appointment_date).toLocaleDateString('es-CO', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                        <p className="text-gray-600">{formData.appointment_time}</p>
                      </div>
                    )}

                    {formData.client_name && (
                      <div className="space-y-2">
                        <h4 className="font-semibold">Cliente:</h4>
                        <p className="text-gray-600">{formData.client_name}</p>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Selecciona un servicio para comenzar</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
