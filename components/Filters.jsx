'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Filters({ searchParams, totalCount }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    // Local state for filters
    const [filters, setFilters] = useState({
        q: searchParams.q || '',
        materialType: searchParams.materialType || '',
        colorTone: searchParams.colorTone || '',
        finish: searchParams.finish || '',
        thicknessMin: searchParams.thicknessMin || '',
        thicknessMax: searchParams.thicknessMax || '',
        priceMin: searchParams.priceMin || '',
        priceMax: searchParams.priceMax || '',
    });

    // Handle filter change
    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    // Apply filters
    const applyFilters = () => {
        // Create URL params from filters
        const params = new URLSearchParams();

        // Only add non-empty params
        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                params.append(key, value);
            }
        });

        // Keep the sort parameter if exists
        if (searchParams.sort) {
            params.append('sort', searchParams.sort);
        }

        // Reset to first page when filters change
        params.delete('page');

        // Update URL with filters
        router.push(`/products?${params.toString()}`);
    };

    // Reset filters
    const resetFilters = () => {
        setFilters({
            q: '',
            materialType: '',
            colorTone: '',
            finish: '',
            thicknessMin: '',
            thicknessMax: '',
            priceMin: '',
            priceMax: '',
        });
        router.push('/products');
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-soft border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif font-semibold text-xl">Filters</h2>
                <button
                    className="md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label={isOpen ? 'Close filters' : 'Open filters'}
                >
                    {isOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    )}
                </button>
            </div>

            <div className={`space-y-6 ${isOpen ? 'block' : 'hidden md:block'}`}>
                {/* Search */}
                <div>
                    <label htmlFor="q" className="block text-sm font-medium mb-1">Search</label>
                    <input
                        id="q"
                        name="q"
                        type="text"
                        placeholder="Search by name..."
                        className="input"
                        value={filters.q}
                        onChange={handleFilterChange}
                    />
                </div>

                {/* Material Type */}
                <div>
                    <label htmlFor="materialType" className="block text-sm font-medium mb-1">Material Type</label>
                    <select
                        id="materialType"
                        name="materialType"
                        className="select"
                        value={filters.materialType}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Materials</option>
                        <option value="MARBLE">Marble</option>
                        <option value="GRANITE">Granite</option>
                    </select>
                </div>

                {/* Color Tone */}
                <div>
                    <label htmlFor="colorTone" className="block text-sm font-medium mb-1">Color Tone</label>
                    <select
                        id="colorTone"
                        name="colorTone"
                        className="select"
                        value={filters.colorTone}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Colors</option>
                        <option value="LIGHT">Light</option>
                        <option value="MEDIUM">Medium</option>
                        <option value="DARK">Dark</option>
                    </select>
                </div>

                {/* Finish */}
                <div>
                    <label htmlFor="finish" className="block text-sm font-medium mb-1">Finish</label>
                    <select
                        id="finish"
                        name="finish"
                        className="select"
                        value={filters.finish}
                        onChange={handleFilterChange}
                    >
                        <option value="">All Finishes</option>
                        <option value="POLISHED">Polished</option>
                        <option value="HONED">Honed</option>
                        <option value="BRUSHED">Brushed</option>
                        <option value="LEATHERED">Leathered</option>
                    </select>
                </div>

                {/* Thickness Range */}
                <div>
                    <label className="block text-sm font-medium mb-1">Thickness (mm)</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            id="thicknessMin"
                            name="thicknessMin"
                            placeholder="Min"
                            className="input w-1/2"
                            min="0"
                            value={filters.thicknessMin}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="number"
                            id="thicknessMax"
                            name="thicknessMax"
                            placeholder="Max"
                            className="input w-1/2"
                            min="0"
                            value={filters.thicknessMax}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <label className="block text-sm font-medium mb-1">Price per m² ($)</label>
                    <div className="flex gap-2">
                        <input
                            type="number"
                            id="priceMin"
                            name="priceMin"
                            placeholder="Min"
                            className="input w-1/2"
                            min="0"
                            value={filters.priceMin}
                            onChange={handleFilterChange}
                        />
                        <input
                            type="number"
                            id="priceMax"
                            name="priceMax"
                            placeholder="Max"
                            className="input w-1/2"
                            min="0"
                            value={filters.priceMax}
                            onChange={handleFilterChange}
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 space-y-3">
                    <button
                        onClick={applyFilters}
                        className="btn btn-primary w-full"
                    >
                        Apply Filters
                    </button>
                    <button
                        onClick={resetFilters}
                        className="btn btn-outline w-full"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Results Count */}
                <div className="text-center text-sm text-gray-500 pt-2 border-t">
                    <span className="font-semibold">{totalCount}</span> products found
                </div>
            </div>
        </div>
    );
}
