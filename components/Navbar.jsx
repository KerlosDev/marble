'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`
        fixed w-full z-50 font-rubik transition-all duration-500
        ${scrolled ? 'bg-[url("/marble_720.png")] bg-center shadow-xl py-4' : 'bg-transparent py-6'}
        before:content-[''] before:absolute before:inset-0  
        before:transition-all before:duration-500
        ${scrolled ? ' before:bg-opacity-80' : 'before:bg-transparent'}
      `}
    >
      <div className="relative z-10 container mx-auto px-8 md:px-12 lg:px-16">
        <div className="flex justify-between items-center">
          {/* Left side with Search & Contact */}
          <div className="flex items-center space-x-4 rtl:space-x-reverse">
            {/* Contact Button */}
            <div className="hidden lg:block">
              <Link href="/contact">
                <button className=" bg-white text-black px-7 py-3 rounded-full font-medium text-base hover:shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
                  English
                </button>
              </Link>
            </div>

            {/* Search Icon */}
            <div className="hidden lg:flex items-center">
              <button className="text-white hover:text-marble transition-colors duration-200 p-3 rounded-full hover:bg-white/10">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-marble p-3 rounded-lg hover:bg-white/10 transition-colors duration-200"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Navigation - Desktop - Center */}
          <div className="hidden lg:flex items-center justify-center space-x-6 rtl:space-x-reverse">
            <Link
              href="/contact"
              className="text-white hover:text-marble px-5 py-3 font-medium text-base transition-colors duration-200 relative group"
            >
              اتصل بنا
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-marble transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>

            <Link
              href="/about"
              className="text-white hover:text-marble px-5 py-3 font-medium text-base transition-colors duration-200 relative group"
            >
              عن الشركة
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-marble transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>



            <div className="relative group">
              <button className="text-white hover:text-marble px-5 py-3 font-medium text-base flex items-center gap-1 transition-colors duration-200">
                المنتجات
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transition-transform duration-200 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-0 pt-2 w-52 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <div dir='rtl' className="rounded-lg shadow-xl bg-white/95 backdrop-blur-sm border-t-2 border-yellow-300">
                  <div className="py-1">
                    <Link href="/products" className="block px-6 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-marble transition-colors duration-150">المصنع</Link>
                    <Link href="/products" className="block px-6 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-marble transition-colors duration-150">التشطيبات</Link>
                    <Link href="/products" className="block px-6 py-3 text-sm text-gray-800 hover:bg-gray-100 hover:text-marble transition-colors duration-150">التعبئة والتغليف</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link
              href="/"
              className="text-white hover:text-marble px-5 py-3 font-medium text-base transition-colors duration-200 relative group"
            >
              الرئيسية
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-marble transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"></span>
            </Link>
          </div>

          {/* Logo - Now on the right */}
          <div className="flex-shrink-0">
            <Link href="/">
              <div className="relative">
                <Image
                  src="/logo-en.png"
                  alt="Prime Marble"
                  width={160}
                  height={70}
                  className="h-16 w-auto object-contain transition-all duration-300 hover:opacity-90"
                />
                {scrolled && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-yellow-300 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu - Enhanced with animations */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black/95 backdrop-blur-md py-5 px-8 absolute top-full left-0 right-0 border-t border-white/10 animate-fadeIn">
          <div className="flex flex-col space-y-3 text-right">
            <Link
              href="/"
              className="text-white font-medium py-3 border-b border-white/10 hover:text-marble transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              الرئيسية
            </Link>

            <div className="relative border-b border-white/10">
              <button
                className="text-white font-medium py-3 w-full text-right flex justify-between items-center hover:text-marble transition-colors duration-200"
                onClick={(e) => {
                  const submenu = e.currentTarget.nextElementSibling;
                  submenu.classList.toggle('hidden');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                المنتجات
              </button>
              <div dir='rtl' className="hidden bg-white/5 rounded-md mt-1 mb-2">
                <Link href="/products" className="block py-2 px-4 text-sm text-white/80 hover:text-marble" onClick={() => setIsMenuOpen(false)}>المصنع</Link>
                <Link href="/products" className="block py-2 px-4 text-sm text-white/80 hover:text-marble" onClick={() => setIsMenuOpen(false)}>التشطيبات</Link>
                <Link href="/products" className="block py-2 px-4 text-sm text-white/80 hover:text-marble" onClick={() => setIsMenuOpen(false)}>التعبئة والتغليف</Link>
              </div>
            </div>

            <div className="relative border-b border-white/10">
              <button
                className="text-white font-medium py-3 w-full text-right flex justify-between items-center hover:text-marble transition-colors duration-200"
                onClick={(e) => {
                  const submenu = e.currentTarget.nextElementSibling;
                  submenu.classList.toggle('hidden');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
                كيف يسير العمل؟
              </button>
              <div className="hidden bg-white/5 rounded-md mt-1 mb-2">
                <Link href="/workflow" className="block py-2 px-4 text-sm text-white/80 hover:text-marble" onClick={() => setIsMenuOpen(false)}>مراحل العمل</Link>
                <Link href="/process" className="block py-2 px-4 text-sm text-white/80 hover:text-marble" onClick={() => setIsMenuOpen(false)}>عملية التصنيع</Link>
              </div>
            </div>

            <Link
              href="/about"
              className="text-white font-medium py-3 border-b border-white/10 hover:text-marble transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              عن الشركة
            </Link>

            <Link
              href="/en"
              className="text-white font-medium py-3 border-b border-white/10 hover:text-marble transition-colors duration-200"
              onClick={() => setIsMenuOpen(false)}
            >
              اتصل بنا
            </Link>

            <Link href="/contact" onClick={() => setIsMenuOpen(false)}>
              <button className=" bg-marble   text-black px-6 py-3 rounded-md font-medium mt-2 hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300">
                English
              </button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar