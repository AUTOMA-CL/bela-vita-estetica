
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: number
          name: string
          description: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string | null
          created_at?: string
        }
      }
      services: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          duration: number
          category_id: number
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          duration: number
          category_id: number
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          duration?: number
          category_id?: number
          image_url?: string | null
          created_at?: string
        }
      }
      appointments: {
        Row: {
          id: number
          service_id: number
          client_name: string
          client_email: string
          client_phone: string
          appointment_date: string
          appointment_time: string
          status: string
          created_at: string
        }
        Insert: {
          id?: number
          service_id: number
          client_name: string
          client_email: string
          client_phone: string
          appointment_date: string
          appointment_time: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: number
          service_id?: number
          client_name?: string
          client_email?: string
          client_phone?: string
          appointment_date?: string
          appointment_time?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}
