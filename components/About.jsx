"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const About = () => {
    // First image animation variant
    const firstImageAnimation = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 5,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };

    // Second image animation variant (different timing)
    const secondImageAnimation = {
        animate: {
            y: [0, -15, 0],
            transition: {
                duration: 7,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
                delay: 0.5 // Offset timing for more natural feel
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row font-rubik items-center justify-between px-4 py-16 md:py-24 bg-white max-w-7xl mx-auto">
            {/* Left side images */}
            <div className="w-full md:w-1/2 flex space-x-4">
                <motion.div
                    className="relative w-full h-[450px] md:h-[550px]"
                    variants={firstImageAnimation}
                    animate="animate"
                >
                    <Image
                        src="/marble.jpg"
                        alt="Marble quarry"
                        fill
                        className="object-cover rounded-lg shadow-lg"
                        priority
                    />
                </motion.div>
                <motion.div
                    className="relative w-full h-[400px] md:h-[500px] hidden md:block mt-8"
                    variants={secondImageAnimation}
                    animate="animate"
                >
                    <Image
                        src="/marble2.jpg"
                        alt="Prime Marble storefront"
                        fill
                        className="object-cover rounded-lg shadow-lg"
                        priority
                    />
                </motion.div>
            </div>

            {/* Right side content - Arabic text */}
            <div className="w-full md:w-1/2 text-right mt-8 md:mt-0 md:pr-8 space-y-6 rtl">
                <div className="space-y-2">
                    <h2 className="text-4xl font-bold text-gray-800 mb-2">عن</h2>
                    <h1 className="text-5xl font-bold text-gray-900 border-b-4 border-marble pb-2 inline-block">برايم ماربل</h1>
                </div>

                <p className="text-lg text-gray-700 leading-relaxed">
                    مرحبًا بكم في شركة " الفارس " ومصنعكم المفضل لأرقى أنواع الرخام والجرانيت المصري.
                </p>

                <p className="text-lg text-gray-700 leading-relaxed">
                    بفضل سنوات من الخبرة والتفاني في تحقيق التميز وبفضل خبراتنا الواسعة، نفخر اليوم
                    بكوننا من أبرز الشركات الرائدة في تصنيع وتصدير منتجات الأحجار المصرية فائقة الجودة
                    لعملائنا حول العالم.
                </p>

                <div className="pt-4">
                    <button className="bg-marble hover:bg-marble-600 text-black py-3 px-8 rounded-full text-lg font-medium transition duration-300">
                        أعرف المزيد
                    </button>
                </div>
            </div>
        </div>
    )
}

export default About