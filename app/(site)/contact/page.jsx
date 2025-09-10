"use client"
import React from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform } from 'framer-motion'

const page = () => {
    const ref = React.useRef(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const yBg = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
    const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <div ref={ref} className="relative min-h-screen overflow-hidden -mt-1 -mb-1 font-rubik">
            {/* Background with parallax */}
            <motion.div
                className="absolute -top-2 -left-2 w-[calc(100%+16px)] h-[calc(100%+16px)] -z-10"
                style={{ y: yBg, opacity }}
            >
                <motion.div className="absolute inset-0">
                    <Image
                        src={"/shit.jpg"}
                        alt="Marble quarry background"
                        fill
                        className="object-cover bg-black/10 scale-105"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                </motion.div>
            </motion.div>

            {/* Hero Section */}
            <div className="relative z-10 text-white py-20">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.h1
                        className="text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg rtl"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        تواصل معنا
                    </motion.h1>
                    <motion.p
                        className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed drop-shadow-md rtl"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                        نحن هنا للإجابة على جميع استفساراتكم وتقديم أفضل الحلول لمشاريعكم من الرخام والأحجار الطبيعية
                    </motion.p>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <motion.div
                        className="relative overflow-hidden"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        {/* Form Container with Gradient Background */}
                        <div className="relative bg-gradient-to-br from-white/95 via-[#c8a464]/5 to-[#c8a464]/10 backdrop-blur-md rounded-3xl shadow-2xl border border-[#c8a464]/20 overflow-hidden">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c8a464]/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#c8a464]/15 to-transparent rounded-full -ml-12 -mb-12"></div>

                            <div className="relative p-8 lg:p-10">
                                {/* Form Header */}
                                <div className="text-center mb-10">
                                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#c8a464] to-[#d4b574] rounded-full mb-6 shadow-lg">
                                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 rtl">أرسل لنا رسالة</h2>
                                    <p className="text-gray-600 rtl text-lg">نحن متحمسون لسماع أفكاركم ومساعدتكم في تحقيق مشاريعكم</p>
                                </div>

                                <form className="space-y-8">
                                    {/* Name Fields */}
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="group">
                                            <label className="text-sm font-bold text-gray-700 mb-3 rtl text-right flex items-center justify-end">
                                                <span>الاسم الأول</span>
                                                <div className="mr-2 w-2 h-2 bg-[#c8a464] rounded-full"></div>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full px-5 py-4 pr-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#c8a464]/20 focus:border-[#c8a464] transition-all duration-300 text-right text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md group-hover:border-[#c8a464]/50"
                                                    placeholder="محمد"
                                                />
                                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                    <svg className="w-5 h-5 text-[#c8a464]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label className="text-sm font-bold text-gray-700 mb-3 rtl text-right flex items-center justify-end">
                                                <span>اسم العائلة</span>
                                                <div className="mr-2 w-2 h-2 bg-[#c8a464] rounded-full"></div>
                                            </label>
                                            <div className="relative">
                                                <input
                                                    type="text"
                                                    className="w-full px-5 py-4 pr-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#c8a464]/20 focus:border-[#c8a464] transition-all duration-300 text-right text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md group-hover:border-[#c8a464]/50"
                                                    placeholder="أحمد"
                                                />
                                                <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                    <svg className="w-5 h-5 text-[#c8a464]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Email Field */}
                                    <div className="group">
                                        <label className="text-sm font-bold text-gray-700 mb-3 rtl text-right flex items-center justify-end">
                                            <span>البريد الإلكتروني</span>
                                            <div className="mr-2 w-2 h-2 bg-[#c8a464] rounded-full"></div>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                className="w-full px-5 py-4 pr-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#c8a464]/20 focus:border-[#c8a464] transition-all duration-300 text-right text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md group-hover:border-[#c8a464]/50"
                                                placeholder="mohamed@example.com"
                                            />
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-5 h-5 text-[#c8a464]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Phone Field */}
                                    <div className="group">
                                        <label className="text-sm font-bold text-gray-700 mb-3 rtl text-right flex items-center justify-end">
                                            <span>رقم الهاتف</span>
                                            <div className="mr-2 w-2 h-2 bg-[#c8a464] rounded-full"></div>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="tel"
                                                className="w-full px-5 py-4 pr-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#c8a464]/20 focus:border-[#c8a464] transition-all duration-300 text-right text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md group-hover:border-[#c8a464]/50"
                                                placeholder="+20 123 456 7890"
                                            />
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-5 h-5 text-[#c8a464]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Subject Field */}
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-3 rtl text-right flex items-center justify-end">
                                            <span>الموضوع</span>
                                            <div className="mr-2 w-2 h-2 bg-[#c8a464] rounded-full"></div>
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                className="w-full px-5 py-4 pr-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#c8a464]/20 focus:border-[#c8a464] transition-all duration-300 text-right text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md group-hover:border-[#c8a464]/50"
                                                placeholder="استفسار عن الرخام المصري"
                                            />
                                            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                                                <svg className="w-5 h-5 text-[#c8a464]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Message Field */}
                                    <div className="group">
                                        <label className="block text-sm font-bold text-gray-700 mb-3 rtl text-right flex items-center justify-end">
                                            <span>الرسالة</span>
                                            <div className="mr-2 w-2 h-2 bg-[#c8a464] rounded-full"></div>
                                        </label>
                                        <div className="relative">
                                            <textarea
                                                rows="6"
                                                className="w-full px-5 py-4 pr-12 bg-white/80 border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-[#c8a464]/20 focus:border-[#c8a464] transition-all duration-300 resize-none text-right text-gray-800 placeholder-gray-400 shadow-sm hover:shadow-md group-hover:border-[#c8a464]/50"
                                                placeholder="أخبرنا المزيد عن مشروعك واحتياجاتك من الرخام والأحجار الطبيعية..."
                                            ></textarea>
                                            <div className="absolute right-4 top-6">
                                                <svg className="w-5 h-5 text-[#c8a464]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <motion.button
                                        type="submit"
                                        className="w-full relative overflow-hidden bg-gradient-to-r from-[#c8a464] to-[#d4b574] text-white py-5 px-8 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <span className="relative z-10 flex items-center justify-center rtl">
                                            <svg className="w-6 h-6 ml-3 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                            </svg>
                                            إرسال الرسالة
                                        </span>
                                        <div className="absolute inset-0 bg-gradient-to-r from-[#b8944a] to-[#c8a464] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </motion.button>

                                    {/* Contact Info Below Form */}
                                    <div className="pt-6 border-t border-[#c8a464]/20">
                                        <div className="flex items-center justify-center space-x-reverse space-x-8 rtl">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium">رد خلال 24 ساعة</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium">استشارة مجانية</span>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Information */}
                    <div className="space-y-8">


                        {/* Contact Details - Egypt Office */}
                        <motion.div
                            className="relative overflow-hidden"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            viewport={{ once: true }}
                        >
                            {/* Egypt Office Container with Gradient Background - matching form theme */}
                            <div className="relative bg-gradient-to-br from-white/95 via-[#c8a464]/5 to-[#c8a464]/10 backdrop-blur-md rounded-3xl shadow-2xl border border-[#c8a464]/20 overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#c8a464]/20 to-transparent rounded-full -ml-16 -mt-16"></div>
                                <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tr from-[#c8a464]/15 to-transparent rounded-full -mr-12 -mb-12"></div>

                                <div className="relative p-8">
                                    <div className="flex items-center justify-end mb-8">
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 rtl">مكتب مصر</h2>
                                        <div className="bg-gradient-to-br from-red-100 to-red-50 p-3 rounded-full ml-4 shadow-lg">
                                            <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="grid gap-8">
                                        {/* Address */}
                                        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border-r-4 border-amber-500 shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-start space-x-reverse space-x-4 rtl">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-amber-800 mb-3 text-right text-xl flex items-center justify-end">
                                                        <span>العنوان</span>
                                                        <div className="bg-amber-200 p-2 rounded-full ml-2 shadow-sm">
                                                            <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                    </h3>
                                                    <p className="text-amber-900 text-right leading-relaxed text-lg font-medium">
                                                        15 ش المقاولون العرب - بوابة 3 نادى الشمس - مصر الجديدة
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Working Hours */}
                                        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-6 border-r-4 border-purple-500 shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-start space-x-reverse space-x-4 rtl">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-purple-800 mb-3 text-right text-xl flex items-center justify-end">
                                                        <span>مواعيد العمل</span>
                                                        <div className="bg-purple-200 p-2 rounded-full ml-2 shadow-sm">
                                                            <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        </div>
                                                    </h3>
                                                    <p className="text-purple-900 text-right leading-relaxed text-lg font-medium">
                                                        9 ص الي 5 م
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Phone Numbers */}
                                        <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border-r-4 border-green-500 shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-start space-x-reverse space-x-4 rtl">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-green-800 mb-3 text-right text-xl flex items-center justify-end">
                                                        <span>التليفون</span>
                                                        <div className="bg-green-200 p-2 rounded-full ml-2 shadow-sm">
                                                            <svg className="w-5 h-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                            </svg>
                                                        </div>
                                                    </h3>
                                                    <div className="text-green-900 text-right space-y-2 text-lg font-medium">
                                                        <p>+01227424500</p>
                                                        <p>+01093805978</p>
                                                        <p>+01222748135</p>
                                                        <p>+01063116660</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info Below Egypt Office */}
                                    <div className="pt-6 border-t border-[#c8a464]/20 mt-8">
                                        <div className="flex items-center justify-center space-x-reverse space-x-8 rtl">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span className="text-sm font-medium">اتصال مباشر</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                                <span className="text-sm font-medium">خدمة عملاء متميزة</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Algeria Office */}
                        <motion.div
                            className="relative overflow-hidden"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                            viewport={{ once: true }}
                        >
                            {/* Algeria Office Container with Gradient Background - matching form theme */}
                            <div className="relative bg-gradient-to-br from-white/95 via-[#c8a464]/5 to-[#c8a464]/10 backdrop-blur-md rounded-3xl shadow-2xl border border-[#c8a464]/20 overflow-hidden">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c8a464]/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#c8a464]/15 to-transparent rounded-full -ml-12 -mb-12"></div>

                                <div className="relative p-8">
                                    <div className="flex items-center justify-end mb-8">
                                        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 rtl">مكتب الجزائر</h2>
                                        <div className="bg-gradient-to-br from-green-100 to-green-50 p-3 rounded-full ml-4 shadow-lg">
                                            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                                            </svg>
                                        </div>
                                    </div>

                                    <div className="grid gap-8">
                                        {/* Algeria Address */}
                                        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-2xl p-6 border-r-4 border-teal-500 shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-start space-x-reverse space-x-4 rtl">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-teal-800 mb-3 text-right text-xl flex items-center justify-end">
                                                        <span>العنوان</span>
                                                        <div className="bg-teal-200 p-2 rounded-full ml-2 shadow-sm">
                                                            <svg className="w-5 h-5 text-teal-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            </svg>
                                                        </div>
                                                    </h3>
                                                    <p className="text-teal-900 text-right leading-relaxed text-lg font-medium">
                                                        بن بخاري محمد حيدر الواحات الشمالية ولاية الأغواط<br />
                                                        الجمهورية الجزائرية
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Algeria Contact */}
                                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border-r-4 border-blue-500 shadow-sm hover:shadow-md transition-shadow duration-300">
                                            <div className="flex items-start space-x-reverse space-x-4 rtl">
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-blue-800 mb-3 text-right text-xl flex items-center justify-end">
                                                        <span>معلومات التواصل</span>
                                                        <div className="bg-blue-200 p-2 rounded-full ml-2 shadow-sm">
                                                            <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    </h3>
                                                    <div className="text-blue-900 text-right space-y-2 text-lg font-medium">
                                                        <p>بريد إلكتروني: info@elhebaeg.com</p>
                                                        <p>التليفون: 00213551565552</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Contact Info Below Algeria Office */}
                                    <div className="pt-6 border-t border-[#c8a464]/20 mt-8">
                                        <div className="flex items-center justify-center space-x-reverse space-x-8 rtl">
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9-9a9 9 0 00-9 9m0 0a9 9 0 019-9" />
                                                </svg>
                                                <span className="text-sm font-medium">خدمة دولية</span>
                                            </div>
                                            <div className="flex items-center text-gray-600">
                                                <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <span className="text-sm font-medium">دعم متخصص</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Company Overview with Map */}
                            <motion.div
                                className="relative overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                                viewport={{ once: true }}
                            >
                                {/* Map Container with Gradient Background - matching form theme */}
                                <div className="relative bg-gradient-to-br from-white/95 via-[#c8a464]/5 to-[#c8a464]/10 backdrop-blur-md rounded-3xl shadow-2xl border border-[#c8a464]/20 overflow-hidden">
                                    {/* Decorative Elements */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#c8a464]/20 to-transparent rounded-full -mr-16 -mt-16"></div>
                                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#c8a464]/15 to-transparent rounded-full -ml-12 -mb-12"></div>

                                    <div className="relative p-8">
                                        {/* Header */}
                                        <div className="text-center mb-8">
                                            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-[#c8a464] to-[#d4b574] rounded-full mb-6 shadow-lg">
                                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 rtl">موقعنا</h2>
                                            <p className="text-gray-600 rtl text-lg text-right leading-relaxed">
                                                تفضلوا بزيارة مقرنا الرئيسي في مصر، حيث ندير عمليات الاستيراد والتصدير للرخام والمواد الغذائية والمنتجات الزراعية عالية الجودة.
                                            </p>
                                        </div>

                                        {/* Google Maps Embed */}
                                        <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#c8a464]/20 mb-6">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13815.319162356636!2d31.3417978!3d30.118921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa5d786666b%3A0x14ebec70ab30918a!2sAl%20Mqawlon%20Al%20Arab%2C%20Al%20Matar%2C%20El%20Nozha%2C%20Cairo%20Governorate!5e0!3m2!1sen!2seg!4v1725534262086!5m2!1sen!2seg"
                                                width="100%"
                                                height="300"
                                                style={{ border: 0 }}
                                                allowFullScreen=""
                                                loading="lazy"
                                                referrerPolicy="no-referrer-when-downgrade"
                                                className="w-full"
                                            ></iframe>
                                            {/* Map overlay for styling */}
                                            <div className="absolute inset-0 pointer-events-none border-2 border-[#c8a464]/30 rounded-2xl"></div>
                                        </div>

                                        {/* Map Info Below */}
                                        <div className="pt-6 border-t border-[#c8a464]/20">
                                            <div className="flex items-center justify-center space-x-reverse space-x-8 rtl">
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    </svg>
                                                    <span className="text-sm font-medium">موقع سهل الوصول</span>
                                                </div>
                                                <div className="flex items-center text-gray-600">
                                                    <svg className="w-5 h-5 text-[#c8a464] ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m6 4V7a2 2 0 00-2-2H6a2 2 0 00-2 2v4m-4 4V7a4 4 0 014-4h12a4 4 0 014 4v4" />
                                                    </svg>
                                                    <span className="text-sm font-medium">مواقف متاحة</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>

                    </div>
                </div>
            </div>


        </div>
    )
}

export default page