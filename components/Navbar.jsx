'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import NavButton from './ui/NavButton';
import { usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('ar');
  const pathname = usePathname();

  const navItems = {
    ar: [
      { title: 'الرئيسية', href: '/' },
      { title: 'الرخام', href: '/products?category=marble' },
      { title: 'الجرانيت', href: '/products?category=granite' },
      { title: 'الحجر الطبيعي', href: '/products?category=natural-stone' },
      { title: 'توريد وتركيب', href: '/products?category=installation' },
      { title: 'جلى وتلميع', href: '/products?category=polishing' },
      { title: 'المعرض', href: '/landscape' },
    ],
    en: [
      { title: 'Home', href: '/' },
      { title: 'Marble', href: '/products?category=marble' },
      { title: 'Granite', href: '/products?category=granite' },
      { title: 'Natural Stone', href: '/products?category=natural-stone' },
      { title: 'Supply & Install', href: '/products?category=installation' },
      { title: 'Polish & Shine', href: '/products?category=polishing' },
      { title: 'Gallery', href: '/landscape' },
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-gradient-to-b from-black/50 to-transparent'
    }`}>
      <div className="container-custom">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex-shrink-0 relative overflow-hidden group">
            <Link href="/" className="block relative transform transition-transform duration-300 hover:scale-105">
              <div className="relative">
                <Image
                  src={isScrolled ? "/logo-ar.png" : "/logowhite.png"}
                  alt="Granet Logo"
                  width={140}
                  height={60}
                  className="h-14 w-auto transition-all duration-500 transform"
                  priority
                />
                <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 md:gap-2">
            <div className="flex items-center gap-1 md:gap-2 border-l border-r border-white/10 px-6 mx-4">
              {navItems[language].map((item) => (
                <NavButton
                  key={item.href}
                  href={item.href}
                  className={`px-3 py-2 text-[15px] font-medium tracking-wide transition-all duration-300 font-rubik relative overflow-hidden group ${
                    isScrolled ? 'text-gray-800 hover:text-primary' : 'text-white/90 hover:text-white'
                  }`}
                >
                  <span className="relative z-10">{item.title}</span>
                  <div className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded"></div>
                </NavButton>
              ))}
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <Link 
                href="/contact" 
                className={`btn font-rubik ${
                  isScrolled 
                    ? 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30' 
                    : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
                } text-[15px] px-5 py-2.5 rounded-lg transition-all duration-300 transform hover:scale-[1.02]`}
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Link>

              {/* Language Switcher */}
              <button
                onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 group ${
                  isScrolled 
                    ? 'text-gray-700 hover:bg-gray-100' 
                    : 'text-white/90 hover:bg-white/10'
                }`}
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <span className="font-rubik text-[15px] font-medium">{language === 'ar' ? 'EN' : 'عربي'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                  stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex items-center justify-center p-2 rounded-lg transition-all duration-300 font-rubik ${
                isScrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="sr-only font-rubik">القائمة الرئيسية</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-7 w-7"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div 
          className={`fixed top-0 end-0 h-full w-80 bg-white dark:bg-gray-900 transform transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={e => e.stopPropagation()}
        >
          <div className="flex justify-between items-center p-5 border-b border-gray-200 dark:border-gray-800">
            <h2 className="text-lg font-semibold font-rubik">
              {language === 'ar' ? 'القائمة' : 'Menu'}
            </h2>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="p-5 space-y-3">
            {navItems[language].map((item) => (
              <NavButton
                key={item.href}
                href={item.href}
                className="block w-full px-4 py-3 text-[15px] font-medium tracking-wide font-rubik rounded-lg transition-all duration-300 hover:bg-primary/10 hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </NavButton>
            ))}
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-800">
              <Link 
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-center px-4 py-3 rounded-lg text-[15px] font-medium font-rubik bg-primary text-white hover:bg-primary-dark transition-colors duration-300 shadow-lg shadow-primary/20"
              >
                {language === 'ar' ? 'تواصل معنا' : 'Contact Us'}
              </Link>
              
              <button
                onClick={() => {
                  setLanguage(language === 'ar' ? 'en' : 'ar');
                  setIsMenuOpen(false);
                }}
                className="mt-3 w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-[15px] font-medium font-rubik hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
              >
                <span>{language === 'ar' ? 'Switch to English' : 'تغيير للغة العربية'}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                  stroke="currentColor" className="w-5 h-5 transition-transform duration-300 group-hover:scale-110">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;