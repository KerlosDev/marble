'use client'
import { useState, useEffect } from 'react';
import GlobalApi from '@/app/api/GlobalApi';

export default function LandscapeGallery() {
    const [landscapes, setLandscapes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchLandscapes() {
            setLoading(true);
            setError(null);
            try {
                const response = await GlobalApi.landscapes();
                // Normalize the data to ensure each landscape has an array of images and a 'description' field
                let data = [];
                if (Array.isArray(response)) {
                    data = response;
                } else if (response && Array.isArray(response.landscapes)) {
                    data = response.landscapes;
                }
                // Map and normalize images and description
                const normalized = data.map(l => ({
                    ...l,
                    images: Array.isArray(l.image)
                        ? l.image.map(img => img.url)
                        : (l.image ? [l.image] : []),
                    description: l.description || l.descriptoin || '', // fix typo
                }));
                setLandscapes(normalized);
                if (!normalized.length) setError('No landscapes found.');
            } catch (err) {
                setError('Failed to load landscapes.');
                setLandscapes([]);
            } finally {
                setLoading(false);
            }
        }
        fetchLandscapes();
    }, []);

    return (
        <div className="pt-32 pb-12">
            <div className="container-custom">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-serif font-bold mb-4">Landscapes Gallery</h1>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Discover beautiful landscapes and outdoor spaces designed for inspiration and relaxation.
                    </p>
                </div>
                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500 mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                        </svg>
                        <h3 className="font-serif text-xl mb-2">Error Loading Landscapes</h3>
                        <p className="text-gray-500 mb-6">{error}</p>
                        <button
                            onClick={() => window.location.reload()}
                            className="btn btn-primary"
                        >
                            Retry
                        </button>
                    </div>
                ) : landscapes.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                        </svg>
                        <h3 className="font-serif text-xl mb-2">No landscapes found</h3>
                        <p className="text-gray-500 mb-6">
                            Please check back later for more landscapes.
                        </p>
                    </div>
                ) : (
                    <div>
                        {landscapes.map((landscape, idx) => (
                            <section key={landscape.id || idx} className="mb-16">
                                <div className="w-full">
                                    {(landscape.images && landscape.images.length > 0
                                        ? landscape.images
                                        : ['/placeholder-landscape.jpg']
                                    ).map((imgUrl, i) => (
                                        <img
                                            key={i}
                                            src={imgUrl}
                                            alt={landscape.title}
                                            className="w-full max-h-[70vh] object-cover rounded-lg shadow mb-4"
                                        />
                                    ))}
                                </div>
                                <div dir='rtl' className="mt-6 text-center px-4">
                                    <h2 className="font-rubik text-4xl font-bold mb-2">{landscape.title}</h2>
                                    {landscape.location && (
                                        <p className="text-gray-600 text-lg mb-2">{landscape.location}</p>
                                    )}
                                </div>
                                <div className="mt-4 font-rubik text-right px-4">
                                    <p className="text-gray-500 text-lg font-rubik whitespace-pre-line">{landscape.description}</p>
                                </div>
                                {/* Contact Buttons */}
                                <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <a
                                        href="https://wa.me/201234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full shadow transition font-rubik text-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
                                            <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.98L0 24l6.22-1.63A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.24-1.44l-.37-.22-3.69.97.99-3.59-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.35.99 2.65 1.13 2.83.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.89-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z" />
                                        </svg>
                                        تواصل واتساب
                                    </a>
                                    <a
                                        href="tel:201234567890"
                                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow transition font-rubik text-lg"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.25 6.75A16.5 16.5 0 0117.25 21.75l2.25-2.25a2.25 2.25 0 00-2.25-2.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 8.25L2.25 6.75z" />
                                        </svg>
                                        اتصال مباشر
                                    </a>
                                </div>
                            </section>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}