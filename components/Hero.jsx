'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Professional Animation Variants
const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const fadeInRight = {
    initial: { opacity: 0, x: -50 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }
    }
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.3
        }
    }
};
// Professional Statistics Component
const StatsSection = () => (
    <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 py-8 md:py-12"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
    >
        {[
            { number: "25+", text: "سنة خبرة", icon: "🏆" },
            { number: "10,000+", text: "عميل راضي", icon: "👥" },
            { number: "500+", text: "مشروع مكتمل", icon: "🏗️" },
            { number: "100%", text: "جودة مضمونة", icon: "✅" }
        ].map((stat, index) => (
            <motion.div
                key={index}
                variants={fadeInUp}
                className="text-center bg-white/5 backdrop-blur-lg rounded-xl p-4 md:p-6 border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="text-2xl md:text-3xl font-bold text-amber-400 mb-1">{stat.number}</div>
                <div className="text-sm md:text-base text-white/80">{stat.text}</div>
            </motion.div>
        ))}
    </motion.div>
);
 

export default function HomePage() {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    return (
        <>
            {/* Professional Hero Section */}
            <section className="relative min-h-screen pt-40  font-rubik bg-gradient-to-br from-slate-900 via-slate-800 to-black overflow-hidden" dir="rtl">
                {/* Background Slider */}
                <div className="absolute inset-0">
                    <Swiper
                        modules={[EffectFade, Autoplay]}
                        effect="fade"
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false
                        }}
                        loop={true}
                        className="h-full"
                        speed={2000}
                    >
                        <SwiperSlide>
                            <div className="relative h-full">
                                <Image
                                    src="/marble.jpg"
                                    alt="رخام فاخر"
                                    fill
                                    className="object-cover"
                                    priority
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-full">
                                <Image
                                    src="/marble2.jpg"
                                    alt="جرانيت فاخر"
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="relative h-full">
                                <Image
                                    src="/red-aswan.jpg"
                                    alt="حجر أسوان"
                                    fill
                                    className="object-cover"
                                    sizes="100vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/80" />
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

                {/* Main Content */}
                <div className="relative z-10 min-h-screen flex items-center">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-6xl mx-auto">

                            {/* Hero Content */}
                            <motion.div
                                className="text-center text-white mb-16"
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                            >
                                {/* Company Badge */}
                                <motion.div
                                    className="mb-8"
                                    variants={fadeInUp}
                                >
                                    <span className="inline-flex items-center gap-3 px-6 py-3 bg-amber-500/20 backdrop-blur-xl border border-amber-400/30 rounded-full text-amber-300 font-bold text-sm tracking-wide">
                                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                        الشركة الرائدة في مصر للحجر الطبيعي
                                        <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
                                    </span>
                                </motion.div>

                                {/* Main Heading */}
                                <motion.div variants={fadeInUp}>
                                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                                        <span className="block bg-gradient-to-r from-white to-amber-100 bg-clip-text text-transparent">
                                            الفارس
                                        </span>
                                        <span className="block text-2xl md:text-4xl lg:text-5xl mt-4 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent font-medium">
                                            للرخام والجرانيت
                                        </span>
                                    </h1>
                                </motion.div>

                                {/* Subtitle */}
                                <motion.div variants={fadeInUp}>
                                    <div className="h-1 w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent rounded-full mx-auto mb-8"></div>
                                    <h2 className="text-xl md:text-3xl lg:text-4xl font-light text-amber-100 mb-6 max-w-4xl mx-auto leading-relaxed">
                                        حوّل مساحتك إلى
                                        <span className="block text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-amber-300 to-yellow-400 bg-clip-text text-transparent mt-2">
                                            تُحفة فنية
                                        </span>
                                    </h2>
                                    <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                                        اكتشف قمة الفخامة مع مجموعتنا المختارة بعناية من الرخام والجرانيت الفاخر.
                                        أكثر من 25 سنة في تحويل الأحلام إلى واقع لأكثر العملاء تميزاً في مصر.
                                    </p>
                                </motion.div>

                                {/* CTA Buttons */}
                                <motion.div
                                    className="flex flex-col md:flex-row gap-4 md:gap-6 justify-center items-center mb-16"
                                    variants={fadeInUp}
                                >
                                    <Link
                                        href="/products"
                                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-black bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-2xl hover:shadow-amber-500/25 transition-all duration-300 hover:scale-105"
                                    >
                                        <span className="flex items-center gap-3">
                                            💎 استكشف مجموعتنا الفاخرة
                                            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                    </Link>

                                    <Link
                                        href="#contact"
                                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white border-2 border-amber-400/50 rounded-full backdrop-blur-xl hover:bg-amber-400/10 transition-all duration-300"
                                    >
                                        <span className="flex items-center gap-3">
                                            📞 احصل على استشارة مجانية
                                        </span>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            {/* Statistics Section */}
                            <StatsSection />

                             Primemarble
                        </div>
                    </div>
                </div>

                {/* Professional Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div className="w-6 h-10 border-2 border-amber-400/60 rounded-full flex justify-center mb-3">
                        <motion.div
                            className="w-1 h-3 bg-gradient-to-b from-amber-400 to-amber-600 rounded-full mt-2"
                            animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        />
                    </div>
                    <p className="text-amber-300/80 text-sm font-medium">اكتشف المزيد</p>
                </motion.div>
            </section>
        </>
    );
}
