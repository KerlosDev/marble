'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function ImageGallery({ images, productName }) {
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        if (!images || images.length <= 1) return;

        const interval = setInterval(() => {
            setActiveImage((current) => (current + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [images]);

    // If there are no images, show placeholder
    if (!images || images.length === 0) {
        return (
            <div className="h-96 bg-gray-100 rounded-2xl flex items-center justify-center">
                <span className="text-gray-400">No images available</span>
            </div>
        );
    }

    return (
        <div>
            {/* Main Image */}
            <div className="relative h-96 mb-4 rounded-2xl overflow-hidden">
                <Image
                    src={images[activeImage].url}
                    alt={`${productName} - Image ${activeImage + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
                <div className="grid grid-cols-5 gap-2">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveImage(index)}
                            className={`relative h-20 rounded-lg overflow-hidden ${index === activeImage ? 'ring-2 ring-primary' : 'ring-1 ring-gray-200'
                                }`}
                        >
                            <Image
                                src={image.url}
                                alt={`${productName} - Thumbnail ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 20vw, 10vw"
                            />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
