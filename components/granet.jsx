"use client"
import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion';

const Granet = () => {
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
         

            {/* Content Container */}
       
        </div>
    )
}

export default Granet;