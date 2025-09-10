'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

// Animation variants
const fadeInUp = {
    initial: { opacity: 0, y: 50 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const fadeInLeft = {
    initial: { opacity: 0, x: -50 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const fadeInRight = {
    initial: { opacity: 0, x: 50 },
    animate: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
};

const staggerContainer = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3
        }
    }
};

const AboutPage = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Slideshow images
    const slideImages = [
        { src: '/marble.jpg', alt: 'Marble Collection' },
        { src: '/marble2.jpg', alt: 'Premium Marble' },
        { src: '/marbleslide.jpg', alt: 'Marble Showcase' },
        { src: '/landscape.jpg', alt: 'Landscape Projects' },
        { src: '/landone.jpg', alt: 'Landscape Design' },
        { src: '/landtwo.jpg', alt: 'Garden Landscape' },
        { src: '/landthree.jpg', alt: 'Modern Landscape' },
        { src: '/landfour.jpg', alt: 'Luxury Landscape' }
    ];

    if (!mounted) {
        return <div className="min-h-screen bg-gray-100"></div>;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
            {/* Hero Section with Slideshow */}
            <section className="relative h-screen overflow-hidden">
                <Swiper
                    modules={[Pagination, Autoplay, EffectFade]}
                    effect="fade"
                    pagination={{
                        clickable: true,
                        bulletClass: 'swiper-pagination-bullet !bg-white/50 !w-3 !h-3',
                        bulletActiveClass: 'swiper-pagination-bullet-active !bg-white !scale-150'
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    loop={true}
                    className="h-full w-full"
                >
                    {slideImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-full w-full">
                                <Image
                                    src={image.src}
                                    alt={image.alt}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/30"></div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Hero Content Overlay */}
                <div className="absolute font-rubik inset-0 flex items-center justify-center z-10">
                    <motion.div
                        className="text-center text-white px-4 max-w-4xl"
                        variants={staggerContainer}
                        initial="initial"
                        animate="animate"
                    >
                        <motion.div variants={fadeInUp} className="mb-6">
                            <Image
                                src="/logowhite.png"
                                alt="Elfares Logo"
                                width={200}
                                height={100}
                                className="mx-auto mb-8"
                            />
                        </motion.div>
                        <motion.h1
                            variants={fadeInUp}
                            className="text-2xl  md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-arabic"
                        >
                            شركة الفارس للرخام والمناظر الطبيعية
                        </motion.h1>
                        <motion.p
                            variants={fadeInUp}
                            className="text-xl md:text-2xl mb-8 leading-relaxed opacity-90"
                        >
                            رائدون في صناعة الرخام والمناظر الطبيعية منذ عقود
                        </motion.p>
                        <motion.div
                            variants={fadeInUp}
                            className="flex flex-col sm:flex-row gap-4 justify-center"
                        >
                            <button className="px-8 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
                                اكتشف منتجاتنا
                            </button>
                            <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-gray-900 font-semibold rounded-full transition-all duration-300 shadow-xl">
                                تواصل معنا
                            </button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Company Story Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="text-center mb-16">
                            <motion.div
                                variants={fadeInUp}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="flex items-center justify-center mb-8"
                            >
                                <div className="w-1/4 border-t-2 border-amber-600 mr-4"></div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 px-4 font-arabic">
                                    قصة الفارس
                                </h2>
                                <div className="w-1/4 border-t-2 border-amber-600 ml-4"></div>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                            <motion.div
                                variants={fadeInLeft}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h3 className="text-3xl font-bold text-gray-800 mb-6 font-arabic">
                                    عن شركة الفارس للرخام والمناظر الطبيعية
                                </h3>
                                <p className="text-lg text-gray-700 leading-relaxed font-arabic">
                                    تأسست شركة الفارس للرخام والمناظر الطبيعية لتكون رائدة في مجال استخراج وتصنيع وتوريد أجود أنواع الرخام المصري الطبيعي. نحن نفخر بتراثنا العريق في صناعة الحجر الطبيعي، حيث نجمع بين الخبرة التقليدية والتكنولوجيا الحديثة.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed font-arabic">
                                    منذ تأسيسنا، نسعى جاهدين لتقديم منتجات عالية الجودة تلبي أعلى المعايير العالمية. نحن متخصصون في استخراج الرخام من أشهر المحاجر المصرية ومعالجته بأحدث التقنيات لضمان الحصول على منتجات متميزة.
                                </p>
                                <div className="grid grid-cols-2 gap-6 mt-8">
                                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                                        <div className="text-3xl font-bold text-amber-600 mb-2">25+</div>
                                        <div className="text-gray-700 font-arabic">سنة خبرة</div>
                                    </div>
                                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl">
                                        <div className="text-3xl font-bold text-amber-600 mb-2">500+</div>
                                        <div className="text-gray-700 font-arabic">مشروع منجز</div>
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInRight}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/storehouse.png"
                                        alt="Elfares Factory"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-20 bg-gradient-to-br from-stone-100 to-stone-200">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-16">
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center justify-center mb-8"
                            >
                                <div className="w-1/4 border-t-2 border-amber-600 mr-4"></div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 px-4 font-arabic">
                                    خدماتنا المتخصصة
                                </h2>
                                <div className="w-1/4 border-t-2 border-amber-600 ml-4"></div>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {/* Marble Service */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src="/marble.jpg"
                                        alt="Marble Services"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold mb-2 font-arabic">الرخام الطبيعي</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 leading-relaxed font-arabic">
                                        نقدم أجود أنواع الرخام المصري الطبيعي من محاجرنا المتخصصة، مع ضمان أعلى معايير الجودة والتصنيع.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Landscape Service */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src="/landscape.jpg"
                                        alt="Landscape Services"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold mb-2 font-arabic">المناظر الطبيعية</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 leading-relaxed font-arabic">
                                        تصميم وتنفيذ المناظر الطبيعية والحدائق الفاخرة بأسلوب عصري يجمع بين الجمال والوظيفة.
                                    </p>
                                </div>
                            </motion.div>

                            {/* Import/Export Service */}
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="relative h-64">
                                    <Image
                                        src="/cf.jpg"
                                        alt="Import Export Services"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                    <div className="absolute bottom-4 left-4 text-white">
                                        <h3 className="text-2xl font-bold mb-2 font-arabic">التوريد والتصدير</h3>
                                    </div>
                                </div>
                                <div className="p-6">
                                    <p className="text-gray-700 leading-relaxed font-arabic">
                                        نقوم بتوريد وتصدير منتجاتنا عالية الجودة إلى جميع أنحاء العالم مع ضمان أفضل خدمات الشحن والتسليم.
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Import/Export Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-7xl mx-auto"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                variants={fadeInLeft}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="relative"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src="/Cont.jpg"
                                        alt="Import Export Operations"
                                        width={600}
                                        height={400}
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                                </div>
                            </motion.div>

                            <motion.div
                                variants={fadeInRight}
                                initial="initial"
                                whileInView="animate"
                                viewport={{ once: true }}
                                className="space-y-6"
                            >
                                <h3 className="text-3xl font-bold text-gray-800 mb-6 font-arabic">
                                    التوريد والتصدير العالمي
                                </h3>
                                <p className="text-lg text-gray-700 leading-relaxed font-arabic">
                                    نحن رواد في مجال تصدير الرخام المصري الطبيعي إلى جميع أنحاء العالم. نعمل مع شركاء عالميين لضمان وصول منتجاتنا عالية الجودة إلى عملائنا في أفضل حالة.
                                </p>
                                <p className="text-lg text-gray-700 leading-relaxed font-arabic">
                                    خدماتنا في التوريد والتصدير تشمل التعبئة المتخصصة، والشحن الآمن، والمتابعة المستمرة حتى وصول البضائع. نحن نلتزم بأعلى معايير الجودة والمواعيد المحددة.
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                                    <div className="flex items-center space-x-3 space-x-reverse p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
                                        <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">✈️</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 font-arabic">شحن عالمي</h4>
                                            <p className="text-sm text-gray-600 font-arabic">توصيل سريع وآمن</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 space-x-reverse p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
                                        <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">🏆</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 font-arabic">جودة مضمونة</h4>
                                            <p className="text-sm text-gray-600 font-arabic">معايير عالمية</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 space-x-reverse p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
                                        <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">📦</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 font-arabic">تعبئة متخصصة</h4>
                                            <p className="text-sm text-gray-600 font-arabic">حماية كاملة</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-3 space-x-reverse p-4 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl">
                                        <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center">
                                            <span className="text-white font-bold">🌍</span>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-800 font-arabic">تغطية عالمية</h4>
                                            <p className="text-sm text-gray-600 font-arabic">في جميع القارات</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-br from-amber-50 to-amber-100">
                <div className="container mx-auto px-4">
                    <motion.div
                        className="max-w-7xl mx-auto text-center"
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="animate"
                        viewport={{ once: true }}
                    >
                        <div className="text-center mb-16">
                            <motion.div
                                variants={fadeInUp}
                                className="flex items-center justify-center mb-8"
                            >
                                <div className="w-1/4 border-t-2 border-amber-600 mr-4"></div>
                                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 px-4 font-arabic">
                                    قيمنا ورؤيتنا
                                </h2>
                                <div className="w-1/4 border-t-2 border-amber-600 ml-4"></div>
                            </motion.div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <motion.div
                                variants={fadeInUp}
                                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl text-white">🎯</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 font-arabic">رؤيتنا</h3>
                                <p className="text-gray-700 leading-relaxed font-arabic">
                                    أن نكون الشركة الرائدة عالمياً في صناعة الرخام والمناظر الطبيعية، ونحقق التميز في كل ما نقدمه.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl text-white">💎</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 font-arabic">رسالتنا</h3>
                                <p className="text-gray-700 leading-relaxed font-arabic">
                                    تقديم أفضل المنتجات والخدمات في مجال الرخام والمناظر الطبيعية مع الالتزام بأعلى معايير الجودة والإبداع.
                                </p>
                            </motion.div>

                            <motion.div
                                variants={fadeInUp}
                                className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 bg-gradient-to-r from-amber-600 to-amber-700 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl text-white">⭐</span>
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-4 font-arabic">قيمنا</h3>
                                <p className="text-gray-700 leading-relaxed font-arabic">
                                    الصدق، الشفافية، الجودة، الابتكار، والالتزام بالمواعيد. هذه هي القيم التي توجه عملنا يومياً.
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>
 
        </div>
    );
};

export default AboutPage;