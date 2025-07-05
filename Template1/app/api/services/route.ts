
import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { mockServices, mockCategories } from '@/lib/seed-data'

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    // Try to connect to Supabase
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        category:categories(*)
      `)
      .order('category_id', { ascending: true })

    if (error) {
      console.error('Supabase error, using mock data:', error)
      // Return mock data if Supabase is not available
      const servicesWithCategories = mockServices.map(service => ({
        ...service,
        category: mockCategories.find(cat => cat.id === service.category_id)
      }))
      return NextResponse.json({ data: servicesWithCategories })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('API error, using mock data:', error)
    // Return mock data if there's any error
    const servicesWithCategories = mockServices.map(service => ({
      ...service,
      category: mockCategories.find(cat => cat.id === service.category_id)
    }))
    return NextResponse.json({ data: servicesWithCategories })
  }
}
