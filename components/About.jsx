"use client"
import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion';

const Marble = () => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Transform the scroll progress into parallax values
    const yBg = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
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
        <div ref={ref} className="relative min-h-screen overflow-hidden -mt-1 -mb-1"> {/* Added ref for scroll tracking */}
            {/* Background with parallax - changed to absolute positioning */}
            <motion.div
                className="absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -z-10" /* Extended background to prevent gaps */
                style={{ y: yBg, opacity }}
            >
                <motion.div
                    className="absolute inset-0"
                >
                    <Image
                        src={"/background.png"}
                        alt="Marble quarry"
                        fill
                        className="object-cover scale-105" /* Added scale to ensure full coverage */
                        priority
                    />
                </motion.div>
            </motion.div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col md:flex-row font-rubik items-center justify-between px-4 py-16 md:py-24 max-w-7xl mx-auto gap-8">
                {/* Left side logo */}
                <div className="w-full md:w-1/2 flex justify-center md:justify-start">
                    <motion.div
                        className="relative w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        variants={firstImageAnimation}
                        animate="animate"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Image
                            src="/marbleslide.jpg"
                            alt="الفارس - Al Fares Logo"
                            fill
                            className="object-cover filter drop-shadow-2xl rounded-3xl"
                            priority
                        />
                    </motion.div>
                </div>

                {/* Right side content - Arabic text */}
                <div className="w-full md:w-1/2 text-right mt-8 md:mt-0 md:pr-8 space-y-6 rtl">
                    <motion.div
                        className="space-y-2 mb-14"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white pb-2 inline-block drop-shadow-lg"> عن الفارس</h1>
                    </motion.div>

                    <motion.p
                        className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-md"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        مرحبًا بكم في شركة " الفارس " ومصنعكم المفضل لأرقى أنواع الرخام والجرانيت المصري.
                    </motion.p>

                    <motion.p
                        className="text-xl md:text-2xl text-white leading-relaxed drop-shadow-md"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        بفضل سنوات من الخبرة والتفاني في تحقيق التميز وبفضل خبراتنا الواسعة، نفخر اليوم
                        بكوننا من أبرز الشركات الرائدة في تصنيع وتصدير منتجات الأحجار المصرية فائقة الجودة
                        لعملائنا حول العالم.
                    </motion.p>

                    <motion.div
                        className="pt-4"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <motion.button
                            className="bg-white hover:bg-gray-100 text-black py-3 px-8 rounded-full text-lg font-medium transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            أعرف المزيد
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default Marble