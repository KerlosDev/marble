"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const Products = () => {
    // Updated array of product data with images from the prodcuts folder
    const products = [
        {
            id: 1,
            name: "جلالة لايت (اكسترا)",
            type: "رخام",
            image: "/prodcuts/halayeb-bianco.jpg",
            category: "marble",
        },
        {
            id: 2,
            name: "جاندولا",
            type: "جرانيت",
            image: "/prodcuts/gandola.jpg",
            category: "granite",
        },
        {
            id: 3,
            name: "كارناك جراي",
            type: "جرانيت",
            image: "/prodcuts/karnak-grey-el-sherka-grey.jpg",
            category: "granite",
        },
        {
            id: 4,
            name: "هوني",
            type: "رخام",
            image: "/prodcuts/Honed-1.jpg",
            category: "marble",
        },
        {
            id: 5,
            name: "هودي دارك",
            type: "جرانيت",
            image: "/prodcuts/hoody-dark.jpg",
            category: "granite",
        },
        {
            id: 6,
            name: "فيردي",
            type: "جرانيت",
            image: "/prodcuts/green-verdi-1.jpg",
            category: "granite",
        },
        {
            id: 7,
            name: "ميلي جراي",
            type: "رخام",
            image: "/prodcuts/melly-grey.jpg",
            category: "marble",
        },
        {
            id: 8,
            name: "كاترينا",
            type: "رخام",
            image: "/prodcuts/katrina.jpg",
            category: "marble",
        },
    ];

    return (
        <div className="py-16 font-rubik bg-stone-100">
            <div className="container mx-auto px-4">
                {/* Title with decorative lines */}
                <div className="text-center mb-12 relative">
                    <div className="flex items-center justify-center">
                        <div className="w-1/4 border-t border-gray-400 mr-4"></div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-800 px-4">
                            منتجاتنا
                        </h2>
                        <div className="w-1/4 border-t border-gray-400 ml-4"></div>
                    </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className="rounded-xl overflow-hidden shadow-md bg-white"
                            whileHover={{
                                y: -10,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <Link href={`/products/${product.category}/${product.id}`}>
                                <div className="relative overflow-hidden">
                                    <motion.div
                                        className="aspect-square relative"
                                        whileHover={{ scale: 1.05 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <Image
                                            src={product.image}
                                            alt={product.name}
                                            fill
                                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                                            className="object-cover"
                                        />
                                    </motion.div>
                                </div>
                                <motion.div
                                    className="p-4 text-center"
                                    whileHover={{ backgroundColor: "#f8f8f8" }}
                                >
                                    <h3 className="font-bold text-lg text-neutral-800">{product.name}</h3>
                                    {product.type && <p className="text-neutral-500 mt-1">{product.type}</p>}
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Products