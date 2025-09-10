import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp, FaInstagram, FaFacebookF, FaArrowRight } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer className="bg-black text-white relative">
            {/* Marble texture background */}
            <div className="absolute inset-0 bg-[url('/marble_720.png')] opacity-80 z-0"></div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                <div dir='rtl' className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">

                    {/* Column 1: Logo and Description */}
                    <div className="text-center  flex flex-col items-end md:items-end">

                        <div className="mb-6">
                            <Image src="/logo-en.png" alt="Prime Marble" width={250} height={100} />
                        </div>
                        <p className="text-lg mb-6 leading-relaxed text-center md:text-right" style={{ fontFamily: 'var(--font-arabic, sans-serif)' }}>
                            مرحباً بكم في الفارس وجهتكم الأولى للحصول على أرقى أنواع الرخام والجرانيت المصري، حيث سنوات من الخبرة والتزامنا بالتميز
                        </p>

                        {/* Contact Us Button */}

                        <Link href="/contact" className="group relative overflow-hidden bg-white/10 backdrop-blur-xl text-white hover:bg-white hover:text-black  font-bold py-4 px-8 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl border-2 border-white">
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-0 group-hover:opacity-30 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                            <div className="flex items-center gap-3 relative z-10 justify-center">
                                <span className="text-lg font-semibold" style={{ fontFamily: 'var(--font-arabic, sans-serif)' }}>تواصل معنا</span>
                                <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" size={18} />
                            </div>
                        </Link>



                    </div>

                    {/* Column 2: Contact Information */}
                    <div className="text-center md:text-center">
                        <h2 className="text-3xl mb-6 font-bold text-white text-center md:text-right" style={{ fontFamily: 'var(--font-arabic, sans-serif)' }}>معلومات الاتصال</h2>

                        <div className="flex flex-col space-y-4">
                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                                    <FaMapMarkerAlt className="text-black" size={18} />
                                </div>
                                <p className="text-lg text-white" style={{ fontFamily: 'var(--font-arabic, sans-serif)' }}>١ شارع الحصن، الهرم، الجيزة</p>
                            </div>

                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                                    <FaEnvelope className="text-black" size={18} />
                                </div>
                                <p className="text-white">Info@elfares-Eg.Com</p>
                            </div>

                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                                    <FaPhone className="text-black" size={18} />
                                </div>
                                <p className="text-white" dir="ltr">
                                    <span style={{ fontFamily: 'var(--font-arabic, sans-serif)' }}>إتصال</span>: 002001129859453
                                </p>
                            </div>

                            <div className="flex items-center gap-3 justify-center md:justify-start">
                                <div className="bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center">
                                    <FaWhatsapp className="text-black" size={18} />
                                </div>
                                <p className="text-white" dir="ltr">
                                    <span style={{ fontFamily: 'var(--font-arabic, sans-serif)' }}>واتساب</span>: 002001227661870
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Column 3: About Section */}
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl mb-6 font-bold text-white text-center md:text-left">About</h2>
                        <p className="text-lg mb-8 leading-relaxed text-center md:text-left">
                            We specialize in high-quality import and export.
                        </p>

                        <div className="flex justify-center md:justify-start gap-4">
                            <Link href="mailto:Info@elfares-Eg.Com" className=" rounded-full p-3 w-14 h-14 flex items-center justify-center  transition-colors">
                                <FaEnvelope className="text-white" size={30} />
                            </Link>
                            <Link href="https://wa.me/002001227661870" className=" rounded-full p-3 w-14 h-14 flex items-center justify-center  transition-colors">
                                <FaWhatsapp className="text-white" size={30} />
                            </Link>
                            <Link href="https://instagram.com" className=" rounded-full p-3 w-14 h-14 flex items-center justify-centerv transition-colors">
                                <FaInstagram className="text-white" size={30} />
                            </Link>
                            <Link href="https://facebook.com" className=" rounded-full p-3 w-14 h-14 flex items-center justify-center  transition-colors">
                                <FaFacebookF className="text-white" size={30} />
                            </Link>
                        </div>

                    </div>
                </div>

                {/* Created by section */}
                <div className="border-t border-gray-700 mt-8 pt-6 text-center">
                    <p className="text-gray-300 text-sm">
                        Created with ❤️ by <span className="text-white font-semibold">Kerlos Hany</span> & <span className="text-white font-semibold">Amr Khaled</span>
                    </p>
                </div>
            </div>

        </footer>
    )
}

export default Footer