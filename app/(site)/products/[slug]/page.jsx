'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import ImageGallery from '@/components/ImageGallery';
import ContactModal from '@/components/ContactModal';
import GlobalApi from '@/app/api/GlobalApi';

export default function ProductPage({ params }) {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchProduct() {
            try {
                setLoading(true);
                const response = await GlobalApi.product(params.slug);
                console.log('Product fetched:', response);

                if (response && response.products && response.products.length > 0) {
                    setProduct(response.products[0]);
                    setError(null);
                } else {
                    setProduct(null);
                    setError('Product not found');
                }
            } catch (err) {
                console.error('Error fetching product:', err);
                setError('Failed to fetch product');
                setProduct(null);
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [params.slug]);

    if (loading) {
        return <div className="py-12 container-custom">Loading...</div>;
    }

    if (error || !product) {
        notFound();
    }

    const {
        title,
        wasf,
        image,
        time,
        uses,
        nameofmatriel,
        color,
        description
    } = product;

    return (
        <div className="py-12 bg-gray-50 font-rubik">
            <div className="container-custom">
                <div className="bg-white rounded-3xl shadow-sm p-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Image */}
                        <div>
                            <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-lg">
                                {image && (
                                    <img
                                        src={image.url}
                                        alt={title}
                                        className="object-cover w-full h-full"
                                    />
                                )}
                            </div>

                            {/* Color Sample */}
                            {color && (
                                <div className="mt-6 flex items-center gap-4" dir="rtl">
                                    <div
                                        className="w-12 h-12 rounded-full shadow-inner border-2 border-gray-200"
                                        style={{ backgroundColor: color.hex }}
                                    />
                                    <div className="text-sm">
                                        <p className="font-semibold">لون المنتج</p>
                                        <p className="text-gray-600">{color.hex}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Product Details */}
                        <div>
                            <div className="mb-6">
                                <div className="inline-flex items-center font-rubik text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                                    تم النشر: {new Date(time).toLocaleDateString('ar-EG')}
                                </div>
                            </div>

                            <h1 className="text-3xl md:text-4xl font-rubik font-bold mb-4 leading-relaxed" dir="rtl">{title}</h1>

                            {nameofmatriel && (
                                <div className="mb-6 bg-gray-50 p-4 rounded-xl" dir="rtl">
                                    <h2 className="text-lg font-rubik mb-2">اسم الخامة</h2>
                                    <p className="text-gray-700 font-rubik ">{nameofmatriel}</p>
                                </div>
                            )}

                            {description && (
                                <div className="mb-6" dir="rtl">
                                    <h2 className="text-lg font-rubik mb-2">نبذة عن المنتج</h2>
                                    <p className="text-gray-600 font-rubik  leading-relaxed">{description}</p>
                                </div>
                            )}

                            {uses && (
                                <div className="mb-6 bg-gray-50 p-4 rounded-xl" dir="rtl">
                                    <h2 className="text-lg font-rubik mb-2">الاستخدامات</h2>
                                    <p className="text-gray-700 font-rubik ">{uses}</p>
                                </div>
                            )}

                            {wasf && (
                                <div className="mb-6" dir="rtl">
                                    <h2 className="text-lg  font-rubik    mb-2">المواصفات التفصيلية</h2>
                                    <div className="text-gray-600 font-rubik  whitespace-pre-line bg-gray-50 p-4 rounded-xl">
                                        {wasf}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8 flex gap-4 flex-row-reverse">
                                <ContactModal
                                    productId={params.slug}
                                    productName={title}
                                    triggerClassName="btn btn-primary"
                                    triggerText="طلب عرض سعر"
                                />
                                <a href="/contact" className="btn btn-outline">تواصل معنا</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}
