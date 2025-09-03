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

export default function HomePage() {
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
                                    ALFARIS
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

                        {/* Premium CTA Buttons */}
                        <motion.div
                            className="flex flex-col lg:flex-row gap-6 justify-center items-center mb-16"
                            variants={staggerContainer}
                        >
                            <motion.div
                                variants={magneticHover}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Link
                                    href="/products"
                                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 rounded-full shadow-2xl transition-all duration-500 overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-amber-500"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <span className="relative z-10 flex items-center gap-3">
                                        💎 EXPLORE PREMIUM COLLECTION
                                        <motion.svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </motion.svg>
                                    </span>
                                </Link>
                            </motion.div>

                            <motion.div
                                variants={magneticHover}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                <Link
                                    href="#contact"
                                    className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-3 border-amber-400/50 rounded-full backdrop-blur-xl transition-all duration-500 overflow-hidden"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-500/20"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.3 }}
                                    />
                                    <span className="relative z-10 flex items-center gap-3">
                                        🎯 GET FREE LUXURY CONSULTATION
                                    </span>
                                </Link>
                            </motion.div>
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
            <section className="py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-blue-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Section Header */}
                    <AnimatedSection className="text-center mb-20">
                        <motion.div
                            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-50 rounded-full border border-blue-100 mb-6"
                            variants={fadeInUp}
                        >
                            <motion.div
                                className="w-2 h-2 bg-blue-600 rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                            <span className="text-sm font-semibold text-blue-600 tracking-wider uppercase">
                                About Alfaris
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight"
                            variants={fadeInUp}
                        >
                            <span className="bg-gradient-to-r from-gray-900 via-blue-900 to-gray-900 bg-clip-text text-transparent">
                                Excellence in
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-blue-600 to-amber-500 bg-clip-text text-transparent">
                                Natural Stone
                            </span>
                        </motion.h2>

                        <motion.div
                            className="flex justify-center mb-6"
                            variants={fadeInUp}
                        >
                            <div className="h-1 w-24 bg-gradient-to-r from-blue-600 via-amber-400 to-blue-600 rounded-full" />
                        </motion.div>

                        <motion.p
                            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                            variants={fadeInUp}
                        >
                            Where tradition meets innovation in the world of premium marble and granite craftsmanship
                        </motion.p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        {/* Content Section */}
                        <AnimatedSection variant={fadeInLeft}>
                            {/* Company Story */}
                            <motion.div className="mb-12" variants={fadeInUp}>
                                <div className="flex items-start gap-4 mb-6">
                                    <motion.div
                                        className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </motion.div>
                                    <div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Our Legacy</h3>
                                        <p className="text-gray-600 leading-relaxed text-lg">
                                            For over two decades, Alfaris Marble & Granite has been Egypt's premier destination for luxury natural stone solutions. We've built our reputation on uncompromising quality, innovative design, and exceptional craftsmanship.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Mission & Vision */}
                            <motion.div className="mb-12" variants={fadeInUp}>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <motion.div
                                        className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                                        whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Our Vision</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            To be the leading natural stone company in the Middle East, setting industry standards for quality and innovation.
                                        </p>
                                    </motion.div>

                                    <motion.div
                                        className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100"
                                        whileHover={{ y: -5, shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)" }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <h4 className="font-bold text-gray-900 mb-2">Our Mission</h4>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            Delivering exceptional natural stone solutions that transform spaces and exceed client expectations.
                                        </p>
                                    </motion.div>
                                </div>
                            </motion.div>

                            {/* Stats Grid */}
                            <motion.div
                                className="grid grid-cols-2 gap-6 mb-10"
                                variants={staggerContainer}
                            >
                                {[
                                    { value: 25, label: "Years of Excellence", suffix: "+", icon: "🏆" },
                                    { value: 2500, label: "Projects Delivered", suffix: "+", icon: "🏗️" },
                                    { value: 150, label: "Stone Varieties", suffix: "+", icon: "💎" },
                                    { value: 98, label: "Client Satisfaction", suffix: "%", icon: "⭐" }
                                ].map((stat, index) => (
                                    <motion.div
                                        key={index}
                                        className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 text-center group"
                                        variants={scaleIn}
                                        whileHover={{
                                            y: -5,
                                            shadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)"
                                        }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-2xl mb-2">{stat.icon}</div>
                                        <LuxuryStatsCounter
                                            value={stat.value}
                                            label={stat.label}
                                            suffix={stat.suffix}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* CTA Section */}
                            <motion.div
                                className="flex flex-col sm:flex-row gap-4"
                                variants={fadeInUp}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="/about"
                                        className="inline-flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl group"
                                    >
                                        Discover Our Story
                                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href="#contact"
                                        className="inline-flex items-center border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-all duration-300 group"
                                    >
                                        Get Consultation
                                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </AnimatedSection>

                        {/* Visual Section */}
                        <AnimatedSection variant={fadeInRight} className="relative">
                            {/* Main Gallery Grid */}
                            <motion.div
                                className="relative"
                                variants={staggerContainer}
                            >
                                {/* Background Decorative Element */}
                                <motion.div
                                    className="absolute -top-6 -right-6 w-full h-full bg-gradient-to-br from-blue-100 to-amber-100 rounded-3xl -z-10"
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ duration: 1, delay: 0.3 }}
                                />

                                <div className="grid grid-cols-12 gap-4 h-[600px]">
                                    {/* Large Featured Image */}
                                    <motion.div
                                        className="col-span-8 row-span-2 relative rounded-3xl overflow-hidden shadow-2xl group"
                                        variants={scaleIn}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <Image
                                            src="/marble.jpg"
                                            alt="Premium Marble Showcase"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                        <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <h4 className="text-xl font-bold mb-2">Premium Marble</h4>
                                            <p className="text-sm opacity-90">Luxury redefined through natural beauty</p>
                                        </div>
                                    </motion.div>

                                    {/* Side Images */}
                                    <motion.div
                                        className="col-span-4 relative rounded-2xl overflow-hidden shadow-xl group"
                                        variants={scaleIn}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src="/hero2.jpeg"
                                            alt="Granite Kitchen"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.div>

                                    <motion.div
                                        className="col-span-4 relative rounded-2xl overflow-hidden shadow-xl group"
                                        variants={scaleIn}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src="/hero3.jpeg"
                                            alt="Stone Flooring"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.div>

                                    {/* Bottom Images */}
                                    <motion.div
                                        className="col-span-6 relative rounded-2xl overflow-hidden shadow-xl group"
                                        variants={scaleIn}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src="/landscape.jpg"
                                            alt="Landscape Design"
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </motion.div>

                                    <motion.div
                                        className="col-span-6 relative rounded-2xl overflow-hidden shadow-xl bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center group"
                                        variants={scaleIn}
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="text-center text-white p-6">
                                            <motion.div
                                                className="text-4xl mb-3"
                                                animate={{ rotate: [0, 10, -10, 0] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                ✨
                                            </motion.div>
                                            <h4 className="text-lg font-bold mb-2">Crafted to Perfection</h4>
                                            <p className="text-sm opacity-90">Every piece tells a story of excellence</p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Floating Quality Badge */}
                                <motion.div
                                    className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100"
                                    initial={{ scale: 0, rotate: -10 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    transition={{ duration: 0.8, delay: 0.5 }}
                                    whileHover={{ scale: 1.05, rotate: 2 }}
                                >
                                    <div className="text-center">
                                        <div className="text-3xl mb-2">🏅</div>
                                        <div className="text-sm font-bold text-gray-900">ISO Certified</div>
                                        <div className="text-xs text-gray-600">Quality Assured</div>
                                    </div>
                                </motion.div>
                            </motion.div>
                        </AnimatedSection>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-32 bg-gradient-to-br from-white via-blue-50 to-slate-50 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Premium Section Header */}
                    <AnimatedSection className="text-center mb-20">
                        <motion.div
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 via-white to-amber-50 rounded-full border border-blue-100 shadow-lg mb-8"
                            variants={fadeInUp}
                        >
                            <motion.div
                                className="flex items-center gap-2"
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </motion.div>
                            <span className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text tracking-wider uppercase">
                                PREMIUM SERVICES
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
                            variants={fadeInUp}
                        >
                            <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
                                Complete Stone
                            </span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
                                SOLUTIONS
                            </span>
                        </motion.h2>

                        <motion.div
                            className="flex justify-center mb-8"
                            variants={fadeInUp}
                        >
                            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 via-purple-500 to-amber-500 rounded-full shadow-lg" />
                        </motion.div>

                        <motion.p
                            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
                            variants={fadeInUp}
                        >
                            From concept to completion, we deliver
                            <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text"> exceptional craftsmanship</span>
                            <br />in every aspect of natural stone work
                        </motion.p>

                        {/* Service Categories Stats */}
                        <motion.div
                            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
                            variants={staggerContainer}
                        >
                            {[
                                { number: "6", label: "Core Services", icon: "🏗️" },
                                { number: "25+", label: "Years Experience", icon: "⭐" },
                                { number: "100%", label: "Quality Assured", icon: "✅" },
                                { number: "24/7", label: "Support Available", icon: "🕒" }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center group"
                                    variants={scaleIn}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="text-2xl mb-2"
                                        animate={{ scale: [1, 1.1, 1] }}
                                        transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
                                    >
                                        {stat.icon}
                                    </motion.div>
                                    <div className="text-2xl font-bold text-gray-900 mb-1">{stat.number}</div>
                                    <div className="text-sm text-gray-600">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    {/* Enhanced Services Grid */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {[
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m2 0h3M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                ),
                                title: "Kitchen Countertops",
                                description: "Premium granite and marble countertops that combine beauty with durability for your dream kitchen.",
                                features: ["Heat Resistant", "Scratch Proof", "Easy Maintenance"],
                                gradient: "from-blue-500 to-blue-600",
                                price: "Starting from $80/sq ft",
                                popular: false
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                    </svg>
                                ),
                                title: "Flooring Solutions",
                                description: "Elegant marble and granite flooring that adds luxury and value to residential and commercial spaces.",
                                features: ["Slip Resistant", "Durable", "Luxury Finish"],
                                gradient: "from-purple-500 to-purple-600",
                                price: "Starting from $45/sq ft",
                                popular: true
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10v11M20 10v11" />
                                    </svg>
                                ),
                                title: "Building Facades",
                                description: "Stunning natural stone facades that create impressive exteriors and lasting first impressions.",
                                features: ["Weather Resistant", "Unique Design", "Long Lasting"],
                                gradient: "from-amber-500 to-amber-600",
                                price: "Custom Quote",
                                popular: false
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                ),
                                title: "Custom Fabrication",
                                description: "Bespoke stone fabrication services tailored to your specific design requirements and specifications.",
                                features: ["Custom Design", "Precision Cut", "Quality Assured"],
                                gradient: "from-green-500 to-green-600",
                                price: "Starting from $120/sq ft",
                                popular: false
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                ),
                                title: "Installation & Polishing",
                                description: "Professional installation and polishing services ensuring perfect finish and long-lasting beauty.",
                                features: ["Expert Team", "Perfect Finish", "Quality Tools"],
                                gradient: "from-indigo-500 to-indigo-600",
                                price: "Starting from $25/sq ft",
                                popular: true
                            },
                            {
                                icon: (
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                ),
                                title: "Maintenance Services",
                                description: "Comprehensive maintenance and restoration services to keep your stone surfaces pristine.",
                                features: ["Regular Service", "Stone Restoration", "Deep Cleaning"],
                                gradient: "from-red-500 to-red-600",
                                price: "Starting from $15/sq ft",
                                popular: false
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                className="group relative"
                                variants={scaleIn}
                                whileHover={{ y: -15 }}
                                transition={{ duration: 0.4 }}
                            >
                                {/* Popular Badge */}
                                {service.popular && (
                                    <motion.div
                                        className="absolute -top-4 -right-4 z-10"
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <div className="bg-gradient-to-r from-amber-400 to-amber-500 text-black px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            ⭐ POPULAR
                                        </div>
                                    </motion.div>
                                )}

                                {/* Service Card */}
                                <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 relative overflow-hidden h-full">
                                    {/* Background Gradient */}
                                    <motion.div
                                        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${service.gradient}`}
                                        initial={{ width: 0 }}
                                        whileInView={{ width: "100%" }}
                                        transition={{ duration: 1, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    />

                                    {/* Icon Container */}
                                    <motion.div
                                        className={`bg-gradient-to-br ${service.gradient} w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}
                                        whileHover={{ scale: 1.1, rotate: 10 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {service.icon}
                                    </motion.div>

                                    {/* Content */}
                                    <div className="mb-6">
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 leading-relaxed mb-4">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Features List */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
                                            Key Features:
                                        </h4>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <motion.li
                                                    key={idx}
                                                    className="flex items-center text-sm text-gray-600"
                                                    initial={{ opacity: 0, x: -20 }}
                                                    whileInView={{ opacity: 1, x: 0 }}
                                                    transition={{ duration: 0.3, delay: idx * 0.1 }}
                                                    viewport={{ once: true }}
                                                >
                                                    <motion.div
                                                        className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0"
                                                        animate={{ scale: [1, 1.2, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.2 }}
                                                    />
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Price & CTA */}
                                    <div className="mt-auto pt-6 border-t border-gray-100">
                                        <div className="flex items-center justify-between mb-4">
                                            <div>
                                                <div className="text-sm text-gray-500 mb-1">Starting Price</div>
                                                <div className="text-lg font-bold text-gray-900">{service.price}</div>
                                            </div>
                                            <motion.button
                                                className={`px-6 py-3 bg-gradient-to-r ${service.gradient} text-white rounded-full font-semibold text-sm hover:shadow-lg transition-all duration-300 group`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Get Quote
                                                <svg className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                </svg>
                                            </motion.button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Process Timeline */}
                    <AnimatedSection className="mb-16">
                        <motion.div
                            className="text-center mb-12"
                            variants={fadeInUp}
                        >
                            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                                Our Professional Process
                            </h3>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                From consultation to completion, we ensure excellence at every step
                            </p>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-4 gap-8"
                            variants={staggerContainer}
                        >
                            {[
                                { step: "01", title: "Consultation", desc: "Free on-site assessment", icon: "💬" },
                                { step: "02", title: "Design", desc: "Custom design proposal", icon: "📐" },
                                { step: "03", title: "Installation", desc: "Professional installation", icon: "🔨" },
                                { step: "04", title: "Quality Check", desc: "Final inspection & warranty", icon: "✅" }
                            ].map((process, index) => (
                                <motion.div
                                    key={index}
                                    className="text-center group"
                                    variants={scaleIn}
                                    whileHover={{ y: -5 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <motion.div
                                        className="bg-gradient-to-br from-blue-600 to-purple-600 w-20 h-20 rounded-2xl flex items-center justify-center text-white text-2xl mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {process.icon}
                                    </motion.div>
                                    <div className="text-3xl font-black text-blue-600 mb-2">{process.step}</div>
                                    <h4 className="text-xl font-bold text-gray-900 mb-2">{process.title}</h4>
                                    <p className="text-gray-600 text-sm">{process.desc}</p>
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    {/* Enhanced CTA Section */}
                    <AnimatedSection className="text-center">
                        <motion.div
                            className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 rounded-3xl p-12 text-white relative overflow-hidden"
                            variants={scaleIn}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
                                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full"></div>
                            </div>

                            <div className="relative z-10">
                                <motion.h3
                                    className="text-4xl md:text-5xl font-bold mb-4"
                                    variants={fadeInUp}
                                >
                                    Ready to Transform Your Space?
                                </motion.h3>

                                <motion.p
                                    className="text-xl opacity-90 mb-8 max-w-3xl mx-auto"
                                    variants={fadeInUp}
                                >
                                    Get a free consultation and discover how our premium stone solutions can elevate your project
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                    variants={staggerContainer}
                                >
                                    <motion.div variants={scaleIn}>
                                        <Link
                                            href="#contact"
                                            className="inline-flex items-center bg-gradient-to-r from-amber-400 to-amber-500 text-black px-8 py-4 rounded-full font-bold text-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg group"
                                        >
                                            Get Free Consultation
                                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={scaleIn}>
                                        <Link
                                            href="/products"
                                            className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            View Our Work
                                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Featured Products Gallery */}
            <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 right-10 w-80 h-80 bg-blue-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 left-10 w-96 h-96 bg-amber-400 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-purple-400 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Premium Section Header */}
                    <AnimatedSection className="text-center mb-20">
                        <motion.div
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 to-amber-50 rounded-full border border-blue-100 mb-8"
                            variants={fadeInUp}
                        >
                            <motion.div
                                className="flex items-center gap-2"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                            </motion.div>
                            <span className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text tracking-wider uppercase">
                                LUXURY PORTFOLIO
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
                            variants={fadeInUp}
                        >
                            <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
                                Featured
                            </span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
                                MASTERPIECES
                            </span>
                        </motion.h2>

                        <motion.div
                            className="flex justify-center mb-8"
                            variants={fadeInUp}
                        >
                            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 via-purple-500 to-amber-500 rounded-full shadow-lg" />
                        </motion.div>

                        <motion.p
                            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
                            variants={fadeInUp}
                        >
                            Witness the transformation of premium spaces through our
                            <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text"> exceptional craftsmanship</span>
                        </motion.p>

                        {/* Project Categories Filter */}
                        <motion.div
                            className="flex flex-wrap justify-center gap-4 mb-16"
                            variants={staggerContainer}
                        >
                            {[
                                { label: "All Projects", count: "250+", active: true },
                                { label: "Kitchens", count: "85+", active: false },
                                { label: "Bathrooms", count: "120+", active: false },
                                { label: "Flooring", count: "95+", active: false },
                                { label: "Facades", count: "45+", active: false }
                            ].map((category, index) => (
                                <motion.button
                                    key={index}
                                    className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 border-2 ${category.active
                                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg'
                                        : 'bg-white text-gray-600 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                                        }`}
                                    variants={scaleIn}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <span className="block text-sm">{category.label}</span>
                                    <span className="block text-xs opacity-75">{category.count}</span>
                                </motion.button>
                            ))}
                        </motion.div>
                    </AnimatedSection>

                    {/* Projects Grid */}
                    {loading ? (
                        <motion.div
                            className="flex flex-col justify-center items-center py-32"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            <motion.div
                                className="relative mb-8"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-20 h-20 border-4 border-blue-600 border-t-transparent rounded-full"></div>
                                <div className="absolute inset-2 w-12 h-12 border-4 border-amber-400 border-b-transparent rounded-full animate-spin"></div>
                            </motion.div>
                            <motion.p
                                className="text-lg text-gray-600 font-medium"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                Loading Premium Projects...
                            </motion.p>
                        </motion.div>
                    ) : (
                        <>
                            {/* Featured Project Showcase */}
                            <motion.div
                                className="mb-20"
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {featuredProducts.length > 0 && (
                                    <motion.div
                                        className="relative rounded-3xl overflow-hidden shadow-2xl group bg-gradient-to-br from-gray-900 to-blue-900"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                                            {/* Project Image */}
                                            <div className="relative overflow-hidden">
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent z-10"
                                                    initial={{ opacity: 0 }}
                                                    whileHover={{ opacity: 1 }}
                                                    transition={{ duration: 0.3 }}
                                                />
                                                <Image
                                                    src={featuredProducts[0]?.images?.[0] || "/marble.jpg"}
                                                    alt="Featured Project"
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                            </div>

                                            {/* Project Details */}
                                            <div className="p-12 flex flex-col justify-center text-white">
                                                <motion.div
                                                    className="mb-6"
                                                    variants={fadeInLeft}
                                                >
                                                    <span className="inline-block px-4 py-2 bg-amber-500 text-black font-bold text-sm rounded-full mb-4">
                                                        🏆 FEATURED PROJECT
                                                    </span>
                                                    <h3 className="text-3xl md:text-4xl font-bold mb-4">
                                                        {featuredProducts[0]?.name || "Premium Marble Installation"}
                                                    </h3>
                                                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                                        {featuredProducts[0]?.description || "A stunning showcase of premium marble craftsmanship that transforms ordinary spaces into extraordinary experiences."}
                                                    </p>
                                                </motion.div>

                                                <motion.div
                                                    className="grid grid-cols-2 gap-6 mb-8"
                                                    variants={staggerContainer}
                                                >
                                                    <div>
                                                        <div className="text-2xl font-bold text-amber-400">2024</div>
                                                        <div className="text-sm text-gray-300">Year Completed</div>
                                                    </div>
                                                    <div>
                                                        <div className="text-2xl font-bold text-amber-400">500m²</div>
                                                        <div className="text-sm text-gray-300">Total Area</div>
                                                    </div>
                                                </motion.div>

                                                <motion.div
                                                    variants={fadeInLeft}
                                                >
                                                    <Link
                                                        href={`/products/${featuredProducts[0]?.slug || '#'}`}
                                                        className="inline-flex items-center bg-gradient-to-r from-amber-400 to-amber-500 text-black px-8 py-4 rounded-full font-bold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg group"
                                                    >
                                                        View Project Details
                                                        <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                        </svg>
                                                    </Link>
                                                </motion.div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>

                            {/* Projects Grid */}
                            <motion.div
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                                variants={staggerContainer}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true, margin: "-100px" }}
                            >
                                {featuredProducts.slice(1, 7).map((product, index) => (
                                    <motion.div
                                        key={product._id}
                                        className="group relative"
                                        variants={scaleIn}
                                        whileHover={{ y: -10 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        {/* Enhanced Product Card */}
                                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-500">
                                            {/* Image Container */}
                                            <div className="relative h-64 overflow-hidden">
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                />
                                                <Image
                                                    src={product.images?.[0] || "/marble.jpg"}
                                                    alt={product.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                                                />

                                                {/* Floating Category Badge */}
                                                <div className="absolute top-4 left-4 z-20">
                                                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-bold text-gray-800 rounded-full">
                                                        {product.category || "Premium Stone"}
                                                    </span>
                                                </div>

                                                {/* Project Details Overlay */}
                                                <motion.div
                                                    className="absolute bottom-4 left-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    initial={{ y: 20 }}
                                                    whileHover={{ y: 0 }}
                                                >
                                                    <Link
                                                        href={`/products/${product.slug || '#'}`}
                                                        className="inline-flex items-center bg-white text-gray-900 px-4 py-2 rounded-full font-semibold text-sm hover:bg-gray-100 transition-colors"
                                                    >
                                                        View Details
                                                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                                        </svg>
                                                    </Link>
                                                </motion.div>
                                            </div>

                                            {/* Content */}
                                            <div className="p-6">
                                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {product.name}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                    {product.description || "Exceptional natural stone installation showcasing premium craftsmanship and attention to detail."}
                                                </p>

                                                {/* Project Stats */}
                                                <div className="flex items-center justify-between text-xs text-gray-500">
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        {new Date().getFullYear() - index} Project
                                                    </span>
                                                    <span className="flex items-center">
                                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                        </svg>
                                                        {Math.floor(Math.random() * 50) + 10} Likes
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </>
                    )}

                    {/* Enhanced CTA Section */}
                    <AnimatedSection className="text-center">
                        <motion.div
                            className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 rounded-3xl p-12 text-white relative overflow-hidden"
                            variants={scaleIn}
                        >
                            {/* Background Pattern */}
                            <div className="absolute inset-0 opacity-10">
                                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent"></div>
                                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full"></div>
                                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-white/10 rounded-full"></div>
                            </div>

                            <div className="relative z-10">
                                <motion.h3
                                    className="text-3xl md:text-4xl font-bold mb-4"
                                    variants={fadeInUp}
                                >
                                    Ready to Create Your Masterpiece?
                                </motion.h3>

                                <motion.p
                                    className="text-xl opacity-90 mb-8 max-w-2xl mx-auto"
                                    variants={fadeInUp}
                                >
                                    Join our exclusive portfolio of luxury projects and transform your space with premium natural stone
                                </motion.p>

                                <motion.div
                                    className="flex flex-col sm:flex-row gap-4 justify-center"
                                    variants={staggerContainer}
                                >
                                    <motion.div variants={scaleIn}>
                                        <Link
                                            href="/products"
                                            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg group"
                                        >
                                            Explore All Projects
                                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </Link>
                                    </motion.div>

                                    <motion.div variants={scaleIn}>
                                        <Link
                                            href="#contact"
                                            className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300 group"
                                        >
                                            Start Your Project
                                            <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                            </svg>
                                        </Link>
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
                {/* Decorative Background Elements */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-green-400 to-blue-500 rounded-full blur-3xl"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    {/* Premium Section Header */}
                    <AnimatedSection className="text-center mb-20">
                        <motion.div
                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-50 via-white to-amber-50 rounded-full border border-blue-100 shadow-lg mb-8"
                            variants={fadeInUp}
                        >
                            <motion.div
                                className="flex items-center gap-2"
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                            </motion.div>
                            <span className="text-sm font-bold text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 bg-clip-text tracking-wider uppercase">
                                GET IN TOUCH
                            </span>
                        </motion.div>

                        <motion.h2
                            className="text-5xl md:text-7xl font-black mb-8 leading-tight"
                            variants={fadeInUp}
                        >
                            <span className="block bg-gradient-to-r from-slate-900 via-blue-900 to-slate-900 bg-clip-text text-transparent mb-2">
                                Let's Create
                            </span>
                            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-amber-500 bg-clip-text text-transparent">
                                SOMETHING BEAUTIFUL
                            </span>
                        </motion.h2>

                        <motion.div
                            className="flex justify-center mb-8"
                            variants={fadeInUp}
                        >
                            <div className="h-1.5 w-32 bg-gradient-to-r from-blue-600 via-purple-500 to-amber-500 rounded-full shadow-lg" />
                        </motion.div>

                        <motion.p
                            className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
                            variants={fadeInUp}
                        >
                            Ready to transform your space with premium natural stone?
                            <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-amber-600 bg-clip-text"> Connect with our experts</span>
                            <br />and bring your vision to life
                        </motion.p>
                    </AnimatedSection>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
                        {/* Enhanced Contact Info */}
                        <AnimatedSection variant={fadeInLeft}>
                            {/* Contact Methods */}
                            <motion.div
                                className="mb-12"
                                variants={staggerContainer}
                            >
                                <h3 className="text-2xl font-bold text-gray-900 mb-8">Multiple Ways to Reach Us</h3>
                                <div className="space-y-6">
                                    {[
                                        {
                                            icon: "📞",
                                            title: "Phone & WhatsApp",
                                            info: "+20 123 456 789",
                                            subInfo: "Available 24/7 for urgent inquiries",
                                            gradient: "from-green-500 to-green-600",
                                            link: "tel:+201234567890"
                                        },
                                        {
                                            icon: "📧",
                                            title: "Email",
                                            info: "info@alfarismarble.com",
                                            subInfo: "We respond within 2 hours",
                                            gradient: "from-blue-500 to-blue-600",
                                            link: "mailto:info@alfarismarble.com"
                                        },
                                        {
                                            icon: "📍",
                                            title: "Visit Our Showroom",
                                            info: "123 Stone Street, Cairo, Egypt",
                                            subInfo: "Open 9 AM - 6 PM, Saturday - Thursday",
                                            gradient: "from-purple-500 to-purple-600",
                                            link: "https://www.google.com/maps/dir/?api=1&destination=0%2C0&fbclid=IwY2xjawMkUq1leHRuA2FlbQIxMABicmlkETFFVXlWRXJGS3NCYkVqWk11AR6nT8rp_hYOiDlohtsQ_ZGvo8Z6pWyeYwWhXWYP-cl2jhLFEkcTfk3F9HicRQ_aem_D_6vxCpBFq_xgwW6F7koEg"
                                        }
                                    ].map((item, index) => (
                                        <motion.a
                                            key={index}
                                            href={item.link}
                                            className="group flex items-start p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                            variants={scaleIn}
                                            whileHover={{ y: -5, scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <motion.div
                                                className={`bg-gradient-to-br ${item.gradient} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl flex-shrink-0 shadow-lg group-hover:shadow-xl`}
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                {item.icon}
                                            </motion.div>
                                            <div className="ml-6">
                                                <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-900 font-semibold mb-1">{item.info}</p>
                                                <p className="text-gray-600 text-sm">{item.subInfo}</p>
                                            </div>
                                            <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.a>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Why Choose Us */}
                            <motion.div
                                className="bg-gradient-to-br from-blue-600 to-purple-700 rounded-3xl p-8 text-white mb-12"
                                variants={fadeInLeft}
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                <h3 className="text-2xl font-bold mb-6">Why Choose Alfaris?</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    {[
                                        { icon: "⚡", text: "Quick Response", desc: "Within 2 hours" },
                                        { icon: "🏆", text: "25+ Years", desc: "Experience" },
                                        { icon: "✅", text: "Quality", desc: "Guaranteed" },
                                        { icon: "🎯", text: "Custom", desc: "Solutions" }
                                    ].map((feature, index) => (
                                        <motion.div
                                            key={index}
                                            className="text-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                        >
                                            <div className="text-2xl mb-2">{feature.icon}</div>
                                            <div className="text-sm font-bold">{feature.text}</div>
                                            <div className="text-xs opacity-80">{feature.desc}</div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Social Proof */}
                            <motion.div
                                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
                                variants={fadeInLeft}
                            >
                                <h4 className="font-bold text-gray-900 mb-4">Trusted by 2,500+ Clients</h4>
                                <div className="flex items-center mb-4">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                                                {String.fromCharCode(65 + i)}
                                            </div>
                                        ))}
                                    </div>
                                    <span className="ml-3 text-sm text-gray-600">+2,495 more clients</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex text-amber-400">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <svg key={star} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="ml-2 text-sm font-semibold text-gray-900">4.9/5</span>
                                    <span className="ml-1 text-sm text-gray-600">(2,456 reviews)</span>
                                </div>
                            </motion.div>
                        </AnimatedSection>

                        {/* Enhanced Contact Form */}
                        <AnimatedSection variant={fadeInRight}>
                            <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100 relative overflow-hidden">
                                {/* Form Header */}
                                <div className="mb-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold text-gray-900">Send us a Message</h3>
                                        <motion.div
                                            className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center text-white"
                                            animate={{ scale: [1, 1.1, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        >
                                            💬
                                        </motion.div>
                                    </div>
                                    <p className="text-gray-600">
                                        Get a free consultation and quote for your project. We'll respond within 2 hours!
                                    </p>
                                </div>

                                {/* Enhanced Contact Form Component */}
                                <ContactForm />

                                {/* Form Footer */}
                                <motion.div
                                    className="mt-8 pt-6 border-t border-gray-100"
                                    variants={fadeInUp}
                                >
                                    <div className="flex items-center justify-center text-sm text-gray-600">
                                        <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Your information is secure and will never be shared
                                    </div>
                                </motion.div>
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* Map Section */}
                    <AnimatedSection className="mt-20">
                        <motion.div
                            className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100"
                            variants={scaleIn}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-3">
                                {/* Google Map */}
                                <div className="lg:col-span-2 h-96 relative overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3456.789!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzM5LjgiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1640995200000!5m2!1sen!2seg"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="w-full h-full"
                                        title="Alfaris Marble & Granite Location"
                                    ></iframe>

                                    {/* Map Overlay for Loading */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center"
                                        initial={{ opacity: 1 }}
                                        animate={{ opacity: 0 }}
                                        transition={{ duration: 1, delay: 1 }}
                                        style={{ pointerEvents: 'none' }}
                                    >
                                        <motion.div
                                            className="text-center"
                                            initial={{ opacity: 1, scale: 0.8 }}
                                            animate={{ opacity: 0, scale: 1 }}
                                            transition={{ duration: 0.8, delay: 0.5 }}
                                        >
                                            <div className="text-4xl mb-3">🗺️</div>
                                            <h4 className="text-xl font-bold text-gray-700 mb-2">Loading Map...</h4>
                                            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                        </motion.div>
                                    </motion.div>
                                </div>

                                {/* Location Details */}
                                <div className="p-8 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
                                    <h4 className="text-2xl font-bold mb-6">Visit Our Showroom</h4>
                                    <div className="space-y-4">
                                        <div className="flex items-start">
                                            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                                                📍
                                            </div>
                                            <div>
                                                <div className="font-semibold">Address</div>
                                                <div className="text-gray-300 text-sm">123 Stone Street, New Cairo<br />Cairo, Egypt</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                                                🕒
                                            </div>
                                            <div>
                                                <div className="font-semibold">Working Hours</div>
                                                <div className="text-gray-300 text-sm">Sat - Thu: 9:00 AM - 6:00 PM<br />Friday: Closed</div>
                                            </div>
                                        </div>
                                        <div className="flex items-start">
                                            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                                                🚗
                                            </div>
                                            <div>
                                                <div className="font-semibold">Parking</div>
                                                <div className="text-gray-300 text-sm">Free parking available<br />Easy access</div>
                                            </div>
                                        </div>
                                    </div>

                                    <motion.a
                                        href="https://www.google.com/maps/dir/?api=1&destination=0%2C0&fbclid=IwY2xjawMkUq1leHRuA2FlbQIxMABicmlkETFFVXlWRXJGS3NCYkVqWk11AR6nT8rp_hYOiDlohtsQ_ZGvo8Z6pWyeYwWhXWYP-cl2jhLFEkcTfk3F9HicRQ_aem_D_6vxCpBFq_xgwW6F7koEg"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full mt-6 bg-gradient-to-r from-amber-400 to-amber-500 text-black px-6 py-3 rounded-xl font-semibold hover:from-amber-500 hover:to-amber-600 transition-all duration-300 text-center block"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Get Directions
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                <div className="container mx-auto px-6 text-center">
                    <AnimatedSection>
                        <motion.h2
                            className="text-4xl md:text-5xl font-bold mb-6"
                            variants={fadeInUp}
                        >
                            Ready to Start Your Project?
                        </motion.h2>
                        <motion.p
                            className="text-xl mb-10 max-w-2xl mx-auto opacity-90"
                            variants={fadeInUp}
                        >
                            Transform your vision into reality with our premium marble and granite solutions
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                            variants={staggerContainer}
                        >
                            <motion.div variants={scaleIn}>
                                <Link
                                    href="/contact"
                                    className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 inline-block"
                                >
                                    Get Free Quote
                                </Link>
                            </motion.div>
                            <motion.div variants={scaleIn}>
                                <Link
                                    href="tel:+201234567890"
                                    className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 inline-block"
                                >
                                    Call Now
                                </Link>
                            </motion.div>
                        </motion.div>
                    </AnimatedSection>
                </div>
            </section>
        </>
    );
}

// Contact Form Component
const inquirySchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phone: z.string().min(1, 'Phone is required'),
    email: z.string().email('Invalid email').optional().or(z.string().length(0)),
    company: z.string().optional(),
    quantityM2: z.number().positive().optional(),
    message: z.string().min(1, 'Message is required'),
});

function ContactForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        resolver: zodResolver(inquirySchema),
    });

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            await GlobalApi.createContact(
                data.name,
                data.email,
                data.phone.replace(/\D/g, ''),
                data.message,
                data.company,
                data.quantityM2 || 0
            );
            toast.success('Message sent successfully!');
            reset();
        } catch (error) {
            toast.error('Failed to send message');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <motion.div
            className="bg-gray-50 rounded-2xl p-8 lg:p-12"
            variants={scaleIn}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
        >
            <motion.form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
                variants={staggerContainer}
            >
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={fadeInUp}
                >
                    <Input
                        label="Name *"
                        type="text"
                        placeholder="Your name"
                        error={errors.name}
                        {...register('name')}
                    />
                    <Input
                        label="Phone *"
                        type="tel"
                        placeholder="Your phone"
                        error={errors.phone}
                        {...register('phone')}
                    />
                </motion.div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    variants={fadeInUp}
                >
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Your email"
                        error={errors.email}
                        {...register('email')}
                    />
                    <Input
                        label="Company"
                        type="text"
                        placeholder="Company name"
                        error={errors.company}
                        {...register('company')}
                    />
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <Input
                        label="Project Size (m²)"
                        type="number"
                        placeholder="Area in square meters"
                        error={errors.quantityM2}
                        {...register('quantityM2', { valueAsNumber: true })}
                    />
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <Textarea
                        label="Message *"
                        placeholder="Tell us about your project"
                        rows={4}
                        error={errors.message}
                        {...register('message')}
                    />
                </motion.div>

                <motion.div variants={fadeInUp}>
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <motion.div
                                    className="flex items-center justify-center"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <motion.div
                                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                    />
                                    Sending...
                                </motion.div>
                            ) : 'Send Message'}
                        </Button>
                    </motion.div>
                </motion.div>
            </motion.form>
        </motion.div>
    );
}
