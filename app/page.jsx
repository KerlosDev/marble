'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import GlobalApi from '@/app/api/GlobalApi';
import ProductCard from '@/components/ProductCard';

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const heroImages = [
        '/hero1.jpeg',
        '/hero2.jpeg',
        '/hero3.jpeg',
    ];

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await GlobalApi.products();
                console.log('Products fetched:', response);

                if (response && response.products) {
                    // Get the last 2 products from the array
                    const lastTwoProducts = response.products.slice(-2);
                    setFeaturedProducts(lastTwoProducts);
                    console.log('Featured products set:', lastTwoProducts);
                    setError(null);
                } else {
                    setFeaturedProducts([]);
                    setError('No products found');
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) =>
                prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
            );
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
            {/* Hero Section */}
            <section className="relative w-full h-[70vh] md:h-screen overflow-hidden">
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <Image
                            key={image}
                            src={image}
                            alt={`Hero image ${index + 1}`}
                            fill
                            priority={index === 0}
                            className={`object-cover transition-opacity duration-1000 ${currentImageIndex === index ? 'opacity-100' : 'opacity-0'
                                }`}
                            sizes="100vw"
                        />
                    ))}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/30 to-transparent"></div>
                </div>

                <div className="relative container-custom h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                            Timeless Elegance in Stone
                        </h1>
                        <p className="text-lg md:text-xl mb-8 max-w-lg">
                            Discover our exclusive collection of premium marble and granite surfaces for your dream space.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link href="/products" className="btn btn-primary">
                                Explore Collection
                            </Link>
                            <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-foreground">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Products</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </div>

                    {loading ? (
                        <div className="flex justify-center items-center min-h-[300px]">
                            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500">{error}</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link href="/products" className="btn btn-primary">
                            View All Products
                        </Link>
                    </div>
                </div>
            </section>

            {/* Value Propositions */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Why Choose Granet</h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-4">Premium Quality</h3>
                            <p className="text-gray-600">
                                Handpicked materials sourced from the world's finest quarries, ensuring exceptional quality and durability.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-4">Expert Craftsmanship</h3>
                            <p className="text-gray-600">
                                Our master artisans combine traditional techniques with modern technology to create flawless finishes.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-4">Lifetime Guarantee</h3>
                            <p className="text-gray-600">
                                We stand by our products with professional installation support and a comprehensive warranty.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Categories */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4" style={{ fontFamily: 'Rubik, sans-serif' }}>
                            الفئات الرئيسية
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto"></div>
                    </div>

                    <div  className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Link
                            href="/landscape" 
                            className="group relative h-80 rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="/landscape.jpg"
                                alt="مناظر طبيعية"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            <div  className="absolute font-rubik bottom-0 left-0 p-8 text-white"  >
                                <h3 className="text-2xl font-rubik font-bold mb-2">لاند سكيب ملاعب </h3>
                                <p className="mb-4 font-rubik">   تصاميم الملاعب واللاند سكيب باحدث الاشكال والتصاميم</p>
                                <span className="inline-flex font-rubik items-center text-primary">
                                    استكشف المجموعة
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </div>
                        </Link>

                        <Link
                            href="/products?materialType=MARBLE"
                            className="group relative h-80 rounded-2xl overflow-hidden"
                        >
                            <Image
                                src="/marble.jpg"
                                alt="رخام"
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                                sizes="(max-width: 768px) 100vw, 50vw"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                            <div className="absolute bottom-0 left-0 p-8 text-white" style={{ fontFamily: 'Rubik, sans-serif' }}>
                                <h3 className="text-2xl font-rubik font-bold mb-2">رخام</h3>
                                <p className="mb-4 font-rubik">أناقة خالدة للمساحات الفاخرة</p>
                                <span className="inline-flex font-rubik items-center text-primary">
                                    استكشف المجموعة
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                    </svg>
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            {featuredProducts.length > 0 && (
                <section className="py-16 md:py-24 bg-gray-50">
                    <div className="container-custom">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Products</h2>
                            <div className="w-24 h-1 bg-primary mx-auto"></div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Link href="/products" className="btn btn-primary">
                                View All Products
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2400"
                        alt="Luxury kitchen with marble countertops"
                        fill
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-foreground/80"></div>
                </div>

                <div className="relative container-custom">
                    <div className="max-w-2xl mx-auto text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Transform Your Space with Premium Stone
                        </h2>
                        <p className="text-lg mb-8">
                            Request a consultation with our experts and discover the perfect stone for your project.
                        </p>
                        <Link href="/contact" className="btn btn-primary">
                            Get a Consultation
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
