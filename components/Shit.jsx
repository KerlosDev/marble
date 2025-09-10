'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import toast from 'react-hot-toast';
import GlobalApi from '@/app/api/GlobalApi';
import ProductCard from '@/components/ProductCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { motion, useInView, useAnimation } from 'framer-motion';
import { useRef } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Premium Animation variants for $10K+ website experience
const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const luxuryReveal = {
    initial: { opacity: 0, y: 100, scale: 0.9 },
    animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.2
        }
    }
};

const magneticHover = {
    hover: {
        scale: 1.05,
        transition: { duration: 0.3, ease: "easeOut" }
    },
    tap: {
        scale: 0.95
    }
};

// Reusable Animation Component
function AnimatedSection({ children, variant = fadeInUp, className = "", ...props }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start("animate");
        }
    }, [isInView, controls]);

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={controls}
            variants={variant}
            className={className}
            {...props}
        >
            {children}
        </motion.div>
    );
}

// Luxury Trust Indicators Component
const TrustIndicators = () => (
    <motion.div
        className="flex flex-wrap justify-center items-center gap-8 py-12 opacity-60"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
    >
        {[
            "⭐ 5-Star Rated",
            "🏆 Award Winning",
            "✅ ISO Certified",
            "🛡️ 25-Year Warranty",
            "👥 10,000+ Happy Clients"
        ].map((item, index) => (
            <motion.div
                key={index}
                variants={fadeInUp}
                className="text-white/80 font-medium text-sm tracking-wide"
            >
                {item}
            </motion.div>
        ))}
    </motion.div>
);

// Luxury Stats Counter Component
const LuxuryStatsCounter = ({ value, label, prefix = "", suffix = "" }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });

    useEffect(() => {
        if (isInView) {
            const timer = setInterval(() => {
                setCount(prev => {
                    if (prev < value) {
                        return Math.min(prev + Math.ceil(value / 100), value);
                    }
                    clearInterval(timer);
                    return value;
                });
            }, 20);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <motion.div
            ref={ref}
            className="text-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
        >
            <motion.div
                className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent"
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                {prefix}{count}{suffix}
            </motion.div>
            <div className="text-gray-600 text-sm uppercase tracking-widest font-medium mt-2">{label}</div>
        </motion.div>
    );
};

// Premium Floating Elements
const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/10 rounded-full"
                style={{
                    left: `${20 + i * 15}%`,
                    top: `${30 + i * 10}%`,
                }}
                animate={{
                    y: [-20, 20],
                    opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.5
                }}
            />
        ))}
    </div>
);

export default function Shit() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const response = await GlobalApi.products();
                if (response && response.products) {
                    setFeaturedProducts(response.products.slice(-6));
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>

            {/* Premium Hero Section */}
            <section className="relative min-h-screen pt-24 flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-black">
                {/* Dynamic Background */}
                <div className="absolute inset-0">
                    <Swiper
                        modules={[EffectFade, Autoplay]}
                        effect="fade"
                        autoplay={{ delay: 6000, disableOnInteraction: false }}
                        loop={true}
                        className="h-full"
                        speed={1500}
                    >
                        <SwiperSlide>
                            <div className="relative h-full">
                                <Image
                                    src="/hero1.jpeg"
                                    alt="Luxury Marble Interior"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-full">
                                <Image
                                    src="/hero2.jpeg"
                                    alt="Premium Granite Kitchen"
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-full">
                                <Image
                                    src="/hero3.jpeg"
                                    alt="Elegant Stone Flooring"
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/90" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                <FloatingElements />

                {/* Premium Content */}
                <motion.div
                    className="relative z-10 container mx-auto px-6 text-center text-white"
                    style={{ transform: `translateY(${scrollY * 0.05}px)` }}
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                >
                    <div className="max-w-6xl mx-auto">
                        {/* Premium Badge */}
                        <motion.div
                            className="mb-8"
                            variants={luxuryReveal}
                        >
                            <motion.span
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-amber-400/20 to-yellow-500/20 backdrop-blur-xl border border-amber-400/30 rounded-full text-amber-300 font-bold tracking-wider uppercase shadow-2xl"
                                whileHover={{ scale: 1.05, boxShadow: "0 25px 50px -12px rgba(251, 191, 36, 0.25)" }}
                                transition={{ duration: 0.3 }}
                            >
                                <motion.div
                                    className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                />
                                EGYPT'S #1 PREMIUM NATURAL STONE
                                <motion.div
                                    className="w-3 h-3 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                />
                            </motion.span>
                        </motion.div>

                        {/* Luxury Headlines */}
                        <motion.div
                            variants={luxuryReveal}
                            className="mb-12"
                        >
                            <motion.h1
                                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
                                variants={fadeInUp}
                            >
                                <motion.span
                                    className="block bg-gradient-to-r from-white via-amber-100 to-amber-200 bg-clip-text text-transparent"
                                >
                                    AL FARES
                                </motion.span>
                                <motion.span
                                    className="block text-2xl md:text-4xl lg:text-5xl mt-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 bg-clip-text text-transparent font-light tracking-wider"
                                    variants={fadeInUp}
                                >
                                    MARBLE & GRANITE
                                </motion.span>
                            </motion.h1>

                            <motion.div
                                className="flex justify-center mb-8"
                                variants={fadeInUp}
                            >
                                <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full" />
                            </motion.div>

                            <motion.p
                                className="text-xl md:text-2xl lg:text-3xl mb-4 text-amber-100 max-w-4xl mx-auto leading-relaxed font-light"
                                variants={fadeInUp}
                            >
                                Transform Your Space Into A
                                <motion.span
                                    className="block text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mt-2"
                                    whileHover={{ scale: 1.05 }}
                                >
                                    MASTERPIECE
                                </motion.span>
                            </motion.p>

                            <motion.p
                                className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12"
                                variants={fadeInUp}
                            >
                                Experience the pinnacle of luxury with our handpicked premium marble and granite.
                                Over 25 years of crafting dreams into reality for Egypt's most discerning clients.
                            </motion.p>
                        </motion.div>

                        
                        {/* Trust Indicators */}
                        <TrustIndicators />
                    </div>
                </motion.div>

                {/* Premium Scroll Indicator */}
                <motion.div
                    className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-center"
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div
                        className="w-8 h-12 border-2 border-amber-400/60 rounded-full flex justify-center mb-4"
                        whileHover={{ scale: 1.1, borderColor: "rgba(251, 191, 36, 0.8)" }}
                    >
                        <motion.div
                            className="w-1 h-3 bg-gradient-to-b from-amber-400 to-yellow-500 rounded-full mt-2"
                            animate={{ y: [0, 8, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </motion.div>
                    <p className="text-amber-300/80 text-sm font-medium tracking-wider">SCROLL TO DISCOVER</p>
                </motion.div>
            </section>

            {/* About Section */}
           
        </>
    );
}