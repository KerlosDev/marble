'use client'
import React, { useState } from 'react'
import Image from 'next/image'

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0)
    const slides =
        [
            {
                image: '/slide one.jpeg',
                title: 'تريستا (لؤلؤة سيناء)',
                description: 'رخام مميز بدرجات البيج والكريم الفنية، يتميز بعروق دقيقة تضفي لمسة من العمق والرقي على الأرضيات والجدران وأسطح الطاولات. يتم استخدامه على نطاق واسع في المشاريع السكنية والتجارية لإضفاء طابع فاخر. كما يجمع بين الصلابة والجمال ليبقى خيارًا مثاليًا لمحبي الذوق الرفيع.',
                icon: '/logo-ar.png'
            },
            {
                image: '/slide two.jpeg',
                title: 'برايم ماربل',
                description: 'نقدم أفضل أنواع الرخام والجرانيت بأعلى جودة وتصميمات فريدة تناسب جميع الأذواق. فريقنا المتخصص يعمل على اختيار المواد بعناية فائقة من أفضل المحاجر. مع برايم ماربل تحصل على منتج يجمع بين القوة والمتانة مع لمسة فنية تضيف قيمة لأي مشروع.',
                icon: '/logo-ar.png'
            },
            {
                image: '/slide three.jpg',
                title: 'تصاميم فاخرة',
                description: 'مجموعة متنوعة من الرخام والجرانيت بتشكيلات وألوان متعددة لتناسب مختلف الاحتياجات. سواء كنت تبحث عن لمسة عصرية أو كلاسيكية، ستجد ما يلبي تطلعاتك. نحن نحرص على تقديم حلول متكاملة تعكس الأناقة والجودة في كل تفاصيل التصميم.',
                icon: '/logo-ar.png'
            
            },
            {
                image: '/slide three.jpg',
                title: 'تصاميم فاخرة',
                description: 'مجموعة متنوعة من الرخام والجرانيت بتشكيلات وألوان متعددة لتناسب مختلف الاحتياجات. سواء كنت تبحث عن لمسة عصرية أو كلاسيكية، ستجد ما يلبي تطلعاتك. نحن نحرص على تقديم حلول متكاملة تعكس الأناقة والجودة في كل تفاصيل التصميم.',
                icon: '/logo-ar.png'
            },
        ]


    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
    }

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    }

    const goToSlide = (index) => {
        setCurrentSlide(index)
    }

    return (
        <section className="relative h-screen w-full overflow-hidden pt-16">
            {/* Background Image */}
            <div className="absolute top-0 left-0 w-full h-full">
                <Image
                    src={slides[currentSlide].image}
                    alt="Marble background"
                    className='bg-cover bg-center w-full h-full object-cover'
                    width={1920}
                    height={1080}
                    priority
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-25"></div>
            </div>

            {/* Content */}
            <div className="relative h-full container mx-auto px-4 flex flex-col justify-center" dir="rtl">
                <div className="max-w-lg ml-auto mr-4 md:mr-8 lg:mr-16">
                    <div className="flex items-center justify-start mb-4">
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-white flex-shrink-0">
                            <Image
                                src={slides[currentSlide].icon}
                                alt="Logo"
                                width={48}
                                height={48}
                                className="object-cover"
                            />
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-4xl font-bold text-white ml-3 p-4 font-rubik">
                            {slides[currentSlide].title}
                        </h1>
                    </div>
                    <p className="text-lg  text-white mb-8 font-rubik text-right">
                        {slides[currentSlide].description}
                    </p>
                    <div className="text-right">
                        <button className="bg-black bg-opacity-75 hover:bg-opacity-90 text-white px-6 py-3 rounded-full font-rubik">
                            اعرف المزيد
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation arrows */}
            <div className="absolute inset-y-0 right-0 flex items-center">
                <button
                    onClick={prevSlide}
                    className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-l-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            <div className="absolute inset-y-0 left-0 flex items-center">
                <button
                    onClick={nextSlide}
                    className="bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-r-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
            </div>

            {/* Slide indicators */}
            <div className="absolute bottom-10 left-0 right-0">
                <div className="flex justify-center space-x-reverse space-x-2" dir="rtl">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-3 h-3 rounded-full ${currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
                                }`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Hero