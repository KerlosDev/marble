"use client"
import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const TwoSection = () => {
    // Animation variants for hover effects
    const cardHoverAnimation = {
        rest: {
            scale: 1,
            transition: { duration: 0.3, ease: "easeInOut" }
        },
        hover: {
            scale: 1.05,
            transition: { duration: 0.3, ease: "easeInOut" }
        }
    };

    // Animation variants for floating images
    const floatingAnimation = {
        animate: {
            y: [0, -10, 0],
            transition: {
                duration: 6,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop"
            }
        }
    };

    return (
        <div className="w-full py-16 md:py-24 relative">
            {/* Black marble background */}
            <div
                className="absolute inset-0 w-full z-0 bg-repeat"
                style={{
                    backgroundImage: 'url("/marble_720.png")',
                    backgroundSize: '500px',
                    backgroundPosition: 'center'
                }}
            >
                <div className="absolute inset-0 z-10 "></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-20">
                {/* Section Title with decorative line */}
                <div className="text-center mb-12 relative">
                    <div className="flex items-center justify-center mb-4">
                        <div className="w-1/4 border-t-2 border-gray-300 mr-4"></div>
                        <h2 className="text-4xl md:text-5xl font-bold text-white px-4">
                            الأقسام
                        </h2>
                        <div className="w-1/4 border-t-2 border-gray-300 ml-4"></div>
                    </div>
                </div>

                {/* Two Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Marble Category */}
                    <motion.div
                        className="relative rounded-3xl overflow-hidden cursor-pointer"
                        variants={cardHoverAnimation}
                        initial="rest"
                        whileHover="hover"
                        whileTap="rest"
                    >
                        <Link href="/products/marble">
                            <motion.div
                                className="relative h-[350px] w-full"
                                variants={floatingAnimation}
                                animate="animate"
                            >
                                <Image
                                    src="/marble.jpg"
                                    alt="رخام"
                                    fill
                                    className="object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white/90 text-black text-xl font-bold py-2 px-8 rounded-full">
                                        رخام
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Granite Category */}
                    <motion.div
                        className="relative rounded-3xl overflow-hidden cursor-pointer"
                        variants={cardHoverAnimation}
                        initial="rest"
                        whileHover="hover"
                        whileTap="rest"
                    >
                        <Link href="/products/granite">
                            <motion.div
                                className="relative h-[350px] w-full"
                                variants={floatingAnimation}
                                animate="animate"
                            >
                                <Image
                                    src="/red-aswan.jpg"
                                    alt="جرانيت"
                                    fill
                                    className="object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white/90 text-black text-xl font-bold py-2 px-8 rounded-full">
                                        جرانيت
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                    <motion.div
                        className="relative rounded-3xl overflow-hidden cursor-pointer"
                        variants={cardHoverAnimation}
                        initial="rest"
                        whileHover="hover"
                        whileTap="rest"
                    >
                        <Link href="/products/granite">
                            <motion.div
                                className="relative h-[350px] w-full"
                                variants={floatingAnimation}
                                animate="animate"
                            >
                                <Image
                                    src="/landscape.jpg"
                                    alt="جرانيت"
                                    fill
                                    className="object-cover rounded-3xl"
                                />
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <span className="bg-white/90 text-black text-xl font-bold py-2 px-8 rounded-full">
                                        لاند سكيب
                                    </span>
                                </div>
                            </motion.div>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default TwoSection