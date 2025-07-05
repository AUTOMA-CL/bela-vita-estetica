
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bela Vita - Tu Oasis de Belleza y Bienestar',
  description: 'Centro de spa y belleza especializado en tratamientos faciales, corporales y masajes relajantes. Agenda tu cita y déjanos cuidar de ti.',
  keywords: 'spa, belleza, bienestar, masajes, tratamientos faciales, tratamientos corporales, relajación, Bogotá',
  openGraph: {
    title: 'Bela Vita - Tu Oasis de Belleza y Bienestar',
    description: 'Centro de spa y belleza especializado en tratamientos faciales, corporales y masajes relajantes.',
    type: 'website',
    locale: 'es_CO',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
