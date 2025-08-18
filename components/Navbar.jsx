'use client'
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const pathname = usePathname();
    const [materialType, setMaterialType] = useState('');

    // Set materialType from URL after mount or when pathname changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new window.URLSearchParams(window.location.search);
            setMaterialType(params.get('materialType') || '');
        }
    }, [pathname]);

    // Set up scroll event after mount
    useEffect(() => {
        function handleScroll() {
            setIsScrolled(window.scrollY > 0);
        }
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', handleScroll);
            // Set initial scroll state
            handleScroll();
            return () => window.removeEventListener('scroll', handleScroll);
        }
    }, []);

    return (
        <header dir='rtl' className={`fixed top-0 left-0 right-0 z-50  bg-white transition-all duration-300 font-[Rubik] ${isScrolled ? 'shadow-md' : 'border-b border-gray-100'
            }`}>
            <div className="container-custom px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Al-Fares Logo"
                        width={150}
                        height={48}
                        className="rounded-lg"
                        priority
                    />
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center  font-rubik gap-8">
                    <Link
                        href="/"
                        className={`relative py-2 text-sm font-rubik transition-colors hover:text-primary ${pathname === '/' ? 'text-primary' : 'text-gray-700'
                            }`}
                    >
                        <span className='  font-rubik'>الرئيسية</span>
                        {pathname === '/' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                    </Link>
                    <Link
                        href="/products?materialType=MARBLE"
                        className={`relative py-2 text-sm font-rubik transition-colors hover:text-primary ${pathname === '/products' && materialType === 'MARBLE'
                            ? 'text-primary'
                            : 'text-gray-700'
                            }`}
                    >
                        <span className='  font-rubik'>الرخام</span>
                        {pathname === '/products' && materialType === 'MARBLE' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                    </Link>
                    <Link
                        href="/products?materialType=GRANITE"
                        className={`relative py-2 text-sm font-rubik transition-colors hover:text-primary ${pathname === '/products' && materialType === 'GRANITE'
                            ? 'text-primary'
                            : 'text-gray-700'
                            }`}
                    >
                        <span className='  font-rubik'>الجرانيت</span>
                        {pathname === '/products' && materialType === 'GRANITE' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                    </Link>
                    <Link
                        href="/products?materialType=NATURAL_STONE"
                        className={`relative py-2 text-sm font-rubik transition-colors hover:text-primary ${pathname === '/products' && materialType === 'NATURAL_STONE'
                            ? 'text-primary'
                            : 'text-gray-700'
                            }`}
                    >
                        <span className='  font-rubik'>الحجر الطبيعي</span>
                        {pathname === '/products' && materialType === 'NATURAL_STONE' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                    </Link>
                    <Link
                        href="/landscape"
                        className={`relative py-2 text-sm font-rubik transition-colors hover:text-primary ${pathname === '/landscape' ? 'text-primary' : 'text-gray-700'
                            }`}
                    >
                        <span className='  font-rubik'> لاند سكيب</span>
                        {pathname === '/landscape' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                    </Link>

                    <Link
                        href="/gallery"
                        className={`relative py-2 text-sm font-rubik transition-colors hover:text-primary ${pathname === '/gallery' ? 'text-primary' : 'text-gray-700'
                            }`}
                    >
                        <span className='  font-rubik'>المعرض</span>
                        {pathname === '/gallery' && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"></span>
                        )}
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-gray-600">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            <div
                className={`md:hidden fixed top-0 right-0 left-0 z-50 bg-white transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-y-0' : '-translate-y-full'
                    }`}
                style={{ minHeight: '100vh' }}
            >
                <div className="container-custom py-4 pt-20">
                    <nav className="flex flex-col space-y-4">
                        <Link
                            href="/"
                            className={`px-4 py-2 text-sm font-rubik transition-colors rounded-lg hover:bg-gray-50 ${pathname === '/' ? 'text-primary bg-primary/5' : 'text-gray-700'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            الرئيسية
                        </Link>
                        <Link
                            href="/products?materialType=MARBLE"
                            className={`px-4 py-2 text-sm font-rubik transition-colors rounded-lg hover:bg-gray-50 ${pathname === '/products' && materialType === 'MARBLE'
                                ? 'text-primary bg-primary/5'
                                : 'text-gray-700'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            الرخام
                        </Link>
                        <Link
                            href="/products?materialType=GRANITE"
                            className={`px-4 py-2 text-sm font-rubik transition-colors rounded-lg hover:bg-gray-50 ${pathname === '/products' && materialType === 'GRANITE'
                                ? 'text-primary bg-primary/5'
                                : 'text-gray-700'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            الجرانيت
                        </Link>
                        <Link
                            href="/products?materialType=NATURAL_STONE"
                            className={`px-4 py-2 text-sm font-rubik transition-colors rounded-lg hover:bg-gray-50 ${pathname === '/products' && materialType === 'NATURAL_STONE'
                                ? 'text-primary bg-primary/5'
                                : 'text-gray-700'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            الحجر الطبيعي
                        </Link>
                        <Link
                            href="/landscape"
                            className={`px-4 py-2 text-sm font-rubik transition-colors rounded-lg hover:bg-gray-50 ${pathname === '/landscape' ? 'text-primary bg-primary/5' : 'text-gray-700'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            لاند سكيب
                        </Link>
                        <Link
                            href="/services/polishing"
                            className={`px-4 py-2 text-sm font-rubik transition-colors rounded-lg hover:bg-gray-50 ${pathname === '/services/polishing' ? 'text-primary bg-primary/5' : 'text-gray-700'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            جلى وتلميع
                        </Link>
                        <Link
                            href="/gallery"
                            className={`px-4 py-2 text-sm font-rubik transition-colors rounded-lg hover:bg-gray-50 ${pathname === '/gallery' ? 'text-primary bg-primary/5' : 'text-gray-700'
                                }`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            المعرض
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
}
