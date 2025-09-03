import Link from 'next/link';
import Image from 'next/image';

export default function ProductCard({ product }) {
    if (!product) return null;

    // Handle new product data structure
    const { title, wasf, image, time } = product;

    // Generate a slug from the title for the URL
    const slug = title ? encodeURIComponent(title.replace(/\s+/g, '-').toLowerCase()) : '';

    return (
        <Link
            href={`/products/${slug}`}
            className="group block bg-white rounded-xl overflow-hidden shadow-soft transition duration-300 hover:shadow-medium"
        >
            {/* Image */}
            <div className="relative h-[400px] overflow-hidden">
                {image && image.url ? (
                    <Image
                        src={image.url}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-neutral-100 flex items-center justify-center">
                        <span className="text-neutral-400">No image</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-6 bg-white">
                <div className="flex items-center justify-between mb-3">
                    <time className="text-sm text-neutral-500" dateTime={time}>
                        {new Date(time).toLocaleDateString('en-US', { 
                            month: 'long',
                            day: 'numeric',
                            year: 'numeric'
                        })}
                    </time>
                    <div className="w-8 h-[2px] bg-primary"></div>
                </div>
                
                <h3 className="font-lantx text-xl font-semibold mb-3 truncate" dir="rtl">
                    {title}
                </h3>
                
                <p className="text-sm text-neutral-600 mb-4 line-clamp-2" dir="rtl">
                    {wasf}
                </p>
                
                <div className="inline-flex items-center text-sm font-medium text-primary transition-colors group-hover:text-primary-dark">
                    View Collection
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1">
                        <path fillRule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </Link>
    );
}
