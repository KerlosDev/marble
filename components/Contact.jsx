"use client"
import React from 'react'

const Contact = () => {
    return (
        <div className="bg-stone-100 py-20">
            <div className="container mx-auto px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12 relative">
                        <div className="flex items-center justify-center">
                            <div className="w-1/4 border-t border-gray-400 mr-4"></div>
                            <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 px-4">
                                تواصل معنا
                            </h2>
                            <div className="w-1/4 border-t border-gray-400 ml-4"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Map Section - Left Square */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
                            <div className="aspect-square w-full relative">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13815.319162356636!2d31.3417978!3d30.118921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa5d786666b%3A0x14ebec70ab30918a!2sAl%20Mqawlon%20Al%20Arab%2C%20Al%20Matar%2C%20El%20Nozha%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1725534262086!5m2!1sen!2seg"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                ></iframe>
                            </div>
                        </div>

                        {/* Contact Information - Right Square */}
                        <div className="bg-gradient-to-br font-rubik from-white to-stone-100 rounded-2xl shadow-xl overflow-hidden transform transition-all hover:shadow-2xl">
                            <div className="aspect-square w-full">
                                <div className="h-full flex flex-col p-8 md:p-10 text-right relative">
                                    {/* Decorative Pattern */}
                                    <div className="absolute top-0 right-0 w-24 h-24 opacity-10">
                                        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="fill-[#c8a464]">
                                            <path d="M44.5,-76.3C59.1,-69.8,73.2,-60.4,81.8,-47C90.5,-33.5,93.6,-16.7,93.4,-0.1C93.2,16.5,89.6,33,81.1,46.7C72.6,60.4,59.2,71.2,44.4,76.8C29.5,82.4,14.8,82.8,-0.1,82.9C-14.9,83.1,-29.8,83,-43.2,77.4C-56.6,71.9,-68.5,60.8,-76.9,47.2C-85.4,33.6,-90.3,16.8,-89.9,0.3C-89.5,-16.3,-83.9,-32.5,-74.6,-46.5C-65.3,-60.5,-52.3,-72.3,-38,-77.7C-23.6,-83.1,-11.8,-82.2,1.5,-84.8C14.8,-87.5,29.9,-82.9,44.5,-76.3Z" transform="translate(100 100)" />
                                        </svg>
                                    </div>

                                    {/* Header with Logo */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex-1 h-0.5 bg-gradient-to-l from-[#c8a464] to-transparent"></div>
                                        <div className="px-4">
                                            <img src="/logo-en.png" alt="Company Logo" className="h-16 object-contain" />
                                        </div>
                                        <div className="flex-1 h-0.5 bg-gradient-to-r from-[#c8a464] to-transparent"></div>
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-2xl font-bold text-center mb-6 text-neutral-800">
                                        <span className="relative inline-block">
                                            <span className="relative z-10 text-neutral-800">معلومات التواصل</span>
                                            <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#c8a464] opacity-20 z-0"></span>
                                        </span>
                                    </h3>

                                    {/* Contact Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {/* Visit Us */}
                                        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-end">
                                            <div className="w-full flex justify-end mb-3">
                                                <div className="p-2.5 rounded-lg bg-[#c8a464] bg-opacity-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c8a464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <h4 className="text-lg font-bold mb-1 text-[#c8a464]">العنوان</h4>
                                            <p className="text-neutral-700">شارع الحصن، الهرم، الجيزة، مصر</p>
                                        </div>

                                        {/* Email */}
                                        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-end">
                                            <div className="w-full flex justify-end mb-3">
                                                <div className="p-2.5 rounded-lg bg-[#c8a464] bg-opacity-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c8a464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <h4 className="text-lg font-bold mb-1 text-[#c8a464]">البريد الإلكتروني</h4>
                                            <a href="mailto:info@elfares-eg.com" className="text-neutral-700 hover:text-[#c8a464] transition-colors">
                                                info@elfares-eg.com
                                            </a>
                                        </div>

                                        {/* Phone */}
                                        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-end">
                                            <div className="w-full flex justify-end mb-3">
                                                <div className="p-2.5 rounded-lg bg-[#c8a464] bg-opacity-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c8a464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <h4 className="text-lg font-bold mb-1 text-[#c8a464]">الهاتف</h4>
                                            <a href="tel:00200112985945" className="text-neutral-700 hover:text-[#c8a464] transition-colors">
                                                00200112985945
                                            </a>
                                        </div>

                                        {/* WhatsApp */}
                                        <div className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-end">
                                            <div className="w-full flex justify-end mb-3">
                                                <div className="p-2.5 rounded-lg bg-[#c8a464] bg-opacity-10">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#c8a464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <h4 className="text-lg font-bold mb-1 text-[#c8a464]">واتساب</h4>
                                            <a href="https://wa.me/00200122761870" className="text-neutral-700 hover:text-[#c8a464] transition-colors">
                                                00200122761870
                                            </a>
                                        </div>
                                    </div>

                                    {/* Business Hours */}
                                    <div className="mt-8 bg-white p-3 rounded-lg shadow-sm text-center">
                                        <p className="text-sm text-neutral-700 flex items-center justify-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#c8a464]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>ساعات العمل: الأحد - الخميس، 9:00 صباحاً - 5:00 مساءً</span>
                                        </p>
                                    </div>

                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact