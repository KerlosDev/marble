'use client'
import { useState, useEffect } from 'react';
import ProductCard from '@/components/ProductCard';
import Filters from '@/components/Filters';
import GlobalApi from '@/app/api/GlobalApi';

export default function ProductsPage() {
    // State variables
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Search params state
    const [searchParams, setSearchParams] = useState(null);
    const pageSize = 12;

    // Parse page from URL or use default
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            setSearchParams(params);
            const page = parseInt(params.get('page'), 10) || 1;
            setCurrentPage(page);
        }
    }, []);

    // Fetch products on component mount
    useEffect(() => {
        async function fetchProducts() {
            try {
                setLoading(true);
                const response = await GlobalApi.products();
                console.log('Products fetched:', response);

                // Handle the response structure
                if (response && response.products) {
                    setAllProducts(response.products);
                    console.log('All products set:', response.products);
                    setError(null);
                } else {
                    setAllProducts([]);
                    setError('No products found in the response');
                }
            } catch (err) {
                console.error('Error fetching products:', err);
                setError('Failed to fetch products');
                setAllProducts([]);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Update displayed products when allProducts or currentPage changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        const paginatedProducts = allProducts.slice(startIndex, endIndex);
        setProducts(paginatedProducts);
    }, [allProducts, currentPage, pageSize]);

    const totalCount = allProducts.length;
    const totalPages = Math.ceil(totalCount / pageSize);

    return (
        <div className="py-12">
            <div className="container-custom">
                {/* Page Header */}
                <div className="mb-10">
                    <h1 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                        Our Stone Collection
                    </h1>
                    <p className="text-gray-600 max-w-3xl">
                        Discover our curated selection of premium marble and granite. Each piece is carefully selected
                        for its unique pattern, color, and exceptional quality.
                    </p>
                </div>

                {/* Main Content with Filters and Products Grid */}
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Filters Sidebar */}
                    <div className="w-full lg:w-64 flex-shrink-0">
                        <Filters searchParams={searchParams || {}} totalCount={totalCount} />
                    </div>

                    {/* Products Grid */}
                    <div className="flex-grow">
                        {/* Results info and sort */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b">
                            <p className="text-gray-600 mb-4 sm:mb-0">
                                <span className="font-semibold">{totalCount}</span> products found
                            </p>

                            <div className="flex items-center">
                                <label htmlFor="sort" className="text-sm mr-2">Sort by:</label>
                                <select
                                    id="sort"
                                    name="sort"
                                    className="select text-sm py-1.5"
                                    defaultValue="date-desc"
                                    onChange={(e) => {
                                        const sortValue = e.target.value;
                                        // Create a new sorted array based on the selected option
                                        const sortedProducts = [...allProducts].sort((a, b) => {
                                            switch (sortValue) {
                                                case 'date-asc':
                                                    return new Date(a.time) - new Date(b.time);
                                                case 'date-desc':
                                                    return new Date(b.time) - new Date(a.time);
                                                case 'name-asc':
                                                    return a.title.localeCompare(b.title);
                                                case 'name-desc':
                                                    return b.title.localeCompare(a.title);
                                                default:
                                                    return 0;
                                            }
                                        });
                                        setAllProducts(sortedProducts);
                                        setCurrentPage(1); // Reset to first page when sorting
                                    }}
                                >
                                    <option value="name-asc">Name (A-Z)</option>
                                    <option value="name-desc">Name (Z-A)</option>
                                    <option value="date-asc">Date (Oldest-Newest)</option>
                                    <option value="date-desc">Date (Newest-Oldest)</option>
                                </select>
                            </div>
                        </div>

                        {/* Products Grid */}
                        {loading ? (
                            <div className="flex justify-center items-center py-20">
                                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                            </div>
                        ) : error ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-red-500 mb-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                                </svg>
                                <h3 className="font-serif text-xl mb-2">Error Loading Products</h3>
                                <p className="text-gray-500 mb-6">{error}</p>
                                <button
                                    onClick={() => {
                                        if (typeof window !== 'undefined') {
                                            window.location.reload();
                                        }
                                    }}
                                    className="btn btn-primary"
                                >
                                    Retry
                                </button>
                            </div>
                        ) : products.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {products.map((product, index) => (
                                        <ProductCard key={index} product={product} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="mt-10 flex justify-center">
                                        <div className="flex items-center space-x-1">
                                            {currentPage > 1 && (
                                                <button
                                                    onClick={() => setCurrentPage(currentPage - 1)}
                                                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50"
                                                >
                                                    Previous
                                                </button>
                                            )}

                                            {[...Array(totalPages)].map((_, i) => {
                                                const pageNumber = i + 1;
                                                const isCurrentPage = pageNumber === currentPage;

                                                // Show first page, last page, current page, and 1 page before and after current page
                                                if (
                                                    pageNumber === 1 ||
                                                    pageNumber === totalPages ||
                                                    (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
                                                ) {
                                                    return (
                                                        <button
                                                            key={pageNumber}
                                                            onClick={() => setCurrentPage(pageNumber)}
                                                            className={`px-3 py-1.5 border ${isCurrentPage
                                                                ? 'border-primary bg-primary text-white'
                                                                : 'border-gray-300 hover:bg-gray-50'
                                                                } rounded`}
                                                        >
                                                            {pageNumber}
                                                        </button>
                                                    );
                                                }

                                                // Show dots for skipped pages
                                                if (pageNumber === 2 || pageNumber === totalPages - 1) {
                                                    return <span key={pageNumber} className="px-2">…</span>;
                                                }

                                                return null;
                                            })}

                                            {currentPage < totalPages && (
                                                <button
                                                    onClick={() => setCurrentPage(currentPage + 1)}
                                                    className="px-3 py-1.5 border border-gray-300 rounded hover:bg-gray-50"
                                                >
                                                    Next
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-400 mb-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                                </svg>
                                <h3 className="font-serif text-xl mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={async () => {
                                        setLoading(true);
                                        try {
                                            const response = await GlobalApi.products();
                                            // Handle both possible response structures
                                            let productsArr = [];
                                            if (response && response.data) {
                                                if (Array.isArray(response.data.products)) {
                                                    productsArr = response.data.products;
                                                } else if (Array.isArray(response.data)) {
                                                    productsArr = response.data;
                                                }
                                            }
                                            if (productsArr.length > 0) {
                                                setAllProducts(productsArr);
                                                setCurrentPage(1);
                                            }
                                        } catch (err) {
                                            console.error('Error refreshing products:', err);
                                        } finally {
                                            setLoading(false);
                                        }
                                    }}
                                    className="btn btn-primary"
                                >
                                    Reset Filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}