import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
    return (
        <>
            {/* Hero Banner */}
            <section className="relative w-full h-[40vh] md:h-[50vh] overflow-hidden">
                <div className="absolute inset-0">
                    <Image
                        src="https://images.unsplash.com/photo-1618219740975-d40978bb7378?q=80&w=2400"
                        alt="Marble quarry"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
                </div>

                <div className="relative container-custom h-full flex items-center">
                    <div className="max-w-2xl text-white">
                        <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
                            About Granet
                        </h1>
                        <p className="text-lg md:text-xl max-w-lg">
                            A legacy of excellence in premium stone surfaces for over three decades
                        </p>
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Our Story</h2>
                            <div className="w-16 h-1 bg-primary mb-6"></div>
                            <div className="prose prose-lg">
                                <p className="mb-4">
                                    Founded in 1985, Granet has been at the forefront of the natural stone industry, providing exquisite marble and granite products to discerning clients worldwide. What began as a family business with a single quarry has grown into an international enterprise with operations spanning four continents.
                                </p>
                                <p className="mb-4">
                                    Our commitment to quality, sustainability, and craftsmanship has allowed us to forge partnerships with the world's most prestigious architects, designers, and builders. We pride ourselves on sourcing only the most exceptional stone materials, each piece telling its own geological story from the earth's formation.
                                </p>
                                <p>
                                    Today, Granet continues to be guided by the founding principles of excellence and integrity, combining traditional knowledge with cutting-edge technology to deliver superior stone products for both residential and commercial projects.
                                </p>
                            </div>
                        </div>

                        <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-medium">
                            <Image
                                src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200"
                                alt="Granet stonework craftsman"
                                fill
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Values */}
            <section className="py-16 md:py-24 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Our Mission & Values
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600">
                            We are guided by a commitment to excellence, sustainability, and innovation in everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-4">Excellence</h3>
                            <p className="text-gray-600">
                                We strive for perfection in every cut, every finish, and every installation. Our standards exceed industry expectations.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12.75 3.03v.568c0 .334.148.65.405.864l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 01-1.161.886l-.143.048a1.107 1.107 0 00-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 01-1.652.928l-.679-.906a1.125 1.125 0 00-1.906.172L4.5 15.75l-.612.153M12.75 3.031a9 9 0 00-8.862 12.872M12.75 3.031a9 9 0 016.69 14.036m0 0l-.177-.529A2.25 2.25 0 0017.128 15H16.5l-.324-.324a1.453 1.453 0 00-2.328.377l-.036.073a1.586 1.586 0 01-.982.816l-.99.282c-.55.157-.894.702-.8 1.267l.073.438c.08.474.49.821.97.821.846 0 1.598-.542 1.865-1.345l.215-.688c.082-.264.418-.406.677-.304l.009.003c.555.21.98.742 1.017 1.368a9 9 0 01-9.966-8.593M12.75 3.031c-1.05 0-2.062.18-3 .512M12.75 3.031a9 9 0 00-8.862 12.872m0 0l.67-.201a1.125 1.125 0 01.98-.134c.086.032.176.046.268.046h.007c.328 0 .598-.261.598-.589v-.843c0-.325.26-.598.585-.598h.007a.58.58 0 01.098 0 .597.597 0 01.585.598v.64c0 .329.27.599.598.599h.007c.35 0 .635.282.635.632v.989c0 .172.046.34.134.484a.699.699 0 00.557.31c.742 0 1.127-.872.595-1.38l-.596-.586c-.204-.199-.204-.53 0-.73l.595-.585c.533-.508.149-1.379-.593-1.379H13.5c-.092 0-.183-.015-.269-.046a1.126 1.126 0 01-.967-.678l-.33-.833a1.127 1.127 0 01.374-1.363l.535-.39c.523-.379.655-1.107.308-1.661l-.31-.496c-.318-.51-.316-1.162.003-1.67l.367-.577a1.125 1.125 0 01.927-.463h.002c.38 0 .736.186.951.498l.055.08c.099.142.233.243.387.286.387.11.813-.019 1.028-.353l.065-.1a1.126 1.126 0 011.86.546l.034.11c.076.248.283.418.54.437l.16.014a1.126 1.126 0 011.05 1.168l-.014.17a.549.549 0 00.168.434l.113.12c.406.436.414 1.114.021 1.559l-.995 1.134a1.125 1.125 0 01-1.203.3l-.195-.066a1.125 1.125 0 00-1.275.43l-.21.315c-.166.25-.268.55-.291.869-.03.414.128.817.43 1.074l.41.351c.347.298.587.736.652 1.224l.044.338a9.016 9.016 0 01-9.191-8.49" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-4">Sustainability</h3>
                            <p className="text-gray-600">
                                We practice responsible quarrying and processing, minimizing environmental impact while preserving nature's masterpieces.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-soft text-center">
                            <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-primary">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-serif font-semibold mb-4">Innovation</h3>
                            <p className="text-gray-600">
                                We continuously advance our techniques and technologies to offer new finishes, treatments, and applications for natural stone.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 md:py-24">
                <div className="container-custom">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                            Our Leadership Team
                        </h2>
                        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
                        <p className="text-lg text-gray-600">
                            Meet the experts who guide our vision and maintain our standard of excellence
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
                            <div className="relative h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600"
                                    alt="CEO"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-serif font-bold mb-1">Robert Martinez</h3>
                                <p className="text-primary mb-4">Chief Executive Officer</p>
                                <p className="text-gray-600 text-sm">
                                    With over 25 years in the stone industry, Robert leads Granet with a focus on global expansion and sustainable practices.
                                </p>
                            </div>
                        </div>

                        {/* Team Member 2 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
                            <div className="relative h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600"
                                    alt="Chief Design Officer"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-serif font-bold mb-1">Elena Romano</h3>
                                <p className="text-primary mb-4">Chief Design Officer</p>
                                <p className="text-gray-600 text-sm">
                                    Elena brings her background in architecture and material science to curate our exclusive collections.
                                </p>
                            </div>
                        </div>

                        {/* Team Member 3 */}
                        <div className="bg-white rounded-2xl overflow-hidden shadow-soft">
                            <div className="relative h-80">
                                <Image
                                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=600"
                                    alt="Technical Director"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </div>
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-serif font-bold mb-1">David Chen</h3>
                                <p className="text-primary mb-4">Technical Director</p>
                                <p className="text-gray-600 text-sm">
                                    David oversees our manufacturing processes, implementing innovative cutting and finishing technologies.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 md:py-24 bg-foreground text-white">
                <div className="container-custom text-center">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
                        Experience the Granet Difference
                    </h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto">
                        Let us help you bring your vision to life with the world's finest stone materials
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/products" className="btn btn-primary">
                            Browse Products
                        </Link>
                        <Link href="/contact" className="btn btn-outline border-white text-white hover:bg-white hover:text-foreground">
                            Contact Us
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
