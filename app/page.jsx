import About from '@/components/About'
import Contact from '@/components/Contact'
import ContactModal from '@/components/ContactModal'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import TwoSection from '@/components/TwoSection'
import Video from '@/components/Video'
import React from 'react'
import '@fontsource/cairo';

const page = () => {
    return (
        <main className="min-h-screen">
            <Hero />
            <About />
            <TwoSection />
            <Products />
            <Video></Video>
            <Contact></Contact>
        </main>
    )
}

export default page