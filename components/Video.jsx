"use client"
import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'

const Video = () => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <div className="py-16 bg-stone-100">
      <div className="container mx-auto px-4">
        {/* Title with decorative lines */}
        <div className="text-center mb-12 relative">
          <div className="flex items-center justify-center">
            <div className="w-1/4 border-t border-gray-400 mr-4"></div>
            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 px-4">
              فيديو من مصانعنا
            </h2>
            <div className="w-1/4 border-t border-gray-400 ml-4"></div>
          </div>
        </div>

        {/* Video Container */}
        <motion.div 
          className="relative mx-auto max-w-4xl overflow-hidden rounded-2xl shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <video 
            ref={videoRef}
            className="w-full h-auto"
            controls
            poster="/marble.jpg"
          >
            <source src="/large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          
          {/* Large play button overlay (shows when video is not playing) */}
          {!isPlaying && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={togglePlay}
            >
              <motion.button
                className="w-20 h-20 bg-white/80 rounded-full flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 text-neutral-800" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
        
        
      </div>
    </div>
  )
}

export default Video