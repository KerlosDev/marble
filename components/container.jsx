"use client"
import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Container = () => {
    const ref = React.useRef(null);

    // Slideshow state for first gallery
    const [currentSlideFirst, setCurrentSlideFirst] = React.useState(0);
    const firstGalleryImages = [
        { src: "/Cont.jpg", alt: "Premium Egyptian Marble" }
    ];


    // Auto-slideshow effect for first gallery
    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlideFirst((prev) => (prev + 1) % firstGalleryImages.length);
        }, 5000); // Change every 5 seconds

        return () => clearInterval(interval);
    }, [firstGalleryImages.length]);


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

    // Slide animation variants
    const slideVariants = {
        enter: (direction) => ({
            x: direction > 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction) => ({
            zIndex: 0,
            x: direction < 0 ? 100 : -100,
            opacity: 0,
            scale: 0.9
        })
    };

    const slideTransition = {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 }
    };

    return (
        <div ref={ref} className="relative min-h-screen overflow-hidden -mt-1 -mb-1">
            {/* Background with parallax */}
            <motion.div
                className="absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -z-10"
                style={{ y: yBg, opacity }}
            >
                <motion.div className="absolute inset-0">
                    <Image
                        src={"/storehouse.png"}
                        alt="Marble quarry"
                        fill
                        className="object-cover bg-black/10 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/20"></div>
                </motion.div>
            </motion.div>

            {/* Section Title */}
            <div className="relative font-rubik z-10 text-center pt-16 pb-8">
                <motion.div
                    className="max-w-4xl mx-auto px-4 flex flex-col items-center"
                    initial={{ opacity: 0, y: -30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                >
                    <motion.h2
                        className="text-6xl md:text-4xl backdrop-blur-lg p-4 mx-auto text-center bg-white/10 rounded-xl border-2 border-white font-bold text-white mb-4 drop-shadow-2xl"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        أفضل جوده في الاستيراد والتصدير
                    </motion.h2>

                    <motion.p
                        className="text-xl md:text-2xl text-white/90 mt-4 leading-relaxed drop-shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        شركة الفارس للاستيراد والتصدير متخصصة في الرخام واللاند سكيب عالي الجودة.

                    </motion.p>
                </motion.div>
            </div>

            {/* Content Container */}
            <div className="relative z-10 flex flex-col md:flex-row font-rubik items-center justify-between px-4 py-8 md:py-16 max-w-7xl mx-auto gap-8">
                {/* Left side - First Gallery Slideshow */}
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
                        <AnimatePresence mode="wait" custom={1}>
                            <motion.div
                                key={currentSlideFirst}
                                custom={1}
                                variants={slideVariants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={slideTransition}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={firstGalleryImages[currentSlideFirst].src}
                                    alt={firstGalleryImages[currentSlideFirst].alt}
                                    fill
                                    className="object-cover filter drop-shadow-2xl rounded-3xl"
                                    priority={currentSlideFirst === 0}
                                />
                                {/* Overlay gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide indicators for first gallery */}
                        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                            {firstGalleryImages.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentSlideFirst(index)}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlideFirst === index
                                        ? 'bg-white scale-125'
                                        : 'bg-white/50 hover:bg-white/75'
                                        }`}
                                />
                            ))}
                        </div>

                        {/* Progress bar for first gallery */}
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20 rounded-b-3xl">
                            <motion.div
                                className="h-full bg-white rounded-b-3xl"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{
                                    duration: 5,
                                    ease: "linear",
                                    repeat: Infinity
                                }}
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Right side content - Arabic text */}
                <div className="w-full md:w-1/2 text-right mt-8 md:mt-0 md:pr-8 space-y-8 rtl">
                    {/* منتجات اللاند سكيب */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <motion.a
                            href="/landscape"
                            className="block group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <h1 className="text-4xl md:text-3xl font-bold text-white pb-2 inline-block drop-shadow-lg transition-colors duration-300">
                                منتجات اللاند سكيب
                                <span className="text-blue-300 mr-2">→</span>
                            </h1>
                        </motion.a>
                        <motion.p
                            className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                            viewport={{ once: true }}
                        >
                            في شركتنا، نفخر بتقديم حلول اللاند سكيب المتميزة التي تضيف لمسة جمالية وعملية للمساحات الخارجية مع الالتزام بمعايير الجودة الدولية.
                        </motion.p>
                    </motion.div>

                    {/* منتجات الرخام */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                        viewport={{ once: true }}
                    >
                        <motion.a
                            href="/products"
                            className="block group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <h2 className="text-4xl md:text-3xl font-bold text-white pb-2 inline-block drop-shadow-lg group-hover:text-blue-200 transition-colors duration-300">
                                منتجات الرخام
                                <span className="text-blue-300 mr-2">→</span>
                            </h2>
                        </motion.a>
                        <motion.p
                            className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                            viewport={{ once: true }}
                        >
                            في شركتنا، نفخر بتقديم منتجات الرخام المتميزة التي تجمع بين الفخامة والمتانة وتلتزم بمعايير الجودة الدولية.
                        </motion.p>
                    </motion.div>

                    {/* منتجات الجرانيت */}
                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <motion.a
                            href="/products?category=granite"
                            className="block group cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <h2 className="text-4xl md:text-3xl font-bold text-white pb-2 inline-block drop-shadow-lg  transition-colors duration-300">
                                منتجات الجرانيت
                                <span className="text-blue-300 mr-2">→</span>
                            </h2>
                        </motion.a>
                        <motion.p
                            className="text-lg md:text-xl text-white/90 leading-relaxed drop-shadow-md"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
                            viewport={{ once: true }}
                        >
                            في شركتنا، نفخر بتقديم منتجات الجرانيت المتنوعة التي تمتاز بالصلابة والأناقة مع الالتزام بمعايير الجودة الدولية.
                        </motion.p>
                    </motion.div>

                    <motion.div
                        className="pt-6"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 1.0 }}
                        viewport={{ once: true }}
                    >
                        <motion.a
                            href="/about"
                            className="inline-block border-2 border-white hover:bg-white hover:text-black text-white py-3 px-8 rounded-full text-lg font-medium transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            أعرف المزيد
                        </motion.a>
                    </motion.div>
                </div>
            </div>

        </div>
    )
}

export default Container