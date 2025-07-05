
export interface Category {
  id: number
  name: string
  description?: string
  created_at: string
}

export interface Service {
  id: number
  name: string
  description: string
  price: number
  duration: number
  category_id: number
  image_url?: string
  created_at: string
  category?: Category
}

export interface Appointment {
  id: number
  service_id: number
  client_name: string
  client_email: string
  client_phone: string
  appointment_date: string
  appointment_time: string
  status: 'pending' | 'confirmed' | 'cancelled'
  created_at: string
  service?: Service
}

export interface BookingFormData {
  service_id: number
  client_name: string
  client_email: string
  client_phone: string
  appointment_date: string
  appointment_time: string
}
