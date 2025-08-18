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
            className="group bg-white rounded-2xl overflow-hidden shadow-soft transition-transform hover:-translate-y-1 hover:shadow-medium"
        >
            {/* Image */}
            <div className="relative h-60 overflow-hidden">
                {image && image.url ? (
                    <Image
                        src={image.url}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                        <span className="text-gray-400">No image</span>
                    </div>
                )}
                <div className="absolute top-3 right-3 bg-primary px-2 py-1 rounded text-white text-xs font-medium">
                    {new Date(time).toLocaleDateString()}
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                <h3 className="font-serif font-semibold text-xl mb-2 truncate" dir="rtl">{title}</h3>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-normal text-gray-600">
                        {wasf && wasf.split('\n')[0]?.substring(0, 50)}...
                    </span>
                    <span className="inline-flex items-center text-sm font-medium text-gray-600 group-hover:text-primary">
                        View Details
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 ml-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                </div>
            </div>
        </Link>
    );
}
