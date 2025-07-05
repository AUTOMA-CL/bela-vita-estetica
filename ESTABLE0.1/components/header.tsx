
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { Menu, X, Calendar } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌸</span>
            <span className="text-2xl font-bold pink-glow">Bela Vita</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
              Inicio
            </Link>
            <button 
              onClick={() => scrollToSection('servicios')} 
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Servicios
            </button>
            <button 
              onClick={() => scrollToSection('nosotros')} 
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Nosotros
            </button>
            <button 
              onClick={() => scrollToSection('contacto')} 
              className="text-gray-700 hover:text-primary transition-colors"
            >
              Contacto
            </button>
            
            <Button>
              <Calendar className="h-4 w-4 mr-2" />
              Agendar Cita
            </Button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary transition-colors">
                Inicio
              </Link>
              <button 
                onClick={() => scrollToSection('servicios')} 
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Servicios
              </button>
              <button 
                onClick={() => scrollToSection('nosotros')} 
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Nosotros
              </button>
              <button 
                onClick={() => scrollToSection('contacto')} 
                className="text-gray-700 hover:text-primary transition-colors text-left"
              >
                Contacto
              </button>
              <Button className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Cita
              </Button>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
