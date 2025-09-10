import About from '@/components/About'
import Contact from '@/components/Contact'
import ContactModal from '@/components/ContactModal'
import Hero from '@/components/Hero'
import Products from '@/components/Products'
import TwoSection from '@/components/TwoSection'
import Video from '@/components/Video'
import React from 'react'
import '@fontsource/cairo';
import Marble from '@/components/marble'
import Granet from '@/components/granet'
import Landscape from '@/components/landescape'
import Container from '@/components/container'
import Shit from '@/components/Shit'

const page = () => {
    return (
        <main className="min-h-screen">
            <Shit></Shit>
           
         
            <Marble />

            <Landscape></Landscape>
            <Container></Container>
            <Products />
             <Contact></Contact>
        </main>
    )
}

export default page